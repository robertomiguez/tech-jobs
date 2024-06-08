import { LoaderFunctionArgs } from 'react-router-dom';
import {
  fetchJobs,
  fetchJobsById,
  addJob,
  updateJob,
  deleteJob,
} from '../../services/JobService';
import { Job } from '../../types/Job';

const target = process.env.VITE_API_BASE || 'http://localhost:8000';

describe('Job API functions', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;
  });
  afterEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('fetchJobs should fetch jobs', async () => {
    await fetchJobs(true);
    expect(fetch).toHaveBeenCalledWith('/api/jobs?_limit=3');
  });

  it('fetchJobsById should fetch a job by ID', async () => {
    const params = { id: '1' };
    const request = new Request(`${target}/api/jobs/1`);
    const loaderArgs: LoaderFunctionArgs = { params, request };
    await fetchJobsById(loaderArgs);
    expect(fetch).toHaveBeenCalledWith('/api/jobs/1');
  });

  it('addJob should post a new job', async () => {
    const newJob: Job = {
      title: 'New Job',
      type: 'Full-Time',
      description: 'This is a new job description',
      location: 'New York',
      salary: 'Under $50K',
      company: {
        name: 'new Company',
        description: 'This is a new description description',
        contactEmail: 'test@test.co',
        contactPhone: '+440000000000',
      },
    };
    await addJob(newJob);
    expect(fetch).toHaveBeenCalledWith('/api/jobs', expect.any(Object));
  });

  it('updateJob should update an existing job', async () => {
    const updatedJob: Job = {
      title: 'Updated Job',
      type: 'Part-Time',
      description: 'This is an updated job description',
      location: 'San Francisco',
      salary: 'Over $200K',
      company: {
        name: 'Updated Company',
        description: 'This is a updated description description',
        contactEmail: 'testupdated@test.co',
        contactPhone: '+550000000999',
      },
    };
    await updateJob('2', updatedJob);
    expect(fetch).toHaveBeenCalledWith('/api/jobs/2', expect.any(Object));
  });

  it('deleteJob should delete a job by ID', async () => {
    await deleteJob('1');
    expect(fetch).toHaveBeenCalledWith('/api/jobs/1', { method: 'DELETE' });
  });
});
