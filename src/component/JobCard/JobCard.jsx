import React, { useState } from "react";
import { Link } from "react-router-dom";

function JobCard({name,tags,company,slug,jobSource}) {
  const [buttonWasClicked, setButtonWasClicked] = useState(false);
  return (
    <section className="border p-5 my-3 rounded-md">
      <p>{company}</p>
      <h1 className="text-xl font-bold my-3">{name}</h1>
      <section className="flex gap-2 flex-wrap items-center">
        <p>Tags:</p>
        {tags.map((tag, index) => {
          return (
            <p key={index} className="border capitalize px-2 py-1 my-2">
              {tag.text}
            </p>
          );
        })}
      </section>
      <p className="my-3">
        Publisher : <span className="text-blue-500">{jobSource}</span>
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 my-2 disabled:bg-gray-500 ease duration-500"
        onClick={() => setButtonWasClicked(true)}
        disabled={buttonWasClicked}
      >
        {buttonWasClicked ? (
            <p>Loading Page...</p>
        ) : (
          <Link to={`/app/jobs/${slug}`}>
            <p>Read Job Description</p>
          </Link>
        )}
      </button>
    </section>
  );
}

export default JobCard;