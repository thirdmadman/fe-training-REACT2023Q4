import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardsList } from '../../components/CardsList';
import { AppContext, IAppContext } from '../../store/AppContext';
import { IAppState, defaultAppState } from '../../store/appState';
import { Dispatch } from 'react';
import { TAppActions } from '../../store/actions/actionCreators';
import { cardDataMock } from '../mocks/cardDataMock';

describe('CardSList test', () => {
  const testListName = 'SomeUniqueName';

  const customRender = (context: IAppContext) => {
    return render(
      <AppContext.Provider value={context}>
        <CardsList listName={testListName} />
      </AppContext.Provider>
    );
  };

  const createPaginatedArrayOfCards = (number: number) => {
    const cards = Array.from(Array(number)).map((el, i) => ({
      ...cardDataMock,
      title: `Card ${i + 1}`,
      id: i + 1,
    }));
    return { array: cards, pageSize: number, currentPage: 1, size: number };
  };

  it('should render correct list name', () => {
    render(<CardsList listName={testListName} />);
    expect(screen.getByText(testListName)).toBeDefined();
  });

  it('should render loading spinner', () => {
    const initialContext = {
      state: defaultAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('should render error', () => {
    const newAppState = {
      ...defaultAppState,
      cards: { isIsError: true, cards: null },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);
    expect(screen.getByText('Server response error')).toBeDefined();
  });

  it('should render 2 cards', () => {
    const newAppState: IAppState = {
      ...defaultAppState,
      cards: { isIsError: false, cards: createPaginatedArrayOfCards(2) },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);

    expect(screen.getByText('Card 1')).toBeDefined();
    expect(screen.getByText('Card 2')).toBeDefined();
  });

  it('should render 5 cards', () => {
    const newAppState: IAppState = {
      ...defaultAppState,
      cards: { isIsError: false, cards: createPaginatedArrayOfCards(5) },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);

    expect(screen.getByText('Card 1')).toBeDefined();
    expect(screen.getByText('Card 2')).toBeDefined();
    expect(screen.getByText('Card 3')).toBeDefined();
    expect(screen.getByText('Card 4')).toBeDefined();
    expect(screen.getByText('Card 5')).toBeDefined();
  });
});
