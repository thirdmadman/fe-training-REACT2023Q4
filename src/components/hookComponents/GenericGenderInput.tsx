import { UseFormRegisterReturn } from 'react-hook-form';

interface IGenericGenderInputProps<T extends string> {
  useFormRegisterReturn: UseFormRegisterReturn<T>;
  label?: string;
  placeholder?: string;
  error: string | undefined;
  id: string;
}

export function GenericGenderInput<T extends string>({
  label,
  placeholder,
  error,
  id,
  useFormRegisterReturn,
}: IGenericGenderInputProps<T>) {
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
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={id}
        {...useFormRegisterReturn}
        defaultValue={'null'}
        className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled value={'null'}>
          {placeholder || 'Select from list'}
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {extractErrors(error)}
    </div>
  );
}
