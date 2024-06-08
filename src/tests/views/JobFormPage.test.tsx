// JobFormPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import JobFormPage from '../../views/JobFormPage';
import { updateJob } from '../../services/JobService';
import '@testing-library/jest-dom';

// Mock the addJob and updateJob functions
jest.mock('../../services/JobService');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useParams: () => ({ id: '1' }),
  useLoaderData: () => ({
    title: 'Sample Job',
    description: 'Sample Description',
    salary: 'Under $50K',
    location: 'Sample Location',
    type: 'Full-Time',
    company: {
      name: 'Sample Company',
      description: 'Sample Company Description',
      contactEmail: 'sample@company.com',
      contactPhone: '1234567890',
    },
  }),
}));

describe('JobFormPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with pre-filled data for editing', () => {
    render(
      <MemoryRouter initialEntries={['/jobs/edit/1']}>
        <Routes>
          <Route
            path="/jobs/edit/:id"
            element={<JobFormPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Job Title/i)).toHaveValue('Sample Job');
    expect(screen.getByLabelText(/Job Description/i)).toHaveValue(
      'Sample Description'
    );
    expect(screen.getByLabelText(/Salary/i)).toHaveValue('Under $50K');
    expect(screen.getByLabelText(/Location/i)).toHaveValue('Sample Location');
    expect(screen.getByLabelText(/Job Type/i)).toHaveValue('Full-Time');
    expect(screen.getByLabelText(/Company Name/i)).toHaveValue(
      'Sample Company'
    );
    expect(screen.getByLabelText(/Company Description/i)).toHaveValue(
      'Sample Company Description'
    );
    expect(screen.getByLabelText(/Contact Email/i)).toHaveValue(
      'sample@company.com'
    );
    expect(screen.getByLabelText(/Contact Phone/i)).toHaveValue('1234567890');
  });

  it('submits the form and updates the job', async () => {
    (updateJob as jest.Mock).mockResolvedValueOnce({});

    render(
      <MemoryRouter initialEntries={['/jobs/edit/1']}>
        <Routes>
          <Route
            path="/jobs/edit/:id"
            element={<JobFormPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Job Title/i), {
      target: { value: 'Updated Job Title' },
    });
    fireEvent.click(screen.getByText(/Update Job/i));

    await waitFor(() => {
      expect(updateJob).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({ title: 'Updated Job Title' })
      );
      expect(toast.success).toHaveBeenCalledWith('Job updated successfully');
      expect(mockedNavigate).toHaveBeenCalledWith('/jobs');
    });
  });

  it('shows an error message on job update failure', async () => {
    (updateJob as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to update job')
    );

    // Mock console.error to suppress error logging during this test
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={['/jobs/edit/1']}>
        <Routes>
          <Route
            path="/jobs/edit/:id"
            element={<JobFormPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Job Title/i), {
      target: { value: 'Updated Job Title' },
    });
    fireEvent.click(screen.getByText(/Update Job/i));

    await waitFor(() => {
      expect(updateJob).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({ title: 'Updated Job Title' })
      );
      expect(toast.error).toHaveBeenCalledWith('Error on Job update');
    });

    // Restore console.error to its original implementation
    consoleErrorMock.mockRestore();
  });
});
