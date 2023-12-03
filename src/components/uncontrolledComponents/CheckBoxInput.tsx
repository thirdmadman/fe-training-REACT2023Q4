import { ReactElement } from 'react';

interface IGenderInputProps {
  label?: ReactElement;
  errors: string[] | undefined;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function CheckBoxInput({
  label,
  errors,
  id,
  inputRef,
}: IGenderInputProps) {
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
    <div className="flex flex-col mb-4">
      <div className="flex items-center ">
        <input
          id={id}
          type="checkbox"
          ref={inputRef}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={id}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
      {extractErrors(errors)}
    </div>
  );
}
