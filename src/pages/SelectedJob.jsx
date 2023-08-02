import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from "isomorphic-dompurify";
import { CiMapPin } from "react-icons/ci";

function SelectedJob() {
    const { id } = useParams()
    const [job, setJob] = useState({})
    useEffect(() => {
        async function getSelectedJob() {
            const options = {
                method: "GET",
                url: `https://jobsearch4.p.rapidapi.com/api/v2/Jobs/${id}`,
                headers: {
                    "X-RapidAPI-Key": "3eacc72e4amshb5e94d827aaf7acp12ece2jsnec5609b4f77e",
                    "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
                },
            };
            // Fetch the data using the ID from the query params (e.g., context.params.dynamicId)
            const response = await axios.request(options);
            const data = response.data;
            setJob(data)
            console.log(job)
        }
        getSelectedJob()
    }, [])
    // const formattedDate = job.publishedDate.toLocaleString("en-US", {
    //     month: "2-digit",
    //     day: "2-digit",
    //     year: "numeric",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit",
    // });
    return (
        <div className="pt-[10vh]">
            <section className="bg-gray-200 py-8">
                <section className="max-w-[1000px] mx-auto p-5 lg:p-0">
                    <h1 className="text-3xl header">{job.title}</h1>
                    <p>
                        {job.company} |{" "}
                        <span className="text-blue-500">{job.location}</span>
                    </p>
                    {/* <br />
                    <p>Posted: {formattedDate}</p>
                    <section className="flex gap-3 items-center mt-2">
                        {job.keyPhrases.map((tag, index) => {
                            return (
                                <p
                                    key={index}
                                    className="border border-black capitalize px-2 py-1"
                                >
                                    {tag.text}
                                </p>
                            );
                        })}
                    </section> */}
                </section>
            </section>
            <section className="max-w-[1000px] mx-auto my-2 py-5 px-10 lg:p-0">
                <section className="flex flex-col lg:flex-row justify-between gap-3">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(job.originalPosting),
                        }}
                        className="lg:w-[65%]"
                    />
                    <div className="lg:w-[30%] bg-gray-200 h-full flex flex-col justify-center items-center p-5">
                        <h1 className="text-center text-2xl header">{job.company}</h1>
                        <hr className="my-4 border border-blue-500 w-full" />
                        <section className="flex gap-2 items-center">
                            <CiMapPin size={20} />
                            <p>{job.location}</p>
                        </section>
                        <button className="bg-blue-500 text-white px-4 py-2 my-2">
                            <a href={job.url} target="_blank">
                                Apply
                            </a>
                        </button>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default SelectedJob