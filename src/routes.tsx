import { RouteObject } from 'react-router-dom';
import { ROUTE_MAIN } from './constants';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';

const routes: RouteObject = {
  element: <Layout />,
  children: [
    {
      path: ROUTE_MAIN,

      element: <MainPage />,
    },
    {
      path: '*',

      element: <h1>NOT FOUND</h1>,
    },
  ],
};

export default routes;
