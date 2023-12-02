interface IGenderInputProps {
  label?: string;
  placeholder?: string;
  errors: string[] | undefined;
  id: string;
  inputRef: React.RefObject<HTMLSelectElement>;
}

export function GenderInput({
  label,
  placeholder,
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
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={id}
        ref={inputRef}
        className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected value={'null'}>
          {placeholder || 'Select from list'}
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {extractErrors(errors)}
    </div>
  );
}
