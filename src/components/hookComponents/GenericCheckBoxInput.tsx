import { ReactElement } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IGenericCheckBoxInputProps<T extends string> {
  useFormRegisterReturn: UseFormRegisterReturn<T>;
  label?: ReactElement;
  error: string | undefined;
  id: string;
}

export function GenericCheckBoxInput<T extends string>({
  useFormRegisterReturn,
  label,
  error,
  id,
}: IGenericCheckBoxInputProps<T>) {
  const extractErrors = (error: string | undefined) => {
    if (!error || !(error.length > 0)) {
      return;
    }

    return (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={error}>
        {error}
      </p>
    );
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center ">
        <input
          id={id}
          type="checkbox"
          {...useFormRegisterReturn}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={id}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
      {extractErrors(error)}
    </div>
  );
}
