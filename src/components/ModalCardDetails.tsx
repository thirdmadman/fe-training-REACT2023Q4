import { LoadingSpinner } from './LoadingSpinner';
import { useAppContext } from '../hooks/useAppContext';
import { actionCloseDetails } from '../store/actions/actionCloseDetails';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { actionLoadDetails } from '../store/actions/actionLoadDetails';
import { IDetailsSlice } from '../store/appState';
import { ErrorCard } from './ErrorCard';

export function ModalCardDetails() {
  const appContext = useAppContext();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id !== undefined && appContext) {
      actionLoadDetails(parseInt(id, 10), appContext);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!appContext || appContext.state.details.openedCardId === null) {
    return;
  }

  const details = appContext.state.details;

  const closeModal = () => {
    actionCloseDetails(appContext);
  };

  const showDetails = (detailsSlice: IDetailsSlice) => {
    if (detailsSlice.isIsError) {
      return ErrorCard(
        'Server error',
        'We are sorry but we are unable to show the details'
      );
    }

    if (!detailsSlice.details) {
      return <LoadingSpinner />;
    }

    const {
      title,
      artistDisplay,
      placeOfOrigin,
      artworkTypeTitle,
      styleTitle,
      imageUrl,
    } = detailsSlice.details;

    return (
      <section className="m-5 mt-10">
        <h3 className="text-3xl">{title}</h3>
        <h4 className="text-xl mt-5">Artist: {artistDisplay || 'none'}</h4>
        <p className="text-l mt-5">
          Place of origin: {placeOfOrigin || 'none'}
        </p>
        <p className="text-l mt-5">Type: {artworkTypeTitle || 'none'}</p>
        <p className="text-l mt-5">Style: {styleTitle || 'none'}</p>
        <img src={imageUrl} alt={title} className="max-h-[50vh] mt-5"></img>
      </section>
    );
  };

  return (
    <div
      className="min-w-full min-h-screen fixed flex justify-end bg-gray-600 bg-opacity-50 z-10 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="max-w-[50%] w-full bg-white flex flex-col"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={closeModal}
        >
          <span className="sr-only">Close details</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {showDetails(details)}
      </div>
    </div>
  );
}
