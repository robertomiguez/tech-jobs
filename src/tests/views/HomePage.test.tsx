import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../views/HomePage';
import { fetchJobs as mockFetchJobs } from '../../services/JobService';
import { Job } from '../../types/Job';
import jobsMock from '../mock/jobs.json';

jest.mock('../../services/JobService', () => ({
  fetchJobs: jest.fn(),
}));

describe('HomePage', () => {
  test('renders HomePage and its components', async () => {
    const mockJobs: Job[] = jobsMock.jobs;

    // Cast fetchJobs to the correct type
    (
      mockFetchJobs as jest.MockedFunction<typeof mockFetchJobs>
    ).mockResolvedValue(mockJobs);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Wait for the Hero component to render
    const heroElements = await waitFor(() => screen.getAllByText(/DEV/i));
    expect(heroElements.length).toBeGreaterThan(0);

    // Verify that the HomeList component is rendered
    const homeListElement = screen.getByText(/For Developers/i);
    expect(homeListElement).toBeInTheDocument();

    // Verify that the JobList component is rendered with isHome={true}
    const jobListElement = screen.getByText(/Recent Jobs/i);
    expect(jobListElement).toBeInTheDocument();

    // Verify that the AllJobs component is rendered
    const allJobsElement = screen.getByText(/View All Jobs/i);
    expect(allJobsElement).toBeInTheDocument();
  });
});
