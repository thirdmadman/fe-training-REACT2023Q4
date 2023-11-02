import React, { useCallback, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CardsList } from '../components/CardsList';
import { ArtGalleryService } from '../services/ArtGalleryService';
import { API_URL, CARDS_COUNT_PER_PAGE } from '../constants';
import { ICardData } from '../interfaces/ICardData';
import { convertArtGalleryResponseToCards } from '../utils/apiDataConverter';
import { IArtGalleryResponseSearch } from '../interfaces/IArtGalleryResponse';
import {
  getQueryFormLocalStorage,
  saveQueryToLocalStorage,
} from '../utils/querySaveTools';
import { useSearchParams } from 'react-router-dom';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';

export function MainPage() {
  const [data, setData] = useState<IPaginatedArray<ICardData> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(CARDS_COUNT_PER_PAGE);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get('search');
  const searchPageQuery = searchParams.get('page');
  const searchCount = searchParams.get('count');

  const loadCardsData = useCallback(
    async (
      query: string | null = null,
      page: number = 1,
      cardsPerPageCount: number = CARDS_COUNT_PER_PAGE
    ) => {
      const artGalleryService = new ArtGalleryService(API_URL);

      let response: IArtGalleryResponseSearch | null = null;

      let pagesParam = {};
      let cardsPerPageParam = {};
      let queryParam = {};

      if (page > 1) {
        pagesParam = { page: page.toString() };
      }

      if (cardsPerPageCount !== CARDS_COUNT_PER_PAGE) {
        cardsPerPageParam = { count: cardsPerPageCount.toString() };
      }

      if (query === null || query === '') {
        response = await artGalleryService.getAll(page, cardsPerPageCount);
        saveQueryToLocalStorage(null);
      } else {
        saveQueryToLocalStorage(query);
        queryParam = {
          search: query,
        };
        response = await artGalleryService.getByQueryString(
          query,
          page,
          cardsPerPageCount
        );
      }
      return {
        cards: convertArtGalleryResponseToCards(response),
        searchParams: { ...queryParam, ...pagesParam, ...cardsPerPageParam },
      };
    },
    []
  );

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
  }, [loadCardsData, searchString, searchPageQuery, searchCount, cardsPerPage]);

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
