import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { FaPlaystation, FaGoogle, FaPaypal, FaApple } from "react-icons/fa";
import { SiTesla, SiToshiba } from "react-icons/si";
import JobCard from "../component/JobCard/JobCard";

function Homepage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const options = {
        method: "GET",
        url: "https://jobsearch4.p.rapidapi.com/api/v2/Jobs/Latest",
        params: { PageSize: "20" },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY, // use .env for security
          "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setJobs(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch jobs. Please try again.");
      }
    };

    fetchJobs();
  }, []);

  return (
    <main className="pt-[7vh] bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex justify-center items-center py-16 px-6 bg-gradient-to-b from-blue-50 to-white text-center">
        <div>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">
            DISCOVER. <span className="text-blue-600">CONNECT.</span> SUCCEED.
          </h1>
          <p className="lg:w-[60%] mx-auto text-lg text-gray-600 mb-6">
            EmployNexa is your gateway to exciting opportunities. Discover top jobs from trusted employers and elevate your career today.
          </p>
          <Link to="/app/jobs">
            <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-medium py-3 px-6 rounded-lg shadow">
              Search Jobs
            </button>
          </Link>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="py-14 bg-gray-100">
        <h2 className="text-center text-gray-500 text-lg font-medium mb-5">
          Trusted by the world’s leading companies
        </h2>
        <Marquee className="py-4">
          <FaGoogle size={60} className="mx-10 text-gray-400 hover:text-gray-700 transition" />
          <FaPlaystation size={60} className="mx-10 text-gray-400 hover:text-gray-700 transition" />
          <SiTesla size={60} className="mx-10 text-gray-400 hover:text-gray-700 transition" />
          <FaPaypal size={60} className="mx-10 text-gray-400 hover:text-gray-700 transition" />
          <FaApple size={60} className="mx-10 text-gray-400 hover:text-gray-700 transition" />
          <SiToshiba size={60} className="mx-10 text-gray-400 hover:text-gray-700 transition" />
        </Marquee>
      </section>

      {/* Job Listings Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Top Jobs</h3>
          <Link to="/app/jobs" className="text-blue-600 hover:underline font-medium text-sm">
            View All
          </Link>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobCard
                key={index}
                name={job.title}
                company={job.company}
                tags={job.tags}
                slug={job.slug}
                jobSource={job.jobSource}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              {error ? "Error loading jobs." : "Loading top jobs..."}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Homepage;
