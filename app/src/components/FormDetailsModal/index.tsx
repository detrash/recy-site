import { useFormByIdQuery } from 'src/graphql/generated/graphql';
import { useGenerateNFT } from 'src/hooks/useGenerateNFT';
import Modal from '../Modal';
import { FormDetailsModalBody } from './FormDetailsModalBody';
import { FormDetailsModalFooter } from './FormDetailsModalFooter';

type FormDetailsModalProps = {
  formId: string;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  title: string;
  generatingMessage: string;
  successMessage: string;
};

export const FormDetailsModal: React.FC<FormDetailsModalProps> = ({
  formId,
  isModalOpen,
  setModalOpen,
  title,
  generatingMessage,
  successMessage,
}) => {
  const { handleFormAudit } = useGenerateNFT(formId);
  const { data, loading, client } = useFormByIdQuery({
    variables: {
      FORM_ID: formId,
    },
  });

  const onFormAudit = async () => {
    await handleFormAudit(generatingMessage, successMessage);
    await client.resetStore();
  };

  const form = data?.form;

  return (
    <Modal
      isOpen={isModalOpen}
      onCloseModal={() => setModalOpen(false)}
      title={title}
      content={<FormDetailsModalBody formData={data} isLoading={loading} />}
      footer={
        <FormDetailsModalFooter
          onFormAudit={onFormAudit}
          formId={formId}
          isFormAuthorizedByAdmin={form?.isFormAuthorizedByAdmin!}
          isLoading={loading}
        />
      }
    />
  );
};
