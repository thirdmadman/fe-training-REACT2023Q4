import { describe, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { CardsList } from '../../components/CardsList';
import { renderWithProviders } from '../utils/test-utils';

describe('CardSList test', () => {
  const testListName = 'SomeUniqueName';

  it('should render correct list name', () => {
    renderWithProviders(<CardsList listName={testListName} />);
    expect(screen.getByText(testListName)).toBeDefined();
  });
});
