import classNames from 'classnames';
import { DownloadSimple } from 'phosphor-react';
import { useState } from 'react';
import {
  DocumentType,
  ResidueType,
  useFormDocumentsUrlByResidueLazyQuery,
} from 'src/graphql/generated/graphql';
import { generateDownload } from 'src/utils/generateDownload';

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
  const [isDownloadingFile, setIsDownloadFile] = useState(false);
  const [useFormDocumentsUrlByResidueQuery] =
    useFormDocumentsUrlByResidueLazyQuery();

  const loadVideoAndOpen = async () => {
    setIsDownloadFile(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = await useFormDocumentsUrlByResidueQuery({
      variables: { formId, residueType, documentType },
    });

    if (data) {
      const fetchData = await fetch(data.formDocumentsUrlByResidue);
      const blob = await fetchData.blob();

      const href = window.URL.createObjectURL(blob);

      const { pathname } = new window.URL(data.formDocumentsUrlByResidue);
      const [fileName] = pathname.split('/').slice(-1);

      generateDownload(href, fileName);
    }
    setIsDownloadFile(false);
  };

  return (
    <a
      className={classNames(
        'btn btn-sm btn-primary text-white flex items-center gap-1',
        {
          'btn-disabled': isDisabled,
          'loading btn-disabled': isDownloadingFile,
        }
      )}
      onClick={loadVideoAndOpen}
    >
      <DownloadSimple className="w-6 h-6" />
      <p>Download {documentType}</p>
    </a>
  );
};
