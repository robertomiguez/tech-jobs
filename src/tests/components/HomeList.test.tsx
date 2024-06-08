import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import HomeList from '../../components/HomeList';

describe('HomeList Component', () => {
  test('renders HomeList component', () => {
    render(
      <MemoryRouter>
        <HomeList />
      </MemoryRouter>
    );
    const devElement = screen.getByText(/For Developers/i);
    expect(devElement).toBeInTheDocument();

    const empElement = screen.getByText(/For Employers/i);
    expect(empElement).toBeInTheDocument();
  });
});
