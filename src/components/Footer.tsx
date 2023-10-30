import React from 'react';
import { APP_TITLE } from '../constants';

export class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-gray-200">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a
            href="#"
            className="text-xl font-bold text-gray-500 hover:text-gray-400"
          >
            {APP_TITLE}
          </a>
          <p className="py-2 text-gray-500 sm:py-0">All rights reserved</p>
        </div>
      </footer>
    );
  }
}
