import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AllJobs from '../../components/AllJobs';
import { MemoryRouter } from 'react-router-dom';

describe('AllJobs Component', () => {
  test('renders AllJobs component', () => {
    render(
      <MemoryRouter>
        <AllJobs />
      </MemoryRouter>
    );
    const element = screen.getByText(/View All Jobs/i);
    expect(element).toBeInTheDocument();
  });
});
