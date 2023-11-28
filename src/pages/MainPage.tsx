import { Link } from 'react-router-dom';
import { ROUTE_REACT_HOOK_FORM, ROUTE_UNCONTROLLED_FORM } from '../constants';

export function MainPage() {
  return (
    <>
      <main className="my-8">
        <div className="container mx-auto px-6">Main page</div>
        <Link to={`${ROUTE_UNCONTROLLED_FORM}`}>UncontrolledForm</Link>
        <Link to={`${ROUTE_REACT_HOOK_FORM}`}>ReactHookForm</Link>
      </main>
    </>
  );
}
