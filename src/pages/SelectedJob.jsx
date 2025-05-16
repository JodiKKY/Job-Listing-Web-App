import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "isomorphic-dompurify";
import { CiMapPin } from "react-icons/ci";

function SelectedJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSelectedJob() {
      try {
        const response = await axios.get(
          "https://jsearch.p.rapidapi.com/job-details",
          {
            params: { job_id: id },
            headers: {
              "x-rapidapi-key": "6c83dd45a1msh79e3f99fbf32be6p12adbfjsn8007d5f2a47f",
              "x-rapidapi-host": "jsearch.p.rapidapi.com",
            },
          }
        );

        const jobDetails = response.data.data?.[0];
        if (jobDetails) {
          setJob(jobDetails);
        } else {
          setError("Job details not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job details.");
      }
    }

    if (id) {
      getSelectedJob();
    }
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  }

  if (!job) {
    return <p className="text-center mt-20">Loading job details...</p>;
  }

  return (
    <div className="pt-[10vh]">
      <section className="bg-gray-200 py-8">
        <section className="max-w-[1000px] mx-auto p-5 lg:p-0">
          <h1 className="text-3xl header">{job.job_title}</h1>
          <p>
            {job.employer_name} |{" "}
            <span className="text-blue-500">{job.job_city}, {job.job_country}</span>
          </p>
        </section>
      </section>

      <section className="max-w-[1000px] mx-auto my-2 py-5 px-10 lg:p-0">
        <section className="flex flex-col lg:flex-row justify-between gap-3">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(job.job_description || "No description available."),
            }}
            className="lg:w-[65%]"
          />

          <div className="lg:w-[30%] bg-gray-200 h-full flex flex-col justify-center items-center p-5">
            <h1 className="text-center text-2xl header">{job.employer_name}</h1>
            <hr className="my-4 border border-blue-500 w-full" />
            <section className="flex gap-2 items-center">
              <CiMapPin size={20} />
              <p>{job.job_city}, {job.job_country}</p>
            </section>
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 my-2 inline-block text-center"
            >
              Apply
            </a>
          </div>
        </section>
      </section>
    </div>
  );
}

export default SelectedJob;
