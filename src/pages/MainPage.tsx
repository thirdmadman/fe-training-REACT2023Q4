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

export function MainPage() {
  const [data, setData] = useState<Array<ICardData>>([]);

  const loadCardsData = useCallback(async (query: string | null = null) => {
    const artGalleryService = new ArtGalleryService(API_URL);

    let response: IArtGalleryResponseSearch | null = null;
    setData([]);
    if (query === null) {
      response = await artGalleryService.getAll();
    } else {
      if (query === '') {
        saveQueryToLocalStorage(null);
      } else {
        saveQueryToLocalStorage(query);
      }
      response = await artGalleryService.getByQueryString(query);
    }
    return convertArtGalleryResponseToCards(response);
  }, []);

  const searchInArtGallery = async (query: string | null = null) => {
    const cardsData = await loadCardsData(query);
    setData(cardsData);
  };

  useEffect(() => {
    const query = getQueryFormLocalStorage();
    loadCardsData(query)
      .then((data) => setData(data))
      .catch((e) => console.error(e));
  }, [loadCardsData]);

  return (
    <>
      <div className="bg-white min-h-screen relative">
        <Header onSearchEvent={(s: string) => searchInArtGallery(s)} />
        <main className="my-8">
          <div className="container mx-auto px-6">
            <CardsList listName="All artwork" cardsList={data} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
