import { CardsList } from '@/components/CardsList';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/shared/PageLayout';
import { apiSlice } from '@/redux/api/apiSlice';
import { changeSearch } from '@/redux/features/searchSlice';
import { wrapper } from '@/redux/store';
import { extractQueryFromContext } from '@/utils/extractQueryFromContext';
import { GetServerSideProps } from 'next/types';

import { ReactElement } from 'react';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchArtsQuery = extractQueryFromContext(context.query);

    store.dispatch(changeSearch(searchArtsQuery));

    const { searchArts } = apiSlice.endpoints;
    await store.dispatch(searchArts.initiate(searchArtsQuery));

    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
) satisfies GetServerSideProps<object>;

export default function MainPage({
  props,
}: {
  props: ReactElement | undefined;
}) {
  return (
    <PageLayout>
      <>
        {props && props}
        <Header />
        <main className="my-8">
          <div className="container mx-auto px-6">
            <CardsList listName="All artwork" />
          </div>
        </main>
        <Footer />
      </>
    </PageLayout>
  );
}
