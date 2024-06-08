import JobCard from './JobCard';
import type { Job } from '../types/Job';

const JobCardList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {jobs.map((job, index) => (
        <JobCard
          key={job.id || index}
          job={job}
        />
      ))}
    </div>
  );
};

export default JobCardList;
