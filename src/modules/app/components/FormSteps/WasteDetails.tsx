import { RecyFormSchema } from '@modules/app/utils/YupSchema';
import Input from '@shared/components/Input';
import { Form, FormikProps } from 'formik';
import { ArrowLeft } from 'phosphor-react';
import Dropzone from '../Dropzone';
import Steps from '../Steps';

interface WasteDetails extends FormikProps<RecyFormSchema> {
  isRecyclerPerson: boolean;
  onNextWaste: () => void;
  onPreviousWaste: () => void;
  wasteType: string;
}

const WasteDetails: React.FC<WasteDetails> = ({
  isRecyclerPerson,
  onNextWaste,
  onPreviousWaste,
  wasteType,
  values,
  errors,
  setFieldValue,
}) => {
  const isButtonDisabled =
    !values[wasteType]?.amount ||
    !!errors[wasteType]?.amount ||
    (isRecyclerPerson ? !values[wasteType]?.videoProof : false);

  return (
    <Form className="flex flex-col flex-1 gap-5">
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

      {isRecyclerPerson && (
        <Dropzone
          setFileValue={(file) =>
            setFieldValue(`${wasteType}.videoProof`, file[0])
          }
          fileValue={values[wasteType].videoProof}
        />
      )}

      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between mt-auto">
        <button
          className="btn btn-outline text-neutral border border-neutral no-animation shadow-none w-full sm:w-auto flex items-center gap-2"
          onClick={onPreviousWaste}
        >
          <ArrowLeft className="w-6 h-6" />
          Go Back
        </button>
        <button
          disabled={isButtonDisabled}
          className="btn btn-primary text-white no-animation w-full sm:w-auto"
          type="submit"
          onClick={onNextWaste}
        >
          Advance
        </button>
      </div>
    </Form>
  );
};
export default WasteDetails;
