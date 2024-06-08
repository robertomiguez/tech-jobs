import { useState } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Job } from '../types/Job';
import { addJob, updateJob } from '../services/JobService';

const JobFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const jobLoaded = useLoaderData() as Job | undefined;

  const [job, setJob] = useState<Job>(
    jobLoaded || {
      title: '',
      description: '',
      salary: 'Under $50K',
      location: '',
      type: 'Full-Time',
      company: {
        name: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
      },
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateJob(id, job);
      } else {
        await addJob(job);
      }
      toast.success(`Job ${id ? 'updated' : 'added'} successfully`);
    } catch (error) {
      toast.error(`Error on Job ${id ? 'update' : 'add'}`);
      console.error(`Error on Job ${id ? 'update' : 'add'}`, error);
    }
    navigate('/jobs');
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-6">
            {id ? 'Edit Job' : 'Add Job'}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Job Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={job.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={job.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="salary"
              >
                Salary
              </label>
              <select
                id="salary"
                name="salary"
                className="border rounded w-full py-2 px-3"
                required
                value={job.salary}
                onChange={handleChange}
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={job.location}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="type"
              >
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={job.type}
                onChange={handleChange}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <h2 className="text-2xl font-bold mb-4">Company Info</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company.name"
              >
                Company Name
              </label>
              <input
                id="company.name"
                name="company.name"
                type="text"
                value={job.company.name}
                onChange={(e) =>
                  setJob({
                    ...job,
                    company: { ...job.company, name: e.target.value },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company.description"
              >
                Company Description
              </label>
              <textarea
                id="company.description"
                name="company.description"
                value={job.company.description}
                onChange={(e) =>
                  setJob({
                    ...job,
                    company: { ...job.company, description: e.target.value },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company.contactEmail"
              >
                Contact Email
              </label>
              <input
                id="company.contactEmail"
                name="company.contactEmail"
                type="email"
                value={job.company.contactEmail}
                onChange={(e) =>
                  setJob({
                    ...job,
                    company: { ...job.company, contactEmail: e.target.value },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company.contactPhone"
              >
                Contact Phone
              </label>
              <input
                id="company.contactPhone"
                name="company.contactPhone"
                type="tel"
                value={job.company.contactPhone}
                onChange={(e) =>
                  setJob({
                    ...job,
                    company: { ...job.company, contactPhone: e.target.value },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              {id ? 'Update Job' : 'Add Job'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobFormPage;
