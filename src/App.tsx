import React from 'react';

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
        <h1>Vite + React</h1>
        <div className="card">
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => this.setState({ count: count + 1 })}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    );
  }
}

App;
