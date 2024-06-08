import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/NavBar';

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </div>
  );
};
export default MainLayout;
