import { RouteObject } from 'react-router-dom';
import {
  ROUTE_MAIN,
  ROUTE_REACT_HOOK_FORM,
  ROUTE_UNCONTROLLED_FORM,
} from './constants';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UncontrolledForm } from './pages/UncontrolledForm';
import { ReactHookForm } from './pages/ReactHookForm';

const routes: RouteObject = {
  element: <Layout />,
  children: [
    {
      path: ROUTE_MAIN,
      element: <MainPage />,
    },
    {
      path: ROUTE_UNCONTROLLED_FORM,
      element: <UncontrolledForm />,
    },
    {
      path: ROUTE_REACT_HOOK_FORM,
      element: <ReactHookForm />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ],
};

export default routes;
