import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CardsList } from '../components/CardsList';
import { CARDS_COUNT_PER_PAGE } from '../constants';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { actionChangeItemsPerPage } from '../store/actions/actionChangeItemsPerPage';
import { actionChangeSearchString } from '../store/actions/actionChangeSearchString';
import { actionChangePaginationPage } from '../store/actions/actionChangePaginationPage';
import {
  IMainSearchParams,
  mergeSearchParams,
} from '../utils/mergeSearchParams';

export function MainPage() {
  const appContext = useAppContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const searchString = searchParams.get('search');
  const searchPageQuery = searchParams.get('page');
  const searchCount = searchParams.get('count');

  const stateSearch = appContext?.state.search;

  const openedCardId = appContext?.state.details.openedCardId || null;

  let convertedQueryPageNumber = 1;
  let convertedQueryItemsPerPage = CARDS_COUNT_PER_PAGE;

  if (searchCount && searchCount.length > 0 && parseInt(searchCount, 10) > 0) {
    convertedQueryItemsPerPage = Number(searchCount);
  }

  if (searchPageQuery !== null && searchPageQuery.length > 0) {
    convertedQueryPageNumber = Number(searchPageQuery);
  }

  if (convertedQueryPageNumber < 1) {
    convertedQueryPageNumber = 1;
  }

  useEffect(() => {
    if (!appContext) {
      return;
    }

    actionChangeSearchString(searchString || '', appContext);
    actionChangePaginationPage(convertedQueryPageNumber, appContext);
    actionChangeItemsPerPage(convertedQueryItemsPerPage, appContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!stateSearch) {
      return;
    }

    const urlParams: IMainSearchParams = {
      searchString: searchString || '',
      pageNumber: convertedQueryPageNumber,
      itemsPerPage: convertedQueryItemsPerPage,
    };

    const stateParams: IMainSearchParams = {
      searchString: stateSearch.searchString,
      pageNumber: stateSearch.paginationPage,
      itemsPerPage: stateSearch.itemsPerPage,
    };

    const mergeResult = mergeSearchParams(urlParams, stateParams);

    if (mergeResult.isUpdateNeeded) {
      setSearchParams(mergeResult.newSearchParams);
    }
  }, [
    stateSearch,
    searchString,
    convertedQueryPageNumber,
    convertedQueryItemsPerPage,
    setSearchParams,
  ]);

  useEffect(() => {
    if (openedCardId !== null) {
      navigate({
        pathname: `/details/${openedCardId}`,
        search: searchParams.toString(),
      });
    } else {
      navigate({
        pathname: '/',
        search: searchParams.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedCardId]);

  return (
    <>
      <Outlet />
      <Header />
      <main className="my-8">
        <div className="container mx-auto px-6">
          <CardsList listName="All artwork" />
        </div>
      </main>
      <Footer />
    </>
  );
}
