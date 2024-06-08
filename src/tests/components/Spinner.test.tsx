import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from '../../components/Spinner';

describe('Spinner Component', () => {
  afterEach(() => {
    // Clean up any mocks or timers
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('renders Spinner component', () => {
    render(<Spinner loading={true} />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});
