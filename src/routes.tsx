import { RouteObject } from 'react-router-dom';
import { ROUTE_MAIN } from './constants';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';

const routes: RouteObject = {
  element: <Layout />,
  children: [
    {
      path: ROUTE_MAIN,

      element: <MainPage />,
    },
    {
      path: '*',

      element: <NotFoundPage />,
    },
  ],
};

export default routes;
