import classNames from 'classnames';
import { Dispatch, ForwardRefExoticComponent, SetStateAction } from 'react';
import { CheckCircle } from 'phosphor-react';

type GroupCheckboxProps = {
  items: {
    key: string;
    Icon: ForwardRefExoticComponent<any>;
  }[];
  setValues: Dispatch<SetStateAction<string[]>>;
  values: string[];
  checkboxClassName?: string;
};

const GroupCheckbox: React.FC<GroupCheckboxProps> = ({
  checkboxClassName,
  items,
  setValues,
  values,
}) => {
  const handleOnCheck = (
    hasPreviouslyChecked: boolean,
    checkboxItem: string,
  ) => {
    if (hasPreviouslyChecked) {
      setValues((values) => values.filter((value) => value !== checkboxItem));
      return;
    }

    setValues((values) => [...values, checkboxItem]);
  };

  return (
    <>
      {items.map((checkboxItem) => {
        const isActive = values.includes(checkboxItem.key);
        return (
          <button
            key={checkboxItem.key}
            className={classNames(
              'px-5 py-4 border-2 rounded-lg transition-all duration-150',
              {
                'border-primary': isActive,
              },
              checkboxClassName,
            )}
            onClick={() => handleOnCheck(isActive, checkboxItem.key)}
          >
            <div className="flex justify-between items-center">
              <h2
                className={classNames(
                  'text-base text-left font-bold tracking-wider',
                )}
              >
                {checkboxItem.key}
              </h2>
              <checkboxItem.Icon
                className={classNames('w-6 h-6', {
                  'text-primary': isActive,
                  'text-gray-400': !isActive,
                })}
              />
            </div>
          </button>
        );
      })}
    </>
  );
};
export default GroupCheckbox;
