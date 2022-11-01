import classNames from 'classnames';
import { FormikProps } from 'formik';
import { useTranslation } from 'next-i18next';
import { ArrowLeft, Question } from 'phosphor-react';
import { RecyFormSchema } from 'src/utils/YupSchema';
import Dropzone from '../Dropzone';
import Input from '../Input';
import Steps from '../Steps';

interface WasteDetails extends FormikProps<RecyFormSchema> {
  isLoading: boolean;
  hasPermissionToUploadDocuments: boolean;
  onNextWaste: (submitForm: () => void) => void;
  onPreviousWaste: () => void;
  wasteType: string;
}

const WasteDetails: React.FC<WasteDetails> = ({
  isLoading,
  hasPermissionToUploadDocuments,
  onNextWaste,
  onPreviousWaste,
  wasteType,
  values,
  errors,
  setFieldValue,
  submitForm,
}) => {
  const { t } = useTranslation();

  const hasFilledDocuments =
    values[wasteType]?.videoFile || values[wasteType].invoicesFiles.length;
  const isButtonDisabled =
    !values[wasteType]?.amount ||
    !!errors[wasteType]?.amount ||
    (hasPermissionToUploadDocuments ? !hasFilledDocuments : false);

  return (
    <div className="flex flex-col flex-1 gap-5">
      <section>
        <h2 className="text-2xl mb-1 text-gray-800 font-bold antialiased leading-relaxed">
          {t('submit:details_title1')}{' '}
          <span className="text-secondary">
            {t(`common:${wasteType.toLowerCase()}`)}
          </span>{' '}
          {t('submit:details_title2')}
        </h2>
        <p className="text-sm text-gray-600">
          {t('submit:type_approximate_amount')}
        </p>
      </section>

      <Steps />

      <section className="grid grid-cols-6">
        <div className="col-span-6 sm:col-span-4">
          <Input
            label={t('submit:enter_amount')}
            inputGroupLabel="Kgs"
            type="number"
            name={`${wasteType}.amount`}
            placeholder="e.g. 100"
            required
          />
          <span className="text-xs text-gray-400">
            {t('submit:minimum_of_1')}
          </span>
        </div>
      </section>

      {hasPermissionToUploadDocuments && (
        <>
          <div>
            <div className="mb-2">
              <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px] flex items-center gap-1">
                {t('submit:upload_invoice')}
                <div
                  className="tooltip hidden sm:inline normal-case	"
                  data-tip={t('submit:helper_invoice')}
                >
                  <Question className="h-6 w-6" />
                </div>
              </h2>

              <p className="text-sm sm:hidden">{t('submit:helper_invoice')}</p>
            </div>
            <Dropzone
              setFiles={(files) => {
                setFieldValue(`${wasteType}.invoicesFiles`, files);
              }}
              files={values[wasteType].invoicesFiles}
              acceptableFiles={{
                'application/pdf': ['.pdf'],
                'image/png': ['.png'],
              }}
            />
          </div>

          <fieldset className="border-t border-solid border-gray-300 p-3 text-center text-gray-400">
            <legend className="text-sm">{t('submit:or')}</legend>
          </fieldset>
          <div>
            <div className="mb-2">
              <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px] flex items-center gap-1">
                {t('submit:upload_video')}
                <div
                  className="tooltip hidden sm:inline normal-case	"
                  data-tip={t('submit:helper_video')}
                >
                  <Question className="h-6 w-6" />
                </div>
              </h2>

              <p className="text-sm sm:hidden">{t('submit:helper_video')}</p>
            </div>
            <Dropzone
              setFiles={(file) => {
                setFieldValue(`${wasteType}.videoFile`, file);
              }}
              files={values[wasteType].videoFile}
              acceptableFiles={{
                'video/*': ['.mp4', '.mpeg', '.mpg'],
              }}
              maxFiles={1}
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between mt-auto">
        <button
          type="button"
          className="btn btn-outline text-neutral border border-neutral no-animation shadow-none w-full sm:w-auto flex items-center gap-2"
          onClick={onPreviousWaste}
        >
          <ArrowLeft className="w-6 h-6" />
          {t('submit:go_back')}
        </button>
        <button
          disabled={isButtonDisabled}
          className={classNames(
            'btn btn-primary text-white no-animation w-full sm:w-auto',
            {
              'loading btn-disabled': isLoading,
            }
          )}
          type="button"
          onClick={() => {
            onNextWaste(submitForm);
          }}
        >
          {isLoading ? t('submit:saving_form') : t('submit:advance')}
        </button>
      </div>
    </div>
  );
};
export default WasteDetails;
