import { CardsList } from '@/components/CardsList';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/shared/PageLayout';
import { apiSlice } from '@/redux/api/apiSlice';
import { changeSearch } from '@/redux/features/searchSlice';
import { wrapper } from '@/redux/store';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { ParsedUrlQuery } from 'querystring';

interface UrlQueryForPage extends ParsedUrlQuery {
  search?: string;
  page?: string;
  count?: string;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { query }: { query: UrlQueryForPage } = context;

    const querySearchString = query?.search;
    const queryPaginationPage = query?.page
      ? parseInt(query.page, 10)
      : undefined;
    const queryItemsPerPage = query?.count
      ? parseInt(query.count, 10)
      : undefined;

    const searchArtsQuery = {
      searchString: querySearchString || '',
      paginationPage: queryPaginationPage || 1,
      itemsPerPage: queryItemsPerPage || 12,
    };

    store.dispatch(changeSearch(searchArtsQuery));

    const { searchArts } = apiSlice.endpoints;
    await store.dispatch(searchArts.initiate(searchArtsQuery));

    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
) satisfies GetServerSideProps<{}>;

export default function MainPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <PageLayout>
      <>
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
