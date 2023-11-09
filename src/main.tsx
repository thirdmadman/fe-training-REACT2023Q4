import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundaries';
import { ContextProvider } from './hoc/ContextProvider';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import routes from './routes';
const router = createHashRouter([routes]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
