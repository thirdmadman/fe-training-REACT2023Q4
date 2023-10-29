import React from 'react';
import { APP_TITLE } from '../constants';

interface IHeaderProps {
  onSearchEvent: (search: string) => void;
}

interface IHeaderState {
  search: string;
}
export class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    search: '',
  };

  render() {
    const throwError = () => {
      throw new Error('Not implemented');
    };

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
              onClick={throwError}
            >
              Throw Error
            </button>
          </div>
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
                onChange={(e) => this.setState({ search: e.target.value })}
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => this.props.onSearchEvent(this.state.search)}
            >
              Search!
            </button>
          </div>
        </div>
      </header>
    );
  }
}
