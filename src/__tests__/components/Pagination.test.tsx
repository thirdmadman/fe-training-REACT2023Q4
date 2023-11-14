import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppContext, IAppContext } from '../../store/AppContext';
import { IAppState, defaultAppState } from '../../store/appState';
import { Dispatch } from 'react';
import { TAppActions } from '../../store/actions/actionCreators';

import { Pagination } from '../../components/Pagination';

describe('Pagination test', () => {
  const customRender = (context: IAppContext) => {
    return render(
      <AppContext.Provider value={context}>
        <Pagination />
      </AppContext.Provider>
    );
  };

  it('should render 3 pagination buttons', () => {
    const newAppState: IAppState = {
      ...defaultAppState,
      cards: {
        isIsError: false,
        cards: { array: [], pageSize: 10, currentPage: 1, size: 30 },
      },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);

    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
  });

  it('should render 1 pagination button', () => {
    const newAppState: IAppState = {
      ...defaultAppState,
      cards: {
        isIsError: false,
        cards: { array: [], pageSize: 10, currentPage: 1, size: 10 },
      },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);

    expect(screen.getByText('1')).toBeDefined();
  });
});
