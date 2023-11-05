import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CardsList } from '../components/CardsList';
import { CARDS_COUNT_PER_PAGE } from '../constants';
import { ICardData } from '../interfaces/ICardData';
import { getQueryFormLocalStorage } from '../utils/querySaveTools';
import { Outlet, useSearchParams } from 'react-router-dom';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';
import { loadCardsData } from '../utils/loadCardsData';

export function MainPage() {
  const [data, setData] = useState<IPaginatedArray<ICardData> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(CARDS_COUNT_PER_PAGE);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get('search');
  const searchPageQuery = searchParams.get('page');
  const searchCount = searchParams.get('count');

  const searchInArtGallery = async (query: string) => {
    setData(null);
    const cardsData = await loadCardsData(query);
    setSearchParams(cardsData.searchParams);
    setData(cardsData.cards);
  };

  useEffect(() => {
    const queryFromLocalStorage = getQueryFormLocalStorage();

    let query = searchString;

    let page = 1;

    let count = CARDS_COUNT_PER_PAGE;

    if (!query && queryFromLocalStorage) {
      query = queryFromLocalStorage;
    }

    if (searchPageQuery !== null && searchPageQuery.length > 0) {
      page = Number(searchPageQuery);
    }

    if (page < 1) {
      page = 1;
    }

    if (searchCount && searchCount.length > 0 && Number(searchCount) > 0) {
      count = Number(searchCount);
    }

    setSearchQuery(query || '');
    setSearchPage(page);
    setCardsPerPage(count);

    loadCardsData(query, page, count)
      .then((data) => setData(data.cards))
      .catch((e) => console.error(e));
  }, [searchString, searchPageQuery, searchCount, cardsPerPage]);

  const handleSearchQueryChange = (query: string) => {
    if (query === searchQuery) {
      return;
    }
    setSearchQuery(query);
  };

  const handleSetPage = (number: number) => {
    if (number === searchPage) {
      return;
    }

    setData(null);

    searchParams.set('page', number.toString());
    setSearchParams(searchParams);
  };

  const handleSetNewItemsPerPage = (number: number) => {
    if (number === cardsPerPage) {
      return;
    }

    setData(null);

    searchParams.set('count', number.toString());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <>
      <Outlet />
      <Header
        value={searchQuery}
        onSearchEvent={(val) => searchInArtGallery(val)}
        onValueChanged={(val) => handleSearchQueryChange(val)}
      />
      <main className="my-8">
        <div className="container mx-auto px-6">
          <CardsList
            listName="All artwork"
            cardsList={data}
            currentItemsPerPage={cardsPerPage}
            onNewValueSelect={handleSetNewItemsPerPage}
            onSetPage={handleSetPage}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
