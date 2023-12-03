import { HTMLInputTypeAttribute, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IGenericPasswordInputProps<T extends string> {
  useFormRegisterReturn: UseFormRegisterReturn<T>;
  label?: string;
  error: string | undefined;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
}

export function GenericPasswordInput<T extends string>({
  label,
  error,
  id,
  type,
  placeholder,
  useFormRegisterReturn,
}: IGenericPasswordInputProps<T>) {
  const [passwordStrength] = useState<number | null>(null);

  const extractErrors = (error: string | undefined) => {
    if (!error || !(error.length > 0)) {
      return;
    }

    return (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
    );
  };

  const passwordStrengthNameMap = [
    'unbelievable weak',
    'The Weakest',
    'little better but weak :(',
    'still weak :(',
    'strong as Chuck Norris',
  ];

  const passwordStrengthColorMap = ['red', 'orange', 'amber', 'yellow', 'lime'];

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
        <p
          className={
            passwordStrength !== null
              ? `mt-3 text-${passwordStrengthColorMap[passwordStrength]}-500`
              : 'text-red-500 text-orange-500 text-amber-500 text-yellow-500 text-lime-500'
          }
        >
          {passwordStrength !== null
            ? `Your password is ${passwordStrengthNameMap[passwordStrength]}`
            : ''}
        </p>

        {extractErrors(error)}
      </label>
    </div>
  );
}
