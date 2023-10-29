import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CardsList } from './components/CardsList';
import { ArtGalleryService } from './services/ArtGalleryService';
import { API_URL } from './constants';
import { ICardData } from './interfaces/ICardData';

interface IAppState {
  count: number;
  data: Array<ICardData>;
}

export class App extends React.Component<object, IAppState> {
  state: IAppState = { count: 0, data: [] };
  artGalleryService = new ArtGalleryService(API_URL);

  constructor(props: object) {
    super(props);
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
        dateDisplay: el.artwork_type_title,
        imageUrl: `${imagesApiUrl}/${el.image_id}${imagesApiUrlParams}`,
        id: el.id,
      }
      return cardData;
    });

    this.setState({ data: cardsData });

    console.log(res.data);
    console.log(cardsData);
  }

  render() {
    const { count, data } = this.state;

    return (
      <>
        <div className="bg-white min-h-screen relative">
          <Header />
          {count}
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
