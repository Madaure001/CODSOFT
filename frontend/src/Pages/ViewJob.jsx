import React, { useEffect, useState } from "react"
import JobCard from "../components/JobCard";
import QuickLinks from "../components/QuickLinks";
import { Link, useParams } from "react-router-dom";
import { Token } from "../lib/isAuth";

const JobInfo = () => {
    const {id} = useParams();
    const [job, setJob] = useState({});
    const [jobReqsArray, setJobReqsArray] = useState();
    const [roleArray, setRoleArray] = useState();
    const [benefitsArray, setBenefitsArray] = useState();
    const token = Token()

    useEffect(() => {
        const getJobDetails = async () => {
             await fetch(`https://codsoft-fmke.onrender.com/api/jobs/job/${id}`,{
                method: "GET",
                headers: {
                'Content-Type':'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                setJob(data);
                setJobReqsArray(data?.jobReqs);
                setRoleArray(data?.KeyResAreas);
                setBenefitsArray(data?.jobBenefits);
            })
            .catch(err => console.log(err))
        }
        if(id) getJobDetails();
    }, [id ])
    
    
    return (
        <>
            {job &&
                <div className="max-w-screen-2xl container mx-auto xl:px-24 px-8 bg-gradient-to-b 
                from-gray-100 to-white">
                    {/* posting form */}
                    <div className="bg-gradient-to-r from-gray-100 to-white p-4 lg:px-12 pt-16 rounded-lg">
                        <div className="border border-gray-300 py-2 rounded-lg mb-2">
                            <JobCard data={job}/>
                            <QuickLinks job={job}/>
                        </div>
                        <div className=" border border-gray-300 py-1 px-4 rounded-lg mb-2">
                            <h3 className="">Reference: {job?.referenceNumber}</h3>
                            <p className="text-sm">{job?.description}</p>                    
                        </div>
                        <div className="border border-gray-300 py-2 px-4 rounded-lg mb-2">
                            <h3 className=" text-blue/80 mb-2 font-semibold">Duties & Responsibilities</h3>
                            <>{job?.jobReqs ? (
                                <>
                                    <h4>Requirements:</h4>
                                    <ul className="text-sm list-disc px-4">
                                        {jobReqsArray?.map((req, i) => (
                                            <li key={i}>
                                            <p>{req}</p> 
                                            </li>
                                        ))}
                                    </ul>
                                </>
                                
                            ):(<></>)}
                            </>
                                <>{job?.KeyResAreas ? (
                                    <>
                                        <h4>Duties:</h4>
                                        <ul className="text-sm list-disc px-4">
                                            {roleArray?.map((role, i) => (
                                                <li key={i}>
                                                <p>{role}</p> 
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                    
                                ):(<></>)}
                            </>
                        </div>
                        <div className=" border border-gray-500 py-1 px-4 rounded-lg mb-2">
                            <h3 className=" text-blue/80 mb-2 font-semibold">Package & Remuneration</h3>
                            <>{job?.jobBenefits ? (
                                <>
                                    <ul className="text-sm list-disc px-4">
                                        {benefitsArray?.map((benefit, i) => (
                                            <li key={i}>
                                            <p>{benefit}</p> 
                                            </li>
                                        ))}
                                    </ul>
                                </>
                                
                            ):(<></>)}
                            </>
                        </div>
                        <Link to={`/jobs/job/${job._id}/apply`} className="bg-green-500 px-8 text-white font-semibold flex justify-center items-center py-1 mb-2 rounded-md">Apply Now</Link>
                    </div>
                    
                </div>
            }
        </>
    )
  
}

export default JobInfo;