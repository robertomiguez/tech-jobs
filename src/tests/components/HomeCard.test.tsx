import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import HomeCard from '../../components/HomeCard';

describe('HomeCard Component', () => {
  test('renders HomeCard component', () => {
    render(
      <MemoryRouter>
        <HomeCard
          title="For Developers"
          subtitle="Browse our jobs and start your career today"
          href="/jobs"
          label="Browse Jobs"
          bg="bg-gray-100"
        />
      </MemoryRouter>
    );
    const element = screen.getByText(/For Developers/i);
    expect(element).toBeInTheDocument();
  });
});
