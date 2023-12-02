import { HTMLInputTypeAttribute, useState } from 'react';
import { calculatePasswordStrength } from '../../utils/calculatePasswordStrength';

interface IPasswordInputProps {
  label?: string;
  errors: string[] | undefined;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function PasswordInput({
  label,
  errors,
  id,
  type,
  placeholder,
  inputRef,
}: IPasswordInputProps) {
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null);

  const extractErrors = (errors: string[] | undefined) => {
    if (!errors || !(errors.length > 0)) {
      return;
    }

    return errors.slice(0, 1).map((el) => (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={el}>
        {el}
      </p>
    ));
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
          ref={inputRef}
          onChange={(e) =>
            setPasswordStrength(calculatePasswordStrength(e.target.value))
          }
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

        {extractErrors(errors)}
      </label>
    </div>
  );
}
