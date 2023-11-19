import { useCallback, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CardsList } from '../components/CardsList';
import { CARDS_COUNT_PER_PAGE } from '../constants';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import {
  IMainSearchParams,
  mergeSearchParams,
} from '../utils/mergeSearchParams';
import { getQueryFormLocalStorage } from '../utils/querySaveTools';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeSearch } from '../redux/features/searchSlice';

export function MainPage() {
  const navigate = useNavigate();

  const searchQueryFromLocalStorage = useCallback(
    () => getQueryFormLocalStorage(),
    []
  )();

  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);

  const detailsState = useAppSelector((state) => state.details);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get('search');
  const searchPageQuery = searchParams.get('page');
  const searchCount = searchParams.get('count');

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
    dispatch(
      changeSearch({
        paginationPage: convertedQueryPageNumber,
        itemsPerPage: convertedQueryItemsPerPage,
        searchString: searchString || searchQueryFromLocalStorage || '',
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const urlParams: IMainSearchParams = {
      searchString: searchString || '',
      pageNumber: convertedQueryPageNumber,
      itemsPerPage: convertedQueryItemsPerPage,
    };

    const stateParams: IMainSearchParams = {
      searchString: searchState.searchString,
      pageNumber: searchState.paginationPage,
      itemsPerPage: searchState.itemsPerPage,
    };

    const mergeResult = mergeSearchParams(urlParams, stateParams);

    if (mergeResult.isUpdateNeeded) {
      setSearchParams(mergeResult.newSearchParams);
    }
  }, [
    searchState,
    searchString,
    convertedQueryPageNumber,
    convertedQueryItemsPerPage,
    setSearchParams,
  ]);

  useEffect(() => {
    if (detailsState.openedCardId !== null) {
      navigate({
        pathname: `/details/${detailsState.openedCardId}`,
        search: searchParams.toString(),
      });
    } else {
      navigate({
        pathname: '/',
        search: searchParams.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsState]);

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
