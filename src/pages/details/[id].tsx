import { ModalCardDetails } from '@/components/ModalCardDetails';
import { apiSlice } from '@/redux/api/apiSlice';
import { openDetails } from '@/redux/features/detailsSlice';
import { wrapper } from '@/redux/store';
import { GetServerSideProps } from 'next/types';
import MainPage, { extractQueryFromContext } from '..';
import { changeSearch } from '@/redux/features/searchSlice';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id || null;

    const searchArtsQuery = extractQueryFromContext(context.query);

    store.dispatch(changeSearch(searchArtsQuery));

    const { searchArts } = apiSlice.endpoints;
    await store.dispatch(searchArts.initiate(searchArtsQuery));

    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    if (id !== null) {
      store.dispatch(openDetails(+(id as string)));

      const { getOneArt } = apiSlice.endpoints;
      await store.dispatch(getOneArt.initiate(+(id as string)));

      await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));
    }

    return {
      props: {},
    };
  }
) satisfies GetServerSideProps<{}>;

export default function DetailsPage({}) {
  return <MainPage props={<ModalCardDetails />} />;
}
