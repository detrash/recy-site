import classNames from 'classnames';
import { useField } from 'formik';
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';

interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  inputType?: 'input' | 'textarea';
  label: string;
  required?: boolean;
  inputGroupLabel?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputTypes> = (
  { label, required, inputType = 'input', inputGroupLabel, ...props },
  ref
) => {
  const [field, meta] = useField(props as any);

  const INPUT_TYPES = {
    input: (
      <input
        type="text"
        id={props.name}
        className={classNames(
          'p-3 disabled:bg-slate-50 focus:ring-primary focus:border-primary block w-full sm:text-sm rounded-md',
          {
            'border-gray-300': !meta.touched,
            'border-error': meta.touched && meta.error,
            'border-success': meta.touched && !meta.error,
          }
        )}
        ref={ref}
        {...field}
        {...props}
      />
    ),
    textarea: (
      <textarea
        id={props.name}
        className={classNames(
          'mt-1 p-3 disabled:bg-slate-50  focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md',
          {
            'border-error': meta.touched && meta.error,
            'border-success': meta.touched && !meta.error,
          }
        )}
        ref={ref}
        {...field}
        {...(props as any)}
      />
    ),
  };
  return (
    <>
      <label
        htmlFor={props.name}
        className={classNames('block text-sm font-medium text-gray-700', {
          "after:content-['*'] after:ml-0.5 after:text-red-500": required,
        })}
      >
        {label}
      </label>
      {inputGroupLabel ? (
        <label className="input-group">
          {INPUT_TYPES[inputType]}
          <span>{inputGroupLabel}</span>
        </label>
      ) : (
        INPUT_TYPES[inputType]
      )}

      {(typeof meta.error === 'string' ||
        (meta.error as any) instanceof String) &&
        meta.touched && (
          <p className="ml-2 mt-1 text-sm text-red-500">{meta.error}</p>
        )}
    </>
  );
};

const Input = forwardRef(InputBase);
export default Input;
