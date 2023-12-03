interface IInputAutocompleteListProps {
  options: Array<string>;
  onOptionSelectedClick: (value: string) => void;
  isHidden: boolean;
  filter: string;
}

export function InputAutocompleteList({
  options,
  onOptionSelectedClick,
  isHidden,
  filter,
}: IInputAutocompleteListProps) {
  const filteredOptions = options.filter((el) =>
    el.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  const showOptions = (list: Array<string>) => {
    if (!list || list.length === 0) {
      return <p className="p-3">no suggestions</p>;
    }

    return list.map((el) => (
      <p
        className="p-3 cursor-pointer hover:bg-sky-700 hover:text-white"
        key={el}
        onClick={() => onOptionSelectedClick(el)}
      >
        {el}
      </p>
    ));
  };

  return (
    <div
      className={`absolute py-2 bg-gray-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    ${isHidden ? 'invisible' : ''}`}
    >
      <div className="max-h-40 overflow-y-scroll">
        {showOptions(filteredOptions)}
      </div>
    </div>
  );
}
