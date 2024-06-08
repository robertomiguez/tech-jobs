import Hero from '../components/Hero';
import HomeList from '../components/HomeList';
import JobList from '../components/JobList';
import AllJobs from '../components/AllJobs';
const HomePage = () => {
  return (
    <div>
      <Hero />
      <HomeList />
      <JobList isHome={true} />
      <AllJobs />
    </div>
  );
};
export default HomePage;
