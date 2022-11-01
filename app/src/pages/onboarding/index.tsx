import { useUser } from '@auth0/nextjs-auth0';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import RegisterUser from 'src/components/FormSteps/RegisterUser';
import WelcomeForm from 'src/components/FormSteps/Welcome';
import { useFormContext } from 'src/context/formContext';
import {
  ProfileType,
  useCreateUserMutation,
} from 'src/graphql/generated/graphql';
import FormLayout from 'src/layout/FormLayout';
import { FORM_STEPS } from 'src/utils/constants';
import { APP_NAV_LINKS } from 'src/utils/navLinks';
import { userSSRMethods } from 'src/utils/userSSRMethods';
import {
  UserRegistrationSchema,
  userRegistrationSchema,
} from 'src/utils/YupSchema';

const OnboardingAppPage: React.FC = () => {
  const { formStep } = useFormContext();
  const router = useRouter();
  const { user } = useUser();

  const [createUserMutation, { loading: isCreatingUser }] =
    useCreateUserMutation();

  const handleSubmitUserRegistration = async (
    userForm: UserRegistrationSchema
  ) => {
    const createUser = await createUserMutation({
      variables: {
        ...userForm,
        email: user?.email || '',
      },
    });

    if (!createUser.errors) {
      return router.push(APP_NAV_LINKS.APP);
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
          name: '',
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

export default OnboardingAppPage;
