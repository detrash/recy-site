import { CheckCircle } from 'phosphor-react';

const DoneForm: React.FC = () => {
  return (
    <div className="flex flex-col flex-1">
      <section className="flex flex-col flex-1 justify-center items-center gap-4">
        <CheckCircle className="w-40 h-40 text-success" weight="fill" />
        <h2 className="text-2xl font-bold">Thanks for filling this form.</h2>
        <h3 className="text-lg">
          In case you&apos;ve uploaded a video, we&apos;ll be validating this
          form soon.
        </h3>
      </section>
      <div className="flex items-end justify-center">
        <button className="btn btn-primary text-white no-animation w-full sm:w-auto">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DoneForm;
