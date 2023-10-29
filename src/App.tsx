import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CardsList } from './components/CardsList';

interface IAppState {
  count: number;
}

export class App extends React.Component<object, IAppState> {
  state: IAppState = { count: 0 };

  constructor(props: object) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    const { count } = this.state;

    return (
      <>
        <div className="bg-white min-h-screen relative">
          <Header />
          {count}
          <main className="my-8">
            <div className="container mx-auto px-6">
              <CardsList />
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

App;
