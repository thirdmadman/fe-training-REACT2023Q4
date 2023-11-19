import reducer, {
  openDetails,
  closeDetails,
  initialState,
} from '../../../redux/features/detailsSlice';

describe('detailsSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle details open id', () => {
    expect(reducer(undefined, openDetails(10))).toEqual({
      openedCardId: 10,
    });
  });

  it('should handle details close', () => {
    expect(reducer(undefined, closeDetails())).toEqual({
      openedCardId: null,
    });
  });
});
