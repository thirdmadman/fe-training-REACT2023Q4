import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CardsList } from '../components/CardsList';
import { ArtGalleryService } from '../services/ArtGalleryService';
import { API_URL } from '../constants';
import { ICardData } from '../interfaces/ICardData';
import { convertArtGalleryResponseToCards } from '../utils/apiDataConverter';
import { IArtGalleryResponseSearch } from '../interfaces/IArtGalleryResponse';
import { getQueryFormLocalStorage, saveQueryToLocalStorage } from '../utils/querySaveTools';

interface IMainPageState {
  data: Array<ICardData>;
}

export class MainPage extends React.Component<object, IMainPageState> {
  state: IMainPageState = { data: [] };
  artGalleryService = new ArtGalleryService(API_URL);

  constructor(props: object) {
    super(props);
  }

  async searchInArtGallery(query: string | null = null) {
    let response: IArtGalleryResponseSearch | null = null;

    if (query === null) {
      response = await this.artGalleryService.getAll();
    } else {
      if (query === '') {
        saveQueryToLocalStorage(null);
      } else {
        saveQueryToLocalStorage(query);
      }
      response = await this.artGalleryService.getByQueryString(query);
    }
    const cardsData = convertArtGalleryResponseToCards(response);
    this.setState({ data: cardsData });
  }

  async componentDidMount() {
    const query = getQueryFormLocalStorage();

    await this.searchInArtGallery(query);
  }

  searchClear() {

  }

  render() {
    const { data } = this.state;
    return (
      <>
        <div className="bg-white min-h-screen relative">
          <Header onSearchEvent={(s: string) => this.searchInArtGallery(s)} />
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
}