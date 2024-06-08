import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import JobList from '../../components/JobList';
import { fetchJobs as mockFetchJobs } from '../../services/JobService';
import { Job } from '../../types/Job';
import jobsMock from '../mock/jobs.json';

// Mock the fetchJobs function
jest.mock('../../services/JobService', () => ({
  fetchJobs: jest.fn(),
}));

describe('JobList Component', () => {
  test('renders JobList component', async () => {
    // Mock data
    const mockJobs: Job[] = jobsMock.jobs;

    // Cast fetchJobs to the correct type
    (
      mockFetchJobs as jest.MockedFunction<typeof mockFetchJobs>
    ).mockResolvedValue(mockJobs);

    render(
      <MemoryRouter>
        <JobList isHome={false} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const element = screen.getByText(/Browse Jobs/i);
      expect(element).toBeInTheDocument();
    });
  });
});
