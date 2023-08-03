import axios from 'axios';
import  {useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import JobCard from "../component/JobCard/JobCard"
import Skeleton from 'react-loading-skeleton';

function Jobs() {
    const [input, setInput] = useState('');
    const [jobs, setJobs] = useState([]);
    const [nextPageLink, setNextPageLink] = useState();
    const [isLoading, setIsLoading] = useState(false);


    async function handleSearch(searchItem) {
        const options = {
            method: 'GET',
            url: 'https://jobsearch4.p.rapidapi.com/api/v2/Jobs/Search',
            params: {
                searchQuery: `${searchItem}`,
                pageNumber: "1",
                PageSize: "30",
            },
            headers: {
                'X-RapidAPI-Key': '6c83dd45a1msh79e3f99fbf32be6p12adbfjsn8007d5f2a47f', //move to .env
                'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com',
            },
        };
        setIsLoading(true);
        if (searchItem) {
            try {
                const response = await axios.request(options);
                setJobs(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        else {
            const options = {
                method: "GET",
                url: "https://jobsearch4.p.rapidapi.com/api/v2/Jobs/Search",
                params: {
                    searchQuery: `all jobs`,
                    pageNumber: "1",
                    PageSize: "30",
                },
                headers: {
                    "X-RapidAPI-Key": "3eacc72e4amshb5e94d827aaf7acp12ece2jsnec5609b4f77e",
                    "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
                },
            };
            try {
                const response = await axios.request(options);
                setJobs(response.data.data)
                setIsLoading(false)
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
    }


    async function loadNextPage(searchItem) {
        setIsLoading(true);
        const options = {
            method: "GET",
            url: "https://jobsearch4.p.rapidapi.com/api/v2/Jobs/Search",
            params: {
                searchQuery: searchItem ? `${searchItem}` : `any`,
                pageNumber: "1",
                PageSize: "30",
            },
            headers: {
                "X-RapidAPI-Key": "3eacc72e4amshb5e94d827aaf7acp12ece2jsnec5609b4f77e",
                "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
            },
        };
        try {
            const response = await axios.request(options);

            const newData = response.data.data;
            setJobs((prevJobs) => [...prevJobs, ...newData]);
            setNextPageLink(response.data.nextPage);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(
        () => {
            //API Call with useEffect and Axios
            const fetchJobs = async () => {
                const options = {
                    method: 'GET',
                    url: 'https://jobsearch4.p.rapidapi.com/api/v2/Jobs/Latest',
                    params: {
                        searchQuery: `all jobs`,
                        pageNumber: "1",
                        PageSize: "30",
                    },
                    headers: {
                        'X-RapidAPI-Key': '6c83dd45a1msh79e3f99fbf32be6p12adbfjsn8007d5f2a47f', //move to .env
                        'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com',
                    },
                };

                try {
                    const response = await axios.request(options);//API Call
                    setJobs(response.data.data);//update the job state with our jobs
                    setNextPageLink(response.data.nextPage)
                } catch (error) {
                    setError('An error occurred');
                }
            };

            fetchJobs();
            console.log(jobs)
        }, []);

    return (
        <main>
            {/* Navbar */}
            <main className="mt-[10vh] bg-gray-200">
                <section className="max-w-[1000px] mx-auto p-5 lg:px-0">
                    <h1 className="text-center header text-3xl lg:text-5xl">
                        FIND YOUR DREAM JOB
                    </h1>
                    <br />
                    {/* Search Bar */}
                    <section className="flex justify-between items-center gap-2 w-full">
                        <input
                            type="text"
                            className="bg-transparent text-black px-4 py-2 outline-none appearance-none border border-gray-500 w-[80%] lg:w-[90%]"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                        />
                        <button
                            onClick={() => handleSearch(input)}
                            disabled={isLoading}
                            className="text-xl text-white bg-blue-500 px-4 py-[0.6rem] w-[20%] lg:w-[10%] flex justify-center items-center disabled:bg-gray-500 ease duration-500"
                        >
                            <AiOutlineSearch />
                        </button>
                    </section>
                </section>
            </main>
            <section className="max-w-[1000px] mx-auto">
                <section className="my-5">
                    {/* Content */}
                    <section>
                        {isLoading ? (
                            <section className="max-w-[1000px] mx-auto p-5 lg:p-0">
                                <Skeleton
                                    count={jobs.length}
                                    style={{
                                        padding: '3em',
                                        marginTop: '1em',
                                        marginBottom: '1em',
                                    }}
                                />
                            </section>
                        ) : (
                            <section className="max-w-[1000px] mx-auto p-5 lg:p-0 ">
                                {jobs.length > 0 ? (
                                    <section className='grid grid-cols-2 gap-5'>
                                        {jobs.map((job, index) => {
                                            return (
                                                <JobCard
                                                    key={index}
                                                    name={job.title}
                                                    company={job.company}
                                                    tags={job.tags}
                                                    slug={job.slug}
                                                    jobSource={job.jobSource}
                                                />
                                            );
                                        })}
                                        {/* Pagination Button */}
                                        <section
                                            className="max-w-[200px] mx-auto"
                                            onClick={() => loadNextPage(input)}
                                        >
                                            <button className="px-4 py-2 bg-red-500 text-white my-5 w-[200px]" onClick={() => loadNextPage(input)}>
                                                <p>Show More</p>
                                            </button>
                                        </section>
                                    </section>
                                ) : (
                                    <h1 className="text-center py-16 header text-3xl">
                                        No Jobs Found.
                                    </h1>
                                )}
                            </section>
                        )}
                    </section>
                </section>
            </section>
        </main>
    )
}

export default Jobs