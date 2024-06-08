import type { Job } from '../types/Job';
import { LoaderFunctionArgs } from 'react-router-dom';

const API_BASE_URL = '/api/jobs';

export const fetchJobs = async (isHome: boolean): Promise<Job[]> => {
  const apiUrl = isHome ? `${API_BASE_URL}?_limit=3` : API_BASE_URL;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const fetchJobsById = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) throw new Error('Job ID is required');

  try {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    if (!res.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

export const addJob = async (job: Job) => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'content-type': 'Application/json',
    },
    body: JSON.stringify(job),
  });
  if (!res.ok) {
    // Handle HTTP errors
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return;
};

export const updateJob = async (id: string, job: Job) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'Application/json',
    },
    body: JSON.stringify(job),
  });
  if (!res.ok) {
    // Handle HTTP errors
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return;
};

export const deleteJob = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    // Handle HTTP errors
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return;
};
