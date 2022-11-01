import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import {
  CloudArrowUp,
  FileImage,
  FilePdf,
  FileVideo,
  TrashSimple,
  Warning,
} from 'phosphor-react';
import { useDropzone } from 'react-dropzone';

type DropzoneProps = {
  setFiles: (acceptedFiles: File[]) => void;
  files: File[] | undefined;
  acceptableFiles: {
    [mime: string]: string[];
  };
  maxFiles?: number;
};

const ICON_BY_EXTENSION_FILE = {
  PDF: <FilePdf className="text-primary h-8 w-8" />,
  IMAGE: <FileImage className="text-primary h-8 w-8" />,
  VIDEO: <FileVideo className="text-primary h-8 w-8" />,
};

const NoFileUploadedContent: React.FC<{
  isDragActive: boolean;
  open: () => void;
  browseLabel: string;
  orLabel: string;
  dropFileHereLabel: string;
  dragFileHere: string;
}> = ({
  isDragActive,
  open,
  browseLabel,
  orLabel,
  dragFileHere,
  dropFileHereLabel,
}) => {
  return (
    <>
      <CloudArrowUp className="w-32 h-32 text-gray-200" />
      <div className=" w-full text-center">
        <p className="text-lg">
          {isDragActive ? dropFileHereLabel : dragFileHere}
        </p>
      </div>
      <p className="text-sm">{orLabel}</p>
      <button
        type="button"
        className="btn btn-outline btn-primary border border-primary no-animation shadow-none"
        onClick={open}
      >
        {browseLabel}
      </button>
    </>
  );
};

const Dropzone: React.FC<DropzoneProps> = ({
  setFiles,
  files,
  acceptableFiles,
  maxFiles,
}) => {
  const { t } = useTranslation();
  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    maxFiles: maxFiles,
    accept: acceptableFiles,
    noClick: true,
    noKeyboard: true,
    onDropAccepted(uploadedFiles) {
      if (!maxFiles) {
        const oldFiles = files?.filter((currentFile) =>
          uploadedFiles.some((file) => file.name !== currentFile.name)
        );
        const totalFiles = [...uploadedFiles, ...oldFiles!];
        setFiles(totalFiles);
        return;
      }
      setFiles(uploadedFiles);
    },
  });

  const supportedFiles = Object.values(acceptableFiles).reduce(
    (files, file) => {
      const extensions = file.join(', ').replaceAll('.', '').toUpperCase();

      if (files) {
        return files.concat(`, ${extensions}`);
      }
      return files.concat(extensions);
    },
    ''
  );

  const getFileIcon = (fileName: string) => {
    const [fileExtension] = fileName.split('.').slice(-1);
    const extensionFormat = fileExtension.toUpperCase();

    if (extensionFormat === 'PDF') {
      return ICON_BY_EXTENSION_FILE.PDF;
    }

    if (extensionFormat === 'PNG') {
      return ICON_BY_EXTENSION_FILE.IMAGE;
    }

    return ICON_BY_EXTENSION_FILE.VIDEO;
  };

  const handleOnRemoveFile = (fileName: string) => {
    if (files) {
      const filteresFiles = files.filter((file) => file.name !== fileName);
      setFiles(filteresFiles);
    }
  };

  return (
    <section className="flex flex-col flex-1 gap-2">
      <div
        {...getRootProps({
          className: classNames('flex-1 border-2 border-dashed p-6', {
            'border-error': isDragReject,
            'border-success': isDragAccept,
          }),
        })}
      >
        <input id="test" {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          {!files?.length ? (
            <NoFileUploadedContent
              isDragActive={isDragActive}
              open={open}
              browseLabel={t('submit:browse_files')}
              orLabel={t('submit:or')}
              dragFileHere={t('submit:drag_drop')}
              dropFileHereLabel={t('submit:drop_file')}
            />
          ) : (
            <>
              <div className=" w-full text-center">
                <ul className="divide-y w-full">
                  {files.map((file) => (
                    <li
                      key={file.name}
                      className="flex w-full items-center justify-between p-2"
                    >
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.name)}
                        <p className="text-sm">{file.name}</p>
                      </div>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleOnRemoveFile(file.name)}
                      >
                        <TrashSimple className="text-error h-6 w-6" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-primary border border-primary no-animation shadow-none"
                onClick={open}
              >
                {t('submit:browse_files')}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Warning className="text-warning w-6 h-6" weight="fill" />
        <p className="font-bold">
          {t('submit:only')} {supportedFiles} {t('submit:supported')}
          {maxFiles && (
            <span>
              {' '}
              {t('submit:maximum')} {maxFiles}
            </span>
          )}
        </p>
      </div>
    </section>
  );
};

export default Dropzone;
