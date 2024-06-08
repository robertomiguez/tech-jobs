import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './views/HomePage';
import JobsPage from './views/JobsPage';
import JobPage from './views/JobPage';
import { fetchJobsById } from './services/JobService';
import JobFormPage from './views/JobFormPage';
import NotFoundPage from './views/NotFoundPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<MainLayout />}
      >
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="/jobs"
          element={<JobsPage />}
        />
        <Route
          path="/add-job"
          element={<JobFormPage />}
        />
        <Route
          path="/edit-job/:id"
          element={<JobFormPage />}
          loader={fetchJobsById}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage />}
          loader={fetchJobsById}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
