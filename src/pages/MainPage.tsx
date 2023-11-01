import React, { useCallback, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CardsList } from '../components/CardsList';
import { ArtGalleryService } from '../services/ArtGalleryService';
import { API_URL } from '../constants';
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

  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get('search');
  const searchPage = searchParams.get('page');

  const loadCardsData = useCallback(
    async (query: string | null = null, page: number = 1) => {
      const artGalleryService = new ArtGalleryService(API_URL);

      let response: IArtGalleryResponseSearch | null = null;
      setData(null);

      if (query === null || query === '') {
        response = await artGalleryService.getAll(page);
        saveQueryToLocalStorage(null);
        if (page > 1) {
          setSearchParams({ page: page.toString() });
        } else {
          setSearchParams({});
        }
      } else {
        saveQueryToLocalStorage(query);
        setSearchParams({ search: query, page: page.toString() });
        response = await artGalleryService.getByQueryString(query, page);
      }

      return convertArtGalleryResponseToCards(response);
    },
    [setSearchParams]
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

    setSearchQuery(query || '');

    loadCardsData(query, page)
      .then((data) => setData(data))
      .catch((e) => console.error(e));
  }, [loadCardsData, searchString, searchPage]);

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
