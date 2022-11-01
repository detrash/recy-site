import classNames from 'classnames';
import { CheckCircle } from 'phosphor-react';

type RadioProps = {
  id: string;
  isActive: boolean;
  isDisabled?: boolean;
  setValue: (value: string) => void;
  value: string;
  imLabel: string;
};

const Radio: React.FC<RadioProps> = ({
  id,
  isActive,
  isDisabled,
  setValue,
  value,
  imLabel,
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={classNames(
        'p-4 border-2 rounded-md transition-all duration-150',
        {
          'border-primary': isActive,
        },
        {
          'opacity-30 cursor-not-allowed': isDisabled,
        }
      )}
      onClick={() => setValue(id)}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 uppercase">{imLabel}</p>
        {isActive && (
          <CheckCircle weight="fill" className="w-5 h-5 text-primary" />
        )}
      </div>

      <h2 className="text-base text-left font-bold text-gray-800 tracking-wider">
        {value}
      </h2>
    </button>
  );
};
export default Radio;
