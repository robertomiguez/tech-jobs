// JobList.tsx
import React, { Suspense, useState, useEffect } from 'react';
import Spinner from './Spinner';
import { fetchJobs } from '../services/JobService';
import { Job } from '../types/Job';

// Componente Lazy loadable
const JobCardList = React.lazy(() => import('./JobCardList'));

const JobList = ({ isHome }: { isHome: boolean }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs(isHome);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        <Suspense fallback={<Spinner loading={true} />}>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <JobCardList jobs={jobs} />
          )}
        </Suspense>
      </div>
    </section>
  );
};

export default JobList;
