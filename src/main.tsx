import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainPage } from './pages/MainPage';
import './index.css';
import ErrorBoundary from './components/ErrorBoundaries';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  </React.StrictMode>
);
