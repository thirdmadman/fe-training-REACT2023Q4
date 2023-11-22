import { LoadingSpinner } from './LoadingSpinner';
import { useParams } from 'react-router-dom';
import { ErrorCard } from './ErrorCard';
import { useAppDispatch } from '../../old/src/redux/hooks';
import { useGetOneArtQuery } from '../../old/src/redux/api/apiSlice';
import { closeDetails, openDetails } from '../../old/src/redux/features/detailsSlice';
import { IDetailedCardData } from '../interfaces/IDetailedCardData';
import { useEffect } from 'react';
import { setIsLoadingDetails } from '../../old/src/redux/features/loadingFlagsSlice';

export function ModalCardDetails() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { data, isError, isFetching, isUninitialized } = useGetOneArtQuery(
    (id && parseInt(id, 10)) || 0,
    { skip: !id }
  );

  useEffect(() => {
    dispatch(setIsLoadingDetails(isFetching));
  }, [dispatch, isFetching]);

  useEffect(() => {
    id && dispatch(openDetails(parseInt(id, 10)));
  });

  const closeModal = () => {
    dispatch(closeDetails());
  };

  const showDetails = (
    card: IDetailedCardData | undefined,
    isErrorShow: boolean,
    isLoadingShow: boolean,
    isUninitializedShow: boolean
  ) => {
    if (isUninitializedShow) {
      return;
    }

    if (isErrorShow) {
      return (
        <ErrorCard
          title="Server error"
          subtitle="We are sorry but we are unable to show the details"
        />
      );
    }

    if (isLoadingShow) {
      return <LoadingSpinner />;
    }

    if (!card) {
      return (
        <ErrorCard
          title="No such item exist"
          subtitle="We are sorry but this item is not exist"
        />
      );
    }

    const {
      title,
      artistDisplay,
      placeOfOrigin,
      artworkTypeTitle,
      styleTitle,
      imageUrl,
    } = card;

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
        {showDetails(data, isError, isFetching, isUninitialized)}
      </div>
    </div>
  );
}
