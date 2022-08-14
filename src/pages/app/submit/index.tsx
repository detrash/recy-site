import DoneForm from '@modules/app/components/FormSteps/Done';
import WasteDefinitions from '@modules/app/components/FormSteps/WasteDefinitions';
import WasteDetails from '@modules/app/components/FormSteps/WasteDetails';
import { useFormContext } from '@modules/app/context/formContext';
import {
  ProfileType,
  useCreateFormMutation,
} from '@modules/app/graphql/generated/graphql';
import { PageMeComp } from '@modules/app/graphql/generated/page';
import FormLayout from '@modules/app/layout/FormLayout';
import { FORM_STEPS, USER_ROLE_TYPES } from '@modules/app/utils/constants';
import { userSSRMethods } from '@modules/app/utils/userSSRMethods';
import { RecyFormSchema } from '@modules/app/utils/YupSchema';
import { withPrivateApollo } from '@shared/lib/withPrivateApollo';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const RECYCLER_TYPE = USER_ROLE_TYPES.find(
  (userRoleType) => userRoleType.key === ProfileType.Recycler
);

const SubmitRecyForm: PageMeComp = ({ data }) => {
  const {
    formStep,
    onNextWasteStep,
    onPreviousWasteStep,
    setFormStep,
    wasteTypes,
    wasteTypesStep,
  } = useFormContext();
  const [initialFormState, setInitialFormState] = useState<RecyFormSchema>({});
  const [initialFormSchemaValidation, setInitialFormSchemaValidation] =
    useState<any>();
  const [isUploadingVideos, setIsUploadingVideos] = useState(false);

  const [createForm, { loading }] = useCreateFormMutation();

  const handleSubmitRecyForm = async (formData: RecyFormSchema) => {
    const createFormParams = Object.entries(formData).map(
      ([residueType, residueValues]) => {
        return [
          residueType,
          {
            amount: residueValues.amount,
            videoFileName: residueValues.videoFile?.name,
          },
        ];
      }
    );
    const { data } = await createForm({
      variables: Object.fromEntries(createFormParams),
    });

    if (data?.createForm.s3?.length) {
      setIsUploadingVideos(true);
      const s3Data = await Promise.all(
        data.createForm.s3.map((residueS3) => {
          const residueVideoFile = formData[residueS3.residue].videoFile;

          return fetch(residueS3.createUrl, {
            method: 'PUT',
            body: residueVideoFile,
            headers: {
              'Content-Length': String(residueVideoFile?.size),
            },
          });
        })
      );

      if (s3Data.length) {
        setIsUploadingVideos(false);
      }
    }
    setFormStep(FORM_STEPS.done);
  };

  useEffect(() => {
    if (wasteTypes) {
      const initialState = {} as RecyFormSchema;
      const initialValidation = {} as any;

      wasteTypes.forEach((wasteType) => {
        initialState[wasteType] = {
          amount: 0,
          videoFile: undefined,
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
        })
      );
      setInitialFormState(initialState);
    }
  }, [wasteTypes]);

  useEffect(() => {
    setFormStep(FORM_STEPS.wasteDefinitions);
  }, [setFormStep]);

  const FORM_STEPS_LAYOUTS = {
    [FORM_STEPS.wasteDefinitions]: <WasteDefinitions />,
    [FORM_STEPS.wasteDetails]: (
      <Formik
        initialValues={initialFormState}
        validationSchema={initialFormSchemaValidation}
        onSubmit={handleSubmitRecyForm}
      >
        {(formikProps) => (
          <Form>
            <WasteDetails
              {...formikProps}
              isLoading={isUploadingVideos || loading}
              isRecyclerPerson={RECYCLER_TYPE?.key === data?.me.profileType}
              onNextWaste={onNextWasteStep}
              onPreviousWaste={onPreviousWasteStep}
              wasteType={wasteTypesStep}
            />
          </Form>
        )}
      </Formik>
    ),
    [FORM_STEPS.done]: <DoneForm />,
  };

  return <FormLayout>{FORM_STEPS_LAYOUTS[formStep]}</FormLayout>;
};

export const getServerSideProps = userSSRMethods.checkFormSubmitAccess;

export default withPrivateApollo(SubmitRecyForm);
