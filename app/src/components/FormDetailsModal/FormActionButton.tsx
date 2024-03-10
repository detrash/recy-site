import classNames from 'classnames';
import { DownloadSimple } from 'phosphor-react';
import { ResidueType } from 'src/graphql/generated/graphql';
import { useFileDownloader } from 'src/hooks/useFileDownloader';

type FormActionButtonProps = {
  formId: string;
  isDisabled: boolean;
  documentType: 'INVOICES' | 'VIDEO';
  residueType: ResidueType;
  label: string;
};

const FormActionButton: React.FC<FormActionButtonProps> = ({
  formId,
  isDisabled,
  documentType,
  residueType,
  label,
}) => {
  const { isDownloadingFile, loadFileAndDownload } = useFileDownloader();

  console.log(formId, residueType, documentType)

  return (
    <a
      className={classNames(
        'btn btn-sm btn-primary text-white flex items-center gap-1',
        {
          'btn-disabled': isDisabled,
          'loading btn-disabled': isDownloadingFile,
        }
      )}
      onClick={() => loadFileAndDownload(formId, residueType, documentType)}
    >
      <DownloadSimple className="w-6 h-6" />
      <p>Download {label}</p>
    </a>
  );
};
export default FormActionButton;
