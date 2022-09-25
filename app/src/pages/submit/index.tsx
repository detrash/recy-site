import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import DoneForm from 'src/components/FormSteps/Done';
import { FormSkeleton } from 'src/components/FormSteps/FormSkeleton';
import WasteDefinitions from 'src/components/FormSteps/WasteDefinitions';
import WasteDetails from 'src/components/FormSteps/WasteDetails';
import { useFormContext } from 'src/context/formContext';
import {
  ProfileType,
  useCreateFormMutation,
} from 'src/graphql/generated/graphql';
import { usePageLoader } from 'src/hooks/usePageLoader';
import { useSubmitForm } from 'src/hooks/useSubmitForm';
import FormLayout from 'src/layout/FormLayout';
import { withPrivateApollo } from 'src/lib/withPrivateApollo';
import { FORM_STEPS, USER_ROLE_TYPES } from 'src/utils/constants';
import { RecyFormSchema } from 'src/utils/YupSchema';
import { useAccount } from 'wagmi';

const HODLER_TYPE = USER_ROLE_TYPES.find(
  (userRoleType) => userRoleType.key === ProfileType.Hodler
);

const SubmitRecyForm: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { data, isLoading: isPageLoading } = usePageLoader({
    pageType: 'SubmitForm',
  });
  const { initialValues, validationSchema } = useSubmitForm();
  const {
    formStep,
    onNextWasteStep,
    onPreviousWasteStep,
    setFormStep,
    wasteTypesStep,
  } = useFormContext();

  const [isUploadingVideos, setIsUploadingVideos] = useState(false);
  const [walletAddress, setWalletAddress] = useState('Not connected');

  const [createForm, { loading }] = useCreateFormMutation();

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [address, isConnected]);

  const handleSubmitRecyForm = async (formData: RecyFormSchema) => {
    const createFormParams = Object.entries(formData).map(
      ([residueType, residueValues]) => {
        return [
          residueType,
          {
            amount: residueValues.amount,
            videoFileName: residueValues.videoFile
              ? residueValues.videoFile[0].name
              : null,
            invoiceFileName: residueValues.invoiceFiles
              ? residueValues.invoiceFiles[0].name
              : null,
          },
        ];
      }
    );
    const { data } = await createForm({
      variables: {
        ...Object.fromEntries(createFormParams),
        WALLET_ADDRESS: isConnected ? address : null,
      },
    });

    if (data?.createForm.s3?.length) {
      setIsUploadingVideos(true);
      const s3Data = await Promise.all(
        data.createForm.s3.reduce((requests, residueS3) => {
          if (residueS3.invoiceFileName) {
            const [invoiceFile] = formData[residueS3.residue].invoiceFiles!;
            const invoiceUpload = fetch(residueS3.invoiceCreateUrl!, {
              method: 'PUT',
              body: invoiceFile,
              headers: {
                'Content-Length': String(invoiceFile?.size),
              },
            });

            requests.push(invoiceUpload);
          }

          if (residueS3.videoFileName) {
            const [videoFile] = formData[residueS3.residue].videoFile!;
            const videoUpload = fetch(residueS3.videoCreateUrl!, {
              method: 'PUT',
              body: videoFile,
              headers: {
                'Content-Length': String(videoFile?.size),
              },
            });

            requests.push(videoUpload);
          }

          return requests;
        }, [] as any)
      );

      if (s3Data.length) {
        setIsUploadingVideos(false);
      }
    }
    setFormStep(FORM_STEPS.done);
  };

  const FORM_STEPS_LAYOUTS = {
    [FORM_STEPS.wasteDefinitions]: (
      <WasteDefinitions
        isConnected={isConnected}
        walletAddress={walletAddress}
      />
    ),
    [FORM_STEPS.wasteDetails]: (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitRecyForm}
      >
        {(formikProps) => (
          <Form>
            <WasteDetails
              {...formikProps}
              isLoading={isUploadingVideos || loading}
              hasPermissionToUploadDocuments={
                HODLER_TYPE?.key !== data?.me.profileType
              }
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

  return (
    <FormLayout>
      {isPageLoading ? <FormSkeleton /> : FORM_STEPS_LAYOUTS[formStep]}
    </FormLayout>
  );
};

export default withPrivateApollo(SubmitRecyForm);
