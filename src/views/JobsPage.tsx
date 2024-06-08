import JobList from '../components/JobList';

const JobsPage = () => {
  return (
    <section className="bg-blue-50 px-4 py-6">
      <JobList isHome={false} />
    </section>
  );
};
export default JobsPage;
