import { useState } from 'react';
import { APP_TITLE } from '../../old/src/constants';
import { SearchBar } from './SearchBar';

export function Header() {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error();
  }

  return (
    <header>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-center">
          <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
            {APP_TITLE}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsError(true)}
          >
            Throw Error {}
          </button>
        </div>
        <SearchBar />
      </div>
    </header>
  );
}
