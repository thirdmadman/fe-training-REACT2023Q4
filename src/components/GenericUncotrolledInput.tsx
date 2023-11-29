import { HTMLInputTypeAttribute } from 'react';

interface IGenericUncontrolledInputProps {
  label?: string;
  errors: string[] | undefined;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function GenericUncontrolledInput({
  label,
  errors,
  id,
  type,
  placeholder,
  inputRef,
}: IGenericUncontrolledInputProps) {
  const extractErrors = (errors: string[] | undefined) => {
    if (!errors || !(errors.length > 0)) {
      return;
    }

    return errors.map((el) => (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={el}>
        {el}
      </p>
    ));
  };

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        <input
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type={type}
          placeholder={placeholder}
          ref={inputRef}
        />
        {extractErrors(errors)}
      </label>
    </div>
  );
}
