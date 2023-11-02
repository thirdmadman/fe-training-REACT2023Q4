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
  const [cardsPerPage, setCardsPerPage] = useState(CARDS_COUNT_PER_PAGE);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get('search');
  const searchPage = searchParams.get('page');
  const searchCount = searchParams.get('count');

  const loadCardsData = useCallback(
    async (query: string | null = null, page: number = 1) => {
      const artGalleryService = new ArtGalleryService(API_URL);

      let response: IArtGalleryResponseSearch | null = null;
      setData(null);

      let pagesParam = {};
      let cardsPerPageParam = {};
      let queryParam = {};

      if (page > 1) {
        pagesParam = { page: page.toString() };
      }

      if (cardsPerPage !== CARDS_COUNT_PER_PAGE) {
        cardsPerPageParam = { count: cardsPerPage.toString() };
      }

      if (query === null || query === '') {
        response = await artGalleryService.getAll(page, cardsPerPage);
        saveQueryToLocalStorage(null);
      } else {
        saveQueryToLocalStorage(query);
        queryParam = {
          search: query,
        };
        response = await artGalleryService.getByQueryString(
          query,
          page,
          cardsPerPage
        );
      }

      setSearchParams({ ...queryParam, ...pagesParam, ...cardsPerPageParam });
      return convertArtGalleryResponseToCards(response);
    },
    [setSearchParams, cardsPerPage]
  );

  const searchInArtGallery = async (query: string) => {
    const cardsData = await loadCardsData(query);
    setData(cardsData);
  };

  useEffect(() => {
    const queryFromLocalStorage = getQueryFormLocalStorage();

    let query = searchString;

    let page = 1;

    if (!query && queryFromLocalStorage) {
      query = queryFromLocalStorage;
    }

    if (searchPage !== null && searchPage.length > 0) {
      page = Number(searchPage);
    }

    if (page < 1) {
      page = 1;
    }

    if (searchCount && Number(searchCount) != cardsPerPage) {
      setCardsPerPage(Number(searchCount));
    }

    setSearchQuery(query || '');

    loadCardsData(query, page)
      .then((data) => setData(data))
      .catch((e) => console.error(e));
  }, [loadCardsData, searchString, searchPage, searchCount, cardsPerPage]);

  const handleSearchQueryChange = (query: string) => {
    if (query === searchQuery) {
      return;
    }
    setSearchQuery(query);
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
          <CardsList listName="All artwork" cardsList={data} />
        </div>
      </main>
      <Footer />
    </>
  );
}
