/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import {
  ResidueType,
  useDocumentInvoicesUrlByResidueLazyQuery,
  useDocumentVideoUrlByResidueLazyQuery,
} from "src/graphql/generated/graphql";
import {
  downloadMultipleS3AndCompressFile,
  downloadSingleS3File,
} from "src/utils/downloadS3Helpers";

export const useFileDownloader = () => {
  const [isDownloadingFile, setIsDownloadFile] = useState(false);

  const [useDocumentVideoUrlByResidueQuery] =
    useDocumentVideoUrlByResidueLazyQuery();

  const [useDocumentInvoicesUrlByResidueQuery] =
    useDocumentInvoicesUrlByResidueLazyQuery();

  const loadFileAndDownload = async (
    formId: string,
    residueType: ResidueType,
    documentType: "INVOICES" | "VIDEO"
  ) => {
    setIsDownloadFile(true);

    https: if (documentType === "VIDEO") {
      const { data } = await useDocumentVideoUrlByResidueQuery({
        variables: { formId, residueType },
      });

      console.log(data, "data");
      console.log(
        data?.documentVideoUrlByResidue,
        "data.documentVideoUrlByResidue"
      );

      if (data) {
        await downloadSingleS3File(data.documentVideoUrlByResidue);
      }
    } else {
      const { data } = await useDocumentInvoicesUrlByResidueQuery({
        variables: { formId, residueType },
      });

      if (data) {
        await downloadMultipleS3AndCompressFile(
          data.documentInvoicesUrlByResidue,
          formId
        );
      }
    }

    setIsDownloadFile(false);
  };

  return { loadFileAndDownload, isDownloadingFile };
};
