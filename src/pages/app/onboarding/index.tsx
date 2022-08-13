import { useUser } from '@auth0/nextjs-auth0';
import RegisterUser from '@modules/app/components/FormSteps/RegisterUser';
import WelcomeForm from '@modules/app/components/FormSteps/Welcome';
import { useFormContext } from '@modules/app/context/formContext';
import {
  ProfileType,
  useCreateUserMutation,
} from '@modules/app/graphql/generated/graphql';
import FormLayout from '@modules/app/layout/FormLayout';
import { FORM_STEPS } from '@modules/app/utils/constants';
import { userSSRMethods } from '@modules/app/utils/userSSRMethods';
import {
  UserRegistrationSchema,
  userRegistrationSchema,
} from '@modules/app/utils/YupSchema';
import { withPrivateApollo } from '@shared/lib/withPrivateApollo';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const OnboardingAppPage: React.FC = () => {
  const { formStep } = useFormContext();
  const router = useRouter();
  const { user } = useUser();

  const [createUserMutation, { loading: isCreatingUser, error }] =
    useCreateUserMutation();

  const handleSubmitUserRegistration = async ({
    phoneNumber,
    profileType,
  }: UserRegistrationSchema) => {
    const createUser = await createUserMutation({
      variables: {
        phoneNumber,
        profileType,
        email: user?.email || '',
      },
    });

    if (!createUser.errors) {
      return router.push('/app');
    }

    toast.error('Error while creating a user, please try again later', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const FORM_STEPS_LAYOUTS = {
    [FORM_STEPS.welcome]: <WelcomeForm />,
    [FORM_STEPS.profile]: (
      <Formik
        initialValues={{
          phoneNumber: '',
          profileType: '' as ProfileType,
        }}
        validationSchema={userRegistrationSchema}
        onSubmit={handleSubmitUserRegistration}
      >
        {(formikProps) => (
          <RegisterUser isCreatingUser={isCreatingUser} {...formikProps} />
        )}
      </Formik>
    ),
  };

  return <FormLayout>{FORM_STEPS_LAYOUTS[formStep]}</FormLayout>;
};

export const getServerSideProps = userSSRMethods.checkOnboardingAccess;

export default withPrivateApollo(OnboardingAppPage);
