import { useEffect, useState } from 'react';
import { useFormContext } from 'src/context/formContext';
import { FORM_STEPS } from 'src/utils/constants';
import { RecyFormSchema } from 'src/utils/YupSchema';
import * as Yup from 'yup';

export const useSubmitForm = () => {
  const { setFormStep, wasteTypes } = useFormContext();
  const [initialFormState, setInitialFormState] = useState<RecyFormSchema>({});
  const [initialFormSchemaValidation, setInitialFormSchemaValidation] =
    useState<any>();

  useEffect(() => {
    setFormStep(FORM_STEPS.wasteDefinitions);
  }, [setFormStep]);

  useEffect(() => {
    if (wasteTypes) {
      const initialState = {} as RecyFormSchema;
      const initialValidation = {} as any;

      wasteTypes.forEach((wasteType) => {
        initialState[wasteType] = {
          amount: 0,
          videoFile: undefined,
          invoicesFiles: [],
        };
        initialValidation[wasteType] = Yup.object({
          amount: Yup.number()
            .min(0.001, 'Type a valid number from 0.001 kg')
            .required('Required'),
        });
      });
      setInitialFormSchemaValidation(
        Yup.object({
          ...initialValidation,
        })
      );
      setInitialFormState(initialState);
    }
  }, [wasteTypes]);

  return {
    initialValues: initialFormState,
    validationSchema: initialFormSchemaValidation,
  };
};
