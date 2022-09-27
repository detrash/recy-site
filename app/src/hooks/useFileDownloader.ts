import { useState } from 'react';
import {
  DocumentType,
  ResidueType,
  useFormDocumentsUrlByResidueLazyQuery,
} from 'src/graphql/generated/graphql';
import { generateDownload } from 'src/utils/generateDownload';

export const useFileDownloader = () => {
  const [isDownloadingFile, setIsDownloadFile] = useState(false);

  const [useFormDocumentsUrlByResidueQuery] =
    useFormDocumentsUrlByResidueLazyQuery();

  const loadFileAndDownload = async (
    formId: string,
    residueType: ResidueType,
    documentType: DocumentType
  ) => {
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

  return { loadFileAndDownload, isDownloadingFile };
};
