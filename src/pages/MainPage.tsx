import { Link } from 'react-router-dom';
import { ROUTE_REACT_HOOK_FORM, ROUTE_UNCONTROLLED_FORM } from '../constants';
import { Footer } from '../components/shared/Footer';
import { Header } from '../components/shared/Header';
import { useAppSelector } from '../redux/hooks';
import { ISavedFormData } from '../redux/features/mainPageSlice';

export function MainPage() {
  const formsData = useAppSelector((store) => store.mainPage);

  const showFromResults = (data: Array<ISavedFormData>) => {
    if (!data || data.length < 1) {
      return <div>Nothing to show - no results present</div>;
    }

    return data.map((el, i) => <div key={i}>{el.formData.name}</div>);
  };

  return (
    <>
      <Header />
      <main className="my-8">
        <div className="container mx-auto px-6">
          <h2>Main page </h2>
          <div>
            <Link to={`${ROUTE_UNCONTROLLED_FORM}`}>UncontrolledForm</Link>
            <Link to={`${ROUTE_REACT_HOOK_FORM}`}>ReactHookForm</Link>
          </div>
          <div>
            <h3>Form submit results:</h3>
            <div className="flex flex-col">
              {showFromResults(formsData.formsData)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
