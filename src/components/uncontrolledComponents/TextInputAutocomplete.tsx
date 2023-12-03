import { useEffect, useState } from 'react';
import { InputAutocompleteList } from './InputAutocompleteList';

interface ITextInputAutocompleteProps {
  label?: string;
  options: Array<string>;
  errors: string[] | undefined;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function TextInputAutocomplete({
  label,
  options,
  errors,
  id,
  inputRef,
}: ITextInputAutocompleteProps) {
  const [isAutocompleteHidden, setIsAutocompleteHidden] = useState(true);
  const [filterSting, setFilterSting] = useState('');

  useEffect(() => {
    const func = () => {
      setTimeout(() => {
        setIsAutocompleteHidden(true);
      }, 500);
    };

    inputRef.current && inputRef.current.addEventListener('focusout', func);

    const ref = inputRef.current;

    return () => {
      ref && ref.removeEventListener('focusout', func);
    };
  }, [inputRef]);

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

  const onAutocompleteOptionSelected = (value: string) => {
    if (inputRef.current) {
      inputRef.current.value = value;
      setIsAutocompleteHidden(true);
    }
  };

  const openIcon = (
    <svg
      className="w-6"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ArrowDropDownIcon"
    >
      <path d="M7 10l5 5 5-5z"></path>
    </svg>
  );

  const closeIcon = (
    <svg
      className="w-6"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ArrowDropDownIcon"
    >
      <path d="M17 15L12 10L7 15L17 15Z"></path>
    </svg>
  );

  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative mt-4">
        <input
          id={id}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
          ${isAutocompleteHidden ? '' : 'rounded-bl-none rounded-br-none'}`}
          ref={inputRef}
          autoComplete="off"
          onClick={() => setIsAutocompleteHidden(false)}
          onChange={(e) => {
            setFilterSting(e.target.value);
            setIsAutocompleteHidden(false);
          }}
        />
        <InputAutocompleteList
          options={options}
          onOptionSelectedClick={onAutocompleteOptionSelected}
          isHidden={isAutocompleteHidden}
          filter={filterSting}
        />
        <div
          className="absolute right-0 top-2 cursor-pointer"
          onClick={() => setIsAutocompleteHidden(!isAutocompleteHidden)}
        >
          {isAutocompleteHidden ? openIcon : closeIcon}
        </div>
      </div>

      {extractErrors(errors)}
    </div>
  );
}
