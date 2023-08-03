import { useEffect, useState } from 'react' // hooks from react 
import axios from 'axios'; // axios for making api calls
import { Link } from 'react-router-dom'; // link to aid navigation to pages 
import Marquee from 'react-fast-marquee'; // package for the horizontal scroll effect
import { FaPlaystation, FaGoogle, FaPaypal, FaApple } from "react-icons/fa"; //icons used 
import { SiTesla, SiToshiba } from "react-icons/si";// icons used 
import JobCard from '../component/JobCard/JobCard'; // a component 

function Homepage() {

  const [jobs, setJobs] = useState([])//allows you to add states to a functionional component , manage , track and Change state values
  const [error, setError] = useState()


  // allows you to perform side effects in your components. example fetching the data as seen below 
  useEffect(
    () => {
      //API Call with useEffect and Axios
      const fetchJobs = async () => { // allows you to performside effects in your components. example fetching the data as seen below 
        const options = { //storing in the whole process of fetching in a variable 
          method: 'GET',
          url: 'https://jobsearch4.p.rapidapi.com/api/v2/Jobs/Latest',
          params: { PageSize: '20' },
          headers: {
            'X-RapidAPI-Key': '6c83dd45a1msh79e3f99fbf32be6p12adbfjsn8007d5f2a47f', //move to .env
            'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com',
          },
        };

        try {
          const response = await axios.request(options);//API Call using axios 
          setJobs(response.data.data);//update the job state with our jobs
        } catch (error) {
          setError('An error occurred'); // catching the errors 
        }
      };

      fetchJobs(); //caling the function
    }, [] ); // added the second empty array argument to ensure that this only runs once when the component is mounted


  return (
    // jsx syntax looks like html but it is known as jsx
    <main className='pt-[7vh]'>
      <main className="pt-[7vh]">
        <section className="flex justify-center items-center h-full py-8 bg-[#f8fafc] px-5 lg:px-0">
          <section className="text-center">
            <h1 className="text-4xl lg:text-6xl header">
              DISCOVER. <span className="text-blue-500">CONNECT.</span> SUCCEED.
            </h1>
            <p className="lg:w-[55%] mx-auto lg:text-lg my-2">
              {` EmployNexa is an innovative job listing platform that connects job seekers with their ideal opportunities effortlessly.Find your dream job today with EmployNexa and take your career to new heights.`}
            </p>
            <Link to={`/app/jobs`}>
              <button className="bg-blue-500 text-white px-4 py-2 my-3">
                <p>Search Jobs</p>
              </button>
            </Link>
          </section>
        </section>
        <section className="max-w-[1000px] mx-auto py-16 px-5">
          <h1 className="text-center text-gray-400">{`Trusted by the world's leading companies`}</h1>
          <Marquee className="p-5 text-gray-400">
            <FaGoogle size={80} className="mx-[3em]" />
            <FaPlaystation size={80} className="mx-[3em]" />
            <SiTesla size={80} className="mx-[3em]" />
            <FaPaypal size={80} className="mx-[3em]" />
            <FaApple size={80} className="mx-[3em]" />
            <SiToshiba size={80} className="mx-[3em]" />
          </Marquee>
        </section>
      </main>
      <section className="max-w-[1000px] mx-auto ">
        <h3 className='font-bold text-2xl'>Top Jobs</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              name={job.title}
              company={job.company}
              tags={job.tags}
              slug={job.slug}
              jobSource={job.jobSource}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Homepage