import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import JobCard from "../component/JobCard/JobCard";
import Skeleton from "react-loading-skeleton";

const API_URL = "https://jsearch.p.rapidapi.com/search";
const API_KEY =  '6c83dd45a1msh79e3f99fbf32be6p12adbfjsn8007d5f2a47f';

function Jobs() {
  const [input, setInput] = useState("");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async (query = "developer", pageNumber = 1, append = false) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(API_URL, {
        params: {
          query,
          page: pageNumber,
          num_pages: 1,
        },
        headers: {
          "X-RapidAPI-Key":  '6c83dd45a1msh79e3f99fbf32be6p12adbfjsn8007d5f2a47f',
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      });

      const jobResults = response.data.data;
      if (append) {
        setJobs((prev) => [...prev, ...jobResults]);
      } else {
        setJobs(jobResults);
      }
    } catch (err) {
      setError("Failed to fetch jobs. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchJobs(input || "developer", 1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchJobs(input || "developer", nextPage, true);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="mt-[10vh] bg-gray-100 min-h-screen">
      <section className="max-w-[1000px] mx-auto p-5 lg:px-0">
        <h1 className="text-center header text-3xl lg:text-5xl">FIND YOUR DREAM JOB</h1>
        <section className="flex items-center gap-2 my-6">
          <input
            type="text"
            placeholder="Search by job title or keyword"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-400 px-4 py-2 outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 flex items-center justify-center"
            disabled={isLoading}
          >
            <AiOutlineSearch />
          </button>
        </section>

        {error && <p className="text-red-500 text-center my-3">{error}</p>}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {isLoading && !jobs.length ? (
            <Skeleton count={4} height={150} />
          ) : jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobCard
                key={index}
                name={job.job_title}
                company={job.employer_name}
                tags={[job.job_employment_type, job.job_city, job.job_country]}
                slug={job.job_apply_link}
                jobSource={job.job_publisher}
              />
            ))
          ) : (
            <p className="text-center col-span-2">No jobs found.</p>
          )}
        </section>

        {jobs.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="bg-red-500 text-white px-6 py-2 hover:bg-red-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Show More"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Jobs;
