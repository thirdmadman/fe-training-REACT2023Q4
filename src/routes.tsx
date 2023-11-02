import { RouteObject } from 'react-router-dom';
import { ROUTE_MAIN } from './constants';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ModalCardDetails } from './components/ModalCardDetails';

const routes: RouteObject = {
  element: <Layout />,
  children: [
    {
      path: ROUTE_MAIN,
      children: [
        {
          path: '/details/:id',
          element: <ModalCardDetails />,
        },
      ],
      element: <MainPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ],
};

export default routes;
