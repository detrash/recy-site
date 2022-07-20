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

interface FormContextData {
  formStep: number;
  setFormStep: (step: number) => void;

  profileInfo: string;
  setProfileInfo: (profileInfo: string) => void;

  wasteTypes: string[];
  setWasteTypes: Dispatch<SetStateAction<string[]>>;

  wasteTypesStep: string;
  onNextWasteStep: () => void;
  onPreviousWasteStep: () => void;
}

interface FormProviderProps {
  children: ReactNode;
}

const FormContext = createContext<FormContextData>({} as FormContextData);

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formStep, setFormStep] = useState(FORM_STEPS.welcome);
  const [wasteTypesStep, setWasteTypesStep] = useState('');
  const [profileInfo, setProfileInfo] = useState('');
  const [wasteTypes, setWasteTypes] = useState<string[]>([]);
  // const [filesUploaded, setFilesUploaded] = useState<File[]>([]);

  const onNextWasteStep = useCallback(() => {
    setWasteTypesStep((previousWasteStep) => {
      const previousWasteStepIndex = wasteTypes.findIndex(
        (wasteType) => wasteType === previousWasteStep,
      );
      const isLastWasteStep = wasteTypes.slice(-1)[0] === previousWasteStep;

      if (previousWasteStepIndex !== -1 && !isLastWasteStep) {
        return wasteTypes[previousWasteStepIndex + 1];
      }
      setFormStep(FORM_STEPS.done);
      return '';
    });
  }, [wasteTypes]);

  const onPreviousWasteStep = useCallback(() => {
    setWasteTypesStep((previousWasteStep) => {
      const previousWasteStepIndex = wasteTypes.findIndex(
        (wasteType) => wasteType === previousWasteStep,
      );
      const isFirstStep = wasteTypes[0] === previousWasteStep;

      if (previousWasteStepIndex !== -1 && !isFirstStep) {
        return wasteTypes[previousWasteStepIndex - 1];
      }
      setFormStep(FORM_STEPS.profile);
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
        profileInfo,
        setProfileInfo,
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
