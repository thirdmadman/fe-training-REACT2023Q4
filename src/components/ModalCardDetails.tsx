import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import { useEffect, useState } from 'react';
import { loadCardData } from '../utils/loadCardData';
import { IDetailedCardData } from '../interfaces/IDetailedCardData';

export function ModalCardDetails() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [cardData, setCardData] = useState<IDetailedCardData | null>(null);

  const closeModal = () => {
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    if (params.id !== undefined) {
      loadCardData(params.id)
        .then((loadedData) => {
          setCardData(loadedData);
        })
        .catch((err) => console.error(err));
    }
  }, [params.id]);

  const displayDetails = (data: IDetailedCardData) => {
    return (
      <section className="m-5 mt-10">
        <h3 className="text-3xl">{data.title}</h3>
        <h4 className="text-xl mt-5">Artist: {data.artistDisplay || 'none'}</h4>
        <p className="text-l mt-5">
          Place of origin: {data.placeOfOrigin || 'none'}
        </p>
        <p className="text-l mt-5">Type: {data.artworkTypeTitle || 'none'}</p>
        <p className="text-l mt-5">Style: {data.styleTitle || 'none'}</p>
        <img
          src={data.imageUrl}
          alt={data.title}
          className="max-h-[50vh] mt-5"
        ></img>
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
        {cardData ? displayDetails(cardData) : <LoadingSpinner />}
      </div>
    </div>
  );
}
