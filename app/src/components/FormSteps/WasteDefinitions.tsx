import { useFormContext } from 'src/context/formContext';
import { FORM_STEPS, USER_WASTE_TYPES } from 'src/utils/constants';
import GroupCheckbox from '../GroupCheckbox';

type WasteDefinitionsProps = {
  isConnected: boolean;
  walletAddress: string | undefined;
};

const WasteDefinitions: React.FC<WasteDefinitionsProps> = ({
  isConnected,
  walletAddress,
}) => {
  const { wasteTypes, setWasteTypes, setFormStep } = useFormContext();

  return (
    <div className="flex flex-col flex-1 gap-4 sm:gap-12">
      <section className="mb-3 sm:m-0">
        <h2 className="text-2xl sm:text-3xl mb-1 text-gray-800 font-bold antialiased leading-relaxed">
          Recy Form Submission
        </h2>
        <p className="text-sm text-gray-600">
          Here is where you show how you are keeping our world clean and get
          some cRECYS.
        </p>
        <p className="text-sm text-gray-600">
          Remember to fill the form with care. We are a reputation based system.
        </p>
        <p className="mt-2">
          Wallet:{' '}
          <span className="font-bold">
            {isConnected ? walletAddress : 'Not connected'}
          </span>
        </p>
      </section>

      <section>
        <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px]">
          What kinds of waste are you reporting today?
        </h2>
        <div className="grid grid-cols-6 gap-3">
          <GroupCheckbox
            items={USER_WASTE_TYPES}
            setValues={setWasteTypes}
            values={wasteTypes}
            checkboxClassName="col-span-6 sm:col-span-3"
          />
        </div>
      </section>

      <div className="flex items-end justify-center mt-auto">
        <button
          disabled={!wasteTypes.length}
          className="btn btn-primary text-white no-animation w-full sm:w-auto"
          onClick={() => setFormStep(FORM_STEPS.wasteDetails)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default WasteDefinitions;
