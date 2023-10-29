import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CardsList } from './components/CardsList';
import { ArtGalleryService } from './services/ArtGalleryService';
import { API_URL } from './constants';
import { ICardData } from './interfaces/ICardData';

interface IAppState {
  data: Array<ICardData>;
}

export class App extends React.Component<object, IAppState> {
  state: IAppState = { data: [] };
  artGalleryService = new ArtGalleryService(API_URL);

  constructor(props: object) {
    super(props);
  }

  async searchInArtGallery(query: string) {
    const res = await this.artGalleryService.getByQueryString(query);

    const imagesApiUrl = res.config.iiif_url;
    const imagesApiUrlParams = '/full/843,/0/default.jpg';

    const cardsData = res.data.map((el) => {
      const cardData: ICardData = {
        title: el.title,
        artistDisplay: el.artist_display,
        artworkTypeTitle: el.artwork_type_title,
        dateDisplay: el.date_display,
        imageUrl: `${imagesApiUrl}/${el.image_id}${imagesApiUrlParams}`,
        imagePlaceholder: el.thumbnail.lqip,
        id: el.id,
      };
      return cardData;
    });

    this.setState({ data: cardsData });

    console.log(res.data);
    console.log(cardsData);
  }

  async componentDidMount() {
    const res = await this.artGalleryService.getAll();

    const imagesApiUrl = res.config.iiif_url;
    const imagesApiUrlParams = '/full/843,/0/default.jpg';

    const cardsData = res.data.map((el) => {
      const cardData: ICardData = {
        title: el.title,
        artistDisplay: el.artist_display,
        artworkTypeTitle: el.artwork_type_title,
        dateDisplay: el.date_display,
        imageUrl: `${imagesApiUrl}/${el.image_id}${imagesApiUrlParams}`,
        imagePlaceholder: el.thumbnail.lqip,
        id: el.id,
      };
      return cardData;
    });

    this.setState({ data: cardsData });

    console.log(res.data);
    console.log(cardsData);
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

App;
