import Card from './HomeCard';

const HomeList = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card
            title="For Developers"
            subtitle="Browse our jobs and start your career today"
            href="/jobs"
            label="Browse Jobs"
            bg="bg-gray-100"
          />
          <Card
            title="For Employers"
            subtitle="List your job to find the perfect developer for the role"
            href="/add-job"
            label="Add Job"
            bg="bg-indigo-100"
          />
        </div>
      </div>
    </section>
  );
};
export default HomeList;
