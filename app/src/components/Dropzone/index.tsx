import { useDropzone } from 'react-dropzone';
import {
  CloudArrowUp,
  Warning,
  FileVideo,
  FilePdf,
  FileImage,
} from 'phosphor-react';
import classNames from 'classnames';

type DropzoneProps = {
  setFileValue: (acceptedFiles: File[]) => void;
  fileValue: File[] | undefined;
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

const Dropzone: React.FC<DropzoneProps> = ({
  setFileValue,
  fileValue,
  acceptableFiles,
  maxFiles,
}) => {
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
    onDropAccepted(file) {
      setFileValue(file as any);
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
          {!fileValue && <CloudArrowUp className="w-32 h-32 text-gray-200" />}
          <div className=" w-full text-center">
            {fileValue ? (
              <ul className="divide-y w-full">
                {fileValue.map((file) => (
                  <li key={file.name} className="flex w-full items-center p-2">
                    {getFileIcon(file.name)}
                    <p className="text-sm">{file.name}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg">
                {isDragActive
                  ? 'Drop the file here'
                  : `Drag & drop the file here`}
              </p>
            )}
          </div>
          {!fileValue && <p className="text-sm">or</p>}
          <button
            type="button"
            className="btn btn-outline btn-primary border border-primary no-animation shadow-none"
            onClick={open}
          >
            Browse Files
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Warning className="text-warning w-6 h-6" weight="fill" />
        <p className="font-bold">
          Only {supportedFiles} files are supported.
          {maxFiles && <span> Maximum of {maxFiles}</span>}
        </p>
      </div>
    </section>
  );
};

export default Dropzone;
