import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundaries';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import routes from './routes';

const router = createHashRouter([routes]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
