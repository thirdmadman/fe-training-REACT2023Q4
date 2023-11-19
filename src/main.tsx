import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundaries';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import routes from './routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const router = createHashRouter([routes]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
