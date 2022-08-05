import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import RegisterUser from '@modules/app/components/FormSteps/RegisterUser';
import WelcomeForm from '@modules/app/components/FormSteps/Welcome';
import { useFormContext } from '@modules/app/context/formContext';
import {
  ProfileType,
  useCreateUserMutation,
} from '@modules/app/graphql/generated/graphql';
import { getMeServerQuery } from '@modules/app/graphql/ssrQueries';
import FormLayout from '@modules/app/layout/FormLayout';
import { FORM_STEPS } from '@modules/app/utils/constants';
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
  // const [initialFormState, setInitialFormState] = useState<RecyFormSchema>({});
  // const [initialFormSchemaValidation, setInitialFormSchemaValidation] =
  //   useState<any>();

  const [createUserMutation, { loading: isCreatingUser, error }] =
    useCreateUserMutation();

  // useEffect(() => {
  //   if (wasteTypes) {
  //     const initialState = {} as RecyFormSchema;
  //     const initialValidation = {} as any;

  //     wasteTypes.forEach((wasteType) => {
  //       initialState[wasteType] = {
  //         amount: 0,
  //         videoProof: undefined,
  //       };
  //       initialValidation[wasteType] = Yup.object({
  //         amount: Yup.number()
  //           .min(1, 'Type a valid number')
  //           .required('Required'),
  //       });
  //     });
  //     setInitialFormSchemaValidation(
  //       Yup.object({
  //         ...initialValidation,
  //       }),
  //     );
  //     setInitialFormState(initialState);
  //   }
  // }, [wasteTypes]);

  const handleSubmitUserRegistration = async ({
    phoneNumber,
    profileType,
  }: UserRegistrationSchema) => {
    const createUser = await createUserMutation({
      variables: {
        phoneNumber,
        profileType,
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

  // const recyclerType = USER_ROLE_TYPES.find(
  //   (userRoleType) => userRoleType === 'Recycler',
  // );

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
    // [FORM_STEPS.wasteDetails]: (
    //   <Formik
    //     initialValues={initialFormState}
    //     validationSchema={initialFormSchemaValidation}
    //     onSubmit={handleSubmitRecyForm}
    //   >
    //     {(formikProps) => (
    //       <WasteDetails
    //         {...formikProps}
    //         wasteType={wasteTypesStep}
    //         onNextWaste={onNextWasteStep}
    //         onPreviousWaste={onPreviousWasteStep}
    //         isRecyclerPerson={recyclerType === profileInfo}
    //       />
    //     )}
    //   </Formik>
    // ),
    // [FORM_STEPS.done]: <DoneForm />,
  };

  return <FormLayout>{FORM_STEPS_LAYOUTS[formStep]}</FormLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const user = await getMeServerQuery(accessToken!);

    if (user) {
      return {
        redirect: {
          destination: '/app',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  },
});

export default withPrivateApollo(OnboardingAppPage);
