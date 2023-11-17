import { describe, expect } from 'vitest';
import { Pagination } from '../../components/Pagination';
import { renderWithProviders } from '../utils/test-utils';

describe('Pagination test', () => {
  test('should not render by default', async () => {
    const { container } = renderWithProviders(<Pagination />);

    expect(container.childElementCount).toBe(0);
  });
});
