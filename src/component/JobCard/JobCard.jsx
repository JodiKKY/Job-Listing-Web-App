import React, { useState } from "react";
import { Link } from "react-router-dom";

function JobCard({ name, tags, company, slug, jobSource }) {
  const [loading, setLoading] = useState(false);

  return (
    <section className="border p-6 my-4 rounded-2xl shadow-sm transition hover:shadow-md">
      <p className="text-gray-500 text-sm">{company}</p>

      <h2 className="text-2xl font-semibold my-2">{name}</h2>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-gray-600 text-sm">Tags:</span>
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 border text-sm capitalize px-2 py-1 rounded"
          >
            {tag.text}
          </span>
        ))}
      </div>

      <p className="my-3 text-sm">
        Publisher: <span className="text-blue-600 font-medium">{jobSource}</span>
      </p>

      <Link
        to={`/app/jobs/${slug}`}
        onClick={() => setLoading(true)}
        aria-disabled={loading}
        className={`inline-block px-4 py-2 mt-2 rounded-lg text-white text-sm font-medium transition-colors ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Loading Page..." : "Read Job Description"}
      </Link>
    </section>
  );
}

export default JobCard;
