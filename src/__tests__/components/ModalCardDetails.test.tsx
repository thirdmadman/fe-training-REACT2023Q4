import { describe, expect } from 'vitest';
import { ModalCardDetails } from '../../components/ModalCardDetails';
import { renderWithProviders } from '../utils/test-utils';

describe('ModalCardDetails test', () => {
  test('should render component without crash', async () => {
    const { container } = renderWithProviders(<ModalCardDetails />);
    expect(container.childElementCount).not.toBe(0);
  });
});
