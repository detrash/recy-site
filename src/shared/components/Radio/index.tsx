import classNames from 'classnames';
import { CheckCircle } from 'phosphor-react';

type RadioProps = {
  isActive: boolean;
  setValue: (value: string) => void;
  value: string;
};

const Radio: React.FC<RadioProps> = ({ isActive, setValue, value }) => {
  return (
    <button
      className={classNames(
        'p-4 border-2 rounded-md transition-all duration-150',
        {
          'border-primary': isActive,
        },
      )}
      onClick={() => setValue(value)}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 uppercase">I&apos;m</p>
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
