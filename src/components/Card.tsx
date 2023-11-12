import { ICardData } from '../interfaces/ICardData';
import { actionOpenDetails } from '../store/actions/actionOpenDetails';
import { useAppContext } from '../hooks/useAppContext';

export function Card(props: ICardData) {
  const {
    title,
    artistDisplay,
    artworkTypeTitle,
    dateDisplay,
    imageUrl,
    imagePlaceholder,
    id,
  } = props;

  const appContext = useAppContext();

  const openDetails = () => {
    appContext && actionOpenDetails(id, appContext);
  };

  const openImageInNewTab = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    window.open(imageUrl, '_blank');
  };

  return (
    <div
      className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
      onClick={openDetails}
    >
      <div
        className="h-56 w-full bg-cover overflow-hidden relative"
        style={
          imagePlaceholder
            ? {
              backgroundImage: `url("${imagePlaceholder}")`,
            }
            : undefined
        }
      >
        <img className="" src={imageUrl} alt={artistDisplay} />
        <button
          className="absolute right-3 top-3 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          onClick={openImageInNewTab}
        >
          <svg
            className="h-5 w-5 m-1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 21 21"
            stroke="currentColor"
          >
            <line x1="16.433" y1="6.25" x2="10.433" y2="16.6423" />
            <line x1="10.567" y1="16.6423" x2="4.56699" y2="6.25" />
            <line x1="10.5" y1="3.27835e-08" x2="10.5" y2="16" />
            <line x1="21" y1="20.5" x2="-4.99559e-08" y2="20.5" />
            <line x1="0.5" y1="21" x2="0.5" y2="15" />
            <line x1="20.5" y1="21" x2="20.5" y2="15" />
          </svg>
        </button>
      </div>
      <div className="px-5 py-3">
        <h3 className="text-gray-700 uppercase">{title}</h3>
        <h2 className="text-gray-700">{artistDisplay}</h2>
        <p className="text-gray-500 mt-2">{artworkTypeTitle}</p>
        <p className="text-gray-500 mt-2">{dateDisplay}</p>
      </div>
    </div>
  );
}
