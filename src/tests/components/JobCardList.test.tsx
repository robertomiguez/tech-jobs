import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobCardList from '../../components/JobCardList';
import { Job } from '../../types/Job';
import { MemoryRouter } from 'react-router-dom';
import jobsMock from '../mock/jobs.json';

describe('JobCardList Component', () => {
  const jobs: Job[] = jobsMock.jobs;

  test('renders JobCardList component', () => {
    render(
      <MemoryRouter>
        <JobCardList jobs={jobs} />
      </MemoryRouter>
    );

    jobs.forEach((job) => {
      const titleElement = screen.getByRole('heading', {
        name: new RegExp(job.title, 'i'),
      });
      expect(titleElement).toBeInTheDocument();
    });
  });
});
