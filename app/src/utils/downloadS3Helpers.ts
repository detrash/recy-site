import { downloadZip } from "client-zip";

const generateFileDownload = (href: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadSingleS3File = async (fileDownloadUrl: string) => {
  console.log(fileDownloadUrl, "fileDownloadUrl");
  const fetchData = await fetch(fileDownloadUrl);
  const blob = await fetchData.blob();

  const href = window.URL.createObjectURL(blob);

  const { pathname } = new window.URL(fileDownloadUrl);
  const [fileName] = pathname.split("/").slice(-1);

  generateFileDownload(href, fileName);
};

const downloadMultipleS3AndCompressFile = async (
  fileDownloadUrls: string[],
  formId: string
) => {
  const files = await Promise.all(
    fileDownloadUrls.map((fileDownloadUrl) => fetch(fileDownloadUrl))
  );
  const zipBlob = await downloadZip(files).blob();

  const href = window.URL.createObjectURL(zipBlob);

  const fileName = `form-${formId}-invoices.zip`;

  generateFileDownload(href, fileName);
};

export { downloadSingleS3File, downloadMultipleS3AndCompressFile };
