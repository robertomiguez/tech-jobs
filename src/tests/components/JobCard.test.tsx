import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import JobCard from '../../components/JobCard';
import { Job } from '../../types/Job';
import jobsMock from '../mock/jobs.json';

describe('JobCard Component', () => {
  const jobs: Job[] = jobsMock.jobs;

  test('renders JobCard component', () => {
    render(
      <MemoryRouter>
        <JobCard job={jobs[0]} />
      </MemoryRouter>
    );
    const titleElement = screen.getByRole('heading', { name: /Job 1/i });
    expect(titleElement).toBeInTheDocument();

    // Target the description element
    const descriptionElement = screen.getByText(/This is a job description 1/i);
    expect(descriptionElement).toBeInTheDocument();

    // Optionally, target the location element if needed
    const locationElement = screen.getByText(/New York/i);
    expect(locationElement).toBeInTheDocument();
  });
});
