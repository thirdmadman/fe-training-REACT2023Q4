import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { useRouter } from 'next/router';

export function SearchBar() {
  const router = useRouter();
  const searchString = useAppSelector((state) => state.search.searchString);

  const [search, setSearch] = useState(searchString);

  useEffect(() => {
    setSearch(searchString);
  }, [searchString]);

  const clearInput = () => {
    setSearch('');
  };

  const onValueInputChanged = (value: string) => {
    setSearch(value);
  };

  const onSearchFired = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        search: search,
      },
    });
  };

  return (
    <div className="flex space-between mt-6 justify-center gap-5">
      <div className="relative max-w-lg w-full">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search"
          onInput={(e) => onValueInputChanged(e.currentTarget.value)}
          value={search}
        />
        <button
          className="absolute text-xl inset-y-0 right-0 pr-4 flex items-center"
          onClick={() => clearInput()}
        >
          x
        </button>
      </div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onSearchFired()}
      >
        Search!
      </button>
    </div>
  );
}
