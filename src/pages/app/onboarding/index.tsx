import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import RegisterType from '@modules/app/components/FormSteps/RegisterType';
import WasteDetails from '@modules/app/components/FormSteps/WasteDetails';
import WelcomeForm from '@modules/app/components/FormSteps/Welcome';
import { useFormContext } from '@modules/app/context/formContext';
import FormLayout from '@modules/app/layout/FormLayout';
import { FORM_STEPS, USER_ROLE_TYPES } from '@modules/app/utils/constants';

const OnboardingAppPage: React.FC = () => {
  const {
    formStep,
    wasteTypesStep,
    onNextWasteStep,
    profileInfo,
    onPreviousWasteStep,
  } = useFormContext();

  const recyclerType = USER_ROLE_TYPES.find(
    (userRoleType) => userRoleType === 'Recycler',
  );

  const FORM_STEPS_LAYOUTS = {
    [FORM_STEPS.welcome]: <WelcomeForm />,
    [FORM_STEPS.profile]: <RegisterType />,
    [FORM_STEPS.wasteDetails]: (
      <WasteDetails
        wasteType={wasteTypesStep}
        onNextWaste={onNextWasteStep}
        onPreviousWaste={onPreviousWasteStep}
        isRecyclerPerson={recyclerType === profileInfo}
      />
    ),
  };

  return <FormLayout>{FORM_STEPS_LAYOUTS[formStep]}</FormLayout>;
};

export default OnboardingAppPage;

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/app',
});
