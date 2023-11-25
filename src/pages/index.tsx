import { CardsList } from '@/components/CardsList';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/shared/PageLayout';
import { apiSlice } from '@/redux/api/apiSlice';
import { changeSearch } from '@/redux/features/searchSlice';
import { wrapper } from '@/redux/store';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';

interface UrlQueryForPage extends ParsedUrlQuery {
  search?: string;
  page?: string;
  count?: string;
}

export const extractQueryFromContext = (query: ParsedUrlQuery) => {
  const queryTyped =  query as UrlQueryForPage;

  const querySearchString = queryTyped?.search;
  const queryPaginationPage = queryTyped?.page
    ? parseInt(queryTyped.page, 10)
    : undefined;
  const queryItemsPerPage = queryTyped?.count
    ? parseInt(queryTyped.count, 10)
    : undefined;

  const searchArtsQuery = {
    searchString: querySearchString || '',
    paginationPage: queryPaginationPage || 1,
    itemsPerPage: queryItemsPerPage || 12,
  };

  return searchArtsQuery;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {

    const searchArtsQuery = extractQueryFromContext(context.query);

    store.dispatch(changeSearch(searchArtsQuery));

    const { searchArts } = apiSlice.endpoints;
    await store.dispatch(searchArts.initiate(searchArtsQuery));

    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    console.log('store :>> ', store.getState());
    return {
      props: {},
    };
  }
) satisfies GetServerSideProps<{}>;

export default function MainPage({props} : {props: ReactElement | undefined}) {
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
