import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IGenericInputProps<T extends string> {
  useFormRegisterReturn: UseFormRegisterReturn<T>;
  label?: string;
  error: string | undefined;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
}

export function GenericInput<T extends string>({
  useFormRegisterReturn,
  label,
  error,
  id,
  type,
  placeholder,
}: IGenericInputProps<T>) {
  const extractErrors = (error: string | undefined) => {
    if (!error || !(error.length > 0)) {
      return;
    }

    return (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
    );
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
          className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type={type}
          placeholder={placeholder}
          autoComplete="on"
          {...useFormRegisterReturn}
        />
        {extractErrors(error)}
      </label>
    </div>
  );
}
