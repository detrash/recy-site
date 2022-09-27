import classNames from 'classnames';
import { DownloadSimple } from 'phosphor-react';
import { DocumentType, ResidueType } from 'src/graphql/generated/graphql';
import { useFileDownloader } from 'src/hooks/useFileDownloader';

type FormActionButtonProps = {
  formId: string;
  isDisabled: boolean;
  documentType: DocumentType;
  residueType: ResidueType;
};

export const FormActionButton: React.FC<FormActionButtonProps> = ({
  formId,
  isDisabled,
  documentType,
  residueType,
}) => {
  const { isDownloadingFile, loadFileAndDownload } = useFileDownloader();

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
      <p>Download {documentType}</p>
    </a>
  );
};
