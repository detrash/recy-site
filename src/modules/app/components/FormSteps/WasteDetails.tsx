import { useFormContext } from '@modules/app/context/formContext';
import { ArrowLeft } from 'phosphor-react';
import Dropzone from '../Dropzone';
import Steps from '../Steps';

type WasteDetails = {
  isRecyclerPerson: boolean;
  onNextWaste: () => void;
  onPreviousWaste: () => void;
  wasteType: string;
};

const WasteDetails: React.FC<WasteDetails> = ({
  isRecyclerPerson,
  onNextWaste,
  onPreviousWaste,
  wasteType,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-5">
      <section className="">
        <h2 className="text-2xl sm:text-3xl mb-1 text-gray-800 font-bold antialiased leading-relaxed">
          How many kgs of <span className="text-secondary">{wasteType}</span> do
          you have collected so far?
        </h2>
        <p className="text-sm text-gray-600">
          Remember to fill the form with care!
        </p>
      </section>

      <Steps />

      <section>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter amount</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              min="0"
              placeholder="e.g. 100"
              className="input input-bordered"
            />
            <span>Kgs</span>
          </label>
        </div>
      </section>

      {isRecyclerPerson && <Dropzone />}

      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between mt-auto">
        <button
          className="btn btn-outline text-neutral border border-neutral no-animation shadow-none w-full sm:w-auto flex items-center gap-2"
          onClick={onPreviousWaste}
        >
          <ArrowLeft className="w-6 h-6" />
          Go Back
        </button>
        <button
          className="btn btn-primary text-white no-animation w-full sm:w-auto"
          onClick={onNextWaste}
        >
          Advance
        </button>
      </div>
    </div>
  );
};
export default WasteDetails;
