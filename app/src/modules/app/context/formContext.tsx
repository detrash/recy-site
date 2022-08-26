import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FORM_STEPS } from '../utils/constants';
import { APP_NAV_LINKS } from '../utils/navLinks';

interface FormContextData {
  formStep: number;
  setFormStep: (step: number) => void;

  wasteTypes: string[];
  setWasteTypes: Dispatch<SetStateAction<string[]>>;

  wasteTypesStep: string;
  onNextWasteStep: (submitForm: () => void) => void;
  onPreviousWasteStep: () => void;
}

interface FormProviderProps {
  children: ReactNode;
}

const FormContext = createContext<FormContextData>({} as FormContextData);

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const router = useRouter();
  const [formStep, setFormStep] = useState(() => {
    if (router.asPath === APP_NAV_LINKS.SUBMIT_FORM)
      return FORM_STEPS.wasteDefinitions;

    return FORM_STEPS.welcome;
  });
  const [wasteTypesStep, setWasteTypesStep] = useState('');
  const [wasteTypes, setWasteTypes] = useState<string[]>([]);

  const onNextWasteStep = useCallback(
    (submitForm: () => void) => {
      setWasteTypesStep((previousWasteStep) => {
        const previousWasteStepIndex = wasteTypes.findIndex(
          (wasteType) => wasteType === previousWasteStep
        );
        const isLastWasteStep = wasteTypes.slice(-1)[0] === previousWasteStep;

        if (previousWasteStepIndex !== -1 && !isLastWasteStep) {
          return wasteTypes[previousWasteStepIndex + 1];
        }

        if (isLastWasteStep) {
          submitForm();
        }

        return previousWasteStep;
      });
    },
    [wasteTypes]
  );

  const onPreviousWasteStep = useCallback(() => {
    setWasteTypesStep((previousWasteStep) => {
      const previousWasteStepIndex = wasteTypes.findIndex(
        (wasteType) => wasteType === previousWasteStep
      );
      const isFirstStep = wasteTypes[0] === previousWasteStep;

      if (previousWasteStepIndex !== -1 && !isFirstStep) {
        return wasteTypes[previousWasteStepIndex - 1];
      }
      setFormStep(FORM_STEPS.wasteDefinitions);
      return previousWasteStep;
    });
  }, [wasteTypes]);

  useEffect(() => {
    if (wasteTypes.length) {
      setWasteTypesStep(wasteTypes[0]);
    }
  }, [wasteTypes]);

  return (
    <FormContext.Provider
      value={{
        formStep,
        setFormStep,
        wasteTypes,
        setWasteTypes,
        wasteTypesStep,
        onNextWasteStep,
        onPreviousWasteStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

function useFormContext(): FormContextData {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }

  return context;
}

export { FormProvider, useFormContext };
