import classNames from 'classnames';
import { FormikProps } from 'formik';
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
  const hasFilledDocuments =
    values[wasteType]?.videoFile || values[wasteType].invoicesFiles.length;
  const isButtonDisabled =
    !values[wasteType]?.amount ||
    !!errors[wasteType]?.amount ||
    (hasPermissionToUploadDocuments ? !hasFilledDocuments : false);

  const helperVideoText =
    'Now record a video of the volume collected in a manner we can see the weight display of the scale. Make sure the video catches the whole uncovered volume and not only part of it. Please say the correct amount while filming so our validator can listen it.';

  const helperInvoiceText =
    'Upload below the official invoice that specifies the type and amount of waste you are recycling. PDF or PNG only';
  return (
    <div className="flex flex-col flex-1 gap-5">
      <section>
        <h2 className="text-2xl mb-1 text-gray-800 font-bold antialiased leading-relaxed">
          How many kgs of <span className="text-secondary">{wasteType}</span>{' '}
          have you collected so far?
        </h2>
        <p className="text-sm text-gray-600">Type the approximate amount</p>
      </section>

      <Steps />

      <section className="grid grid-cols-6">
        <div className="col-span-6 sm:col-span-4">
          <Input
            label="Enter amount"
            inputGroupLabel="Kgs"
            type="number"
            name={`${wasteType}.amount`}
            placeholder="e.g. 100"
            required
          />
        </div>
      </section>

      {hasPermissionToUploadDocuments && (
        <>
          <div>
            <div className="mb-2">
              <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px] flex items-center gap-1">
                Upload your Invoice
                <div
                  className="tooltip hidden sm:inline normal-case	"
                  data-tip={helperInvoiceText}
                >
                  <Question className="h-6 w-6" />
                </div>
              </h2>

              <p className="text-sm sm:hidden">{helperInvoiceText}</p>
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
            <legend className="text-sm">OR</legend>
          </fieldset>
          <div>
            <div className="mb-2">
              <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px] flex items-center gap-1">
                Upload a video representing the amount of waste
                <div
                  className="tooltip hidden sm:inline normal-case	"
                  data-tip={helperVideoText}
                >
                  <Question className="h-6 w-6" />
                </div>
              </h2>

              <p className="text-sm sm:hidden">{helperVideoText}</p>
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
          Go Back
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
          {isLoading ? 'Saving form' : 'Advance'}
        </button>
      </div>
    </div>
  );
};
export default WasteDetails;
