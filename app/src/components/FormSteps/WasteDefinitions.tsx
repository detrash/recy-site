import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation();
  const { wasteTypes, setWasteTypes, setFormStep } = useFormContext();

  return (
    <div className="flex flex-col flex-1 gap-4 sm:gap-12">
      <section className="mb-3 sm:m-0">
        <h2 className="text-2xl sm:text-3xl mb-1 text-gray-800 font-bold antialiased leading-relaxed">
          {t('submit:submit_title')}
        </h2>
        <p className="text-sm text-gray-600">
          {t('submit:submit_description1')}
        </p>
        <p className="text-sm text-gray-600">
          {t('submit:submit_description2')}
        </p>
        <p className="mt-2">
          {t('common:wallet')}:{' '}
          <span className="font-bold">
            {isConnected ? walletAddress : t('submit:not_connected')}
          </span>
        </p>
      </section>

      <section>
        <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px]">
          {t('submit:type_of_residues')}
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
          {t('submit:confirm')}
        </button>
      </div>
    </div>
  );
};

export default WasteDefinitions;
