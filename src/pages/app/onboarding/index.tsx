import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import DoneForm from '@modules/app/components/FormSteps/Done';
import RegisterType from '@modules/app/components/FormSteps/RegisterType';
import WasteDetails from '@modules/app/components/FormSteps/WasteDetails';
import WelcomeForm from '@modules/app/components/FormSteps/Welcome';
import { useFormContext } from '@modules/app/context/formContext';
import { getMeServerQuery } from '@modules/app/graphql/ssrQueries';
import FormLayout from '@modules/app/layout/FormLayout';
import { FORM_STEPS, USER_ROLE_TYPES } from '@modules/app/utils/constants';
import { RecyFormSchema } from '@modules/app/utils/YupSchema';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const OnboardingAppPage: React.FC = () => {
  const {
    formStep,
    wasteTypesStep,
    onNextWasteStep,
    profileInfo,
    onPreviousWasteStep,
    wasteTypes,
  } = useFormContext();
  const [initialFormState, setInitialFormState] = useState<RecyFormSchema>({});
  const [initialFormSchemaValidation, setInitialFormSchemaValidation] =
    useState<any>();

  useEffect(() => {
    if (wasteTypes) {
      const initialState = {} as RecyFormSchema;
      const initialValidation = {} as any;

      wasteTypes.forEach((wasteType) => {
        initialState[wasteType] = {
          amount: 0,
          videoProof: undefined,
        };
        initialValidation[wasteType] = Yup.object({
          amount: Yup.number()
            .min(1, 'Type a valid number')
            .required('Required'),
        });
      });
      setInitialFormSchemaValidation(
        Yup.object({
          ...initialValidation,
        }),
      );
      setInitialFormState(initialState);
    }
  }, [wasteTypes]);

  const handleSubmitRecyForm = (formData: RecyFormSchema) => {
    console.log('formData', formData);
  };

  const recyclerType = USER_ROLE_TYPES.find(
    (userRoleType) => userRoleType === 'Recycler',
  );

  const FORM_STEPS_LAYOUTS = {
    [FORM_STEPS.welcome]: <WelcomeForm />,
    [FORM_STEPS.profile]: <RegisterType />,
    [FORM_STEPS.wasteDetails]: (
      <Formik
        initialValues={initialFormState}
        validationSchema={initialFormSchemaValidation}
        onSubmit={handleSubmitRecyForm}
      >
        {(formikProps) => (
          <WasteDetails
            {...formikProps}
            wasteType={wasteTypesStep}
            onNextWaste={onNextWasteStep}
            onPreviousWaste={onPreviousWasteStep}
            isRecyclerPerson={recyclerType === profileInfo}
          />
        )}
      </Formik>
    ),
    [FORM_STEPS.done]: <DoneForm />,
  };

  return <FormLayout>{FORM_STEPS_LAYOUTS[formStep]}</FormLayout>;
};

export default OnboardingAppPage;

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/app',
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const user = await getMeServerQuery(accessToken!);

    if (user) {
      return {
        redirect: {
          destination: 'app/',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  },
});
