import { wrapper } from '@/redux/store'
import type { AppProps } from 'next/app'
import { FC } from 'react';
import { Provider } from 'react-redux';

import '@/styles/globals.css'

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;