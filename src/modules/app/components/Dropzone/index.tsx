import { useDropzone } from 'react-dropzone';
import { CloudArrowUp, Warning, FileVideo } from 'phosphor-react';
import classNames from 'classnames';

const Dropzone: React.FC = () => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      'video/*': ['.mp4', '.mpeg', '.mpg'],
    },
    noClick: true,
    noKeyboard: true,
    onDrop(acceptedFiles, fileRejections, event) {
      console.log('dropped file');
    },
  });

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
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <CloudArrowUp className="w-32 h-32 text-gray-200" />
          <div className="flex items-center">
            {acceptedFiles.length ? (
              <>
                <FileVideo className="text-primary h-8 w-8" />
                <p className="text-lg">{acceptedFiles[0].name}</p>
              </>
            ) : (
              <p className="text-lg">
                {isDragActive
                  ? 'Drop the file here'
                  : `Drag & drop the file here`}
              </p>
            )}
          </div>
          <p className="text-sm">or</p>
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
        <p className="font-bold">Only MP4 and MPEG files are supported</p>
      </div>
    </section>
  );
};

export default Dropzone;
