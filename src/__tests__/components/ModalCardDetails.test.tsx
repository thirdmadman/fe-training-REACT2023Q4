import { describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ModalCardDetails } from '../../components/ModalCardDetails';
import { AppContext, IAppContext } from '../../store/AppContext';
import { defaultAppState } from '../../store/appState';
import { Dispatch } from 'react';
import { TAppActions } from '../../store/actions/actionCreators';
import { modalCardDetailsDataMock } from '../mocks/modalCardDetailsDataMock';
import { actionCloseDetails } from '../../store/actions/actionCloseDetails';
import { actionLoadDetails } from '../../store/actions/actionLoadDetails';

describe('ModalCardDetails test', () => {
  const customRender = (context: IAppContext) => {
    return render(
      <AppContext.Provider value={context}>
        <ModalCardDetails />
      </AppContext.Provider>
    );
  };

  it('should render without crashing', () => {
    const newAppState = {
      ...defaultAppState,
      details: {
        isIsError: false,
        openedCardId: 1,
        details: null,
      },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    const { container } = customRender(initialContext);
    expect(container.firstChild).not.toBeNull();
  });

  it('should render lading spinner', () => {
    const newAppState = {
      ...defaultAppState,
      details: {
        isIsError: false,
        openedCardId: 1,
        details: null,
      },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);

    expect(screen.getByText('Loading...')).not.toBeNull();
  });

  it('should render server error', () => {
    const newAppState = {
      ...defaultAppState,
      details: {
        isIsError: true,
        openedCardId: 1,
        details: null,
      },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);

    expect(screen.getByText('Server error')).not.toBeNull();
  });

  it('should render card details text correctly', () => {
    const newAppState = {
      ...defaultAppState,
      details: {
        isIsError: false,
        openedCardId: modalCardDetailsDataMock.id,
        details: modalCardDetailsDataMock,
      },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);

    expect(
      screen.getByText(modalCardDetailsDataMock.title, { exact: false })
    ).not.toBeNull();
    expect(
      screen.getByText(modalCardDetailsDataMock.artistDisplay, { exact: false })
    ).not.toBeNull();
    expect(
      screen.getByText(
        `Place of origin: ${modalCardDetailsDataMock.placeOfOrigin}`,
        { exact: false }
      )
    ).not.toBeNull();
    expect(
      screen.getByText(modalCardDetailsDataMock.artworkTypeTitle, {
        exact: false,
      })
    ).not.toBeNull();
    expect(
      screen.getByText(modalCardDetailsDataMock.artworkTypeTitle, {
        exact: false,
      })
    ).not.toBeNull();
  });

  it('should close on click button or outside', () => {
    vi.mock('../../store/actions/actionCloseDetails', () => {
      return {
        actionCloseDetails: vi.fn(),
      };
    });

    const newAppState = {
      ...defaultAppState,
      details: {
        isIsError: false,
        openedCardId: modalCardDetailsDataMock.id,
        details: modalCardDetailsDataMock,
      },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    const { container } = customRender(initialContext);

    container.firstElementChild && fireEvent.click(container.firstElementChild);
    expect(actionCloseDetails).toBeCalledTimes(1);

    screen.getByRole('button') && fireEvent.click(screen.getByRole('button'));
    expect(actionCloseDetails).toBeCalledTimes(2);
  });

  test('should call load card details when card opened', async () => {
    vi.mock('../../store/actions/actionLoadDetails', () => {
      return {
        actionLoadDetails: vi.fn(),
      };
    });

    vi.mock('react-router-dom', () => {
      return {
        useParams: vi.fn(() => ({ id: 10 })),
      };
    });

    const newAppState = {
      ...defaultAppState,
      details: {
        isIsError: false,
        openedCardId: modalCardDetailsDataMock.id,
        details: modalCardDetailsDataMock,
      },
    };

    const initialContext = {
      state: newAppState,
      dispatch: {} as Dispatch<TAppActions>,
    };

    customRender(initialContext);

    expect(actionLoadDetails).toBeCalledTimes(1);
  });

  test('should not render if no context or id', async () => {
    const { container } = render(<ModalCardDetails />);

    expect(container.childElementCount).toBe(0);
  });
});
