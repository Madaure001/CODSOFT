import React, { useState } from "react"
import { Link } from "react-router-dom";
import { SlBriefcase, SlCalender, SlClock, SlHeart, SlLocationPin } from "react-icons/sl";
import { FaDollarSign } from "react-icons/fa6";

const JobCard = ({data}) => {
    
    //grab data properties
    var {
        _id,
        companyLogo,
        companyName,
        jobTitle,
        jobLocation,
        employmentType,
        minSalary,
        maxSalary,
        jobPostingDate,
        description
    } = data || {};
    //const [readMore, setReadMore] = useState(false);
    jobPostingDate = new Date(jobPostingDate).toDateString().slice(0,10)
    
    //if (description.length > 50)
  return (
    <div className="m-2">
        <section className="hover:border-r hover:border-blue shadow-md bg-gradient-r from-gray-100 to-white rounded-lg mb-3">
            <div>
                <Link to={`/jobs/job/${_id}`} className="flex gap-4 items-start m-1 p-2">
                    <img 
                        src={`http://localhost:8000/profileUploads/${companyLogo}`} 
                        alt="company logo" 
                        width={80}
                        height={80}
                    />
                    <div >
                        <h4 className="text-blue w-full hover:underline hover:underline-blue text-base">
                            <span className="flex items-center gap-1"><SlBriefcase /> {companyName} </span>       
                        </h4>
                          
                        <h3 className="text-lg font-semibold text-gray-700 mb-2 hover:underline">
                            {jobTitle}
                        </h3>
                    </div>
                </Link>                
            </div>
            <div>
                <div to="/view-job" className="flex"> 
                    <div className="text-gray-700 text-sm sm:text-base w-10/11 grid grid-cols-2 gap-2 p-2">
                        <span className="flex items-center gap-1"><SlLocationPin />{jobLocation}</span>
                        <span className="flex items-center gap-1"><SlClock />{employmentType}</span>
                        <span className="flex items-center gap-1"><SlCalender  />{jobPostingDate}</span>
                        <span className="flex items-center gap-1"><FaDollarSign />{minSalary}k-{maxSalary}k</span>
                        
                    </div>
                                  
                </div>
            </div>
        </section>
    </div>
  )
}

export default JobCard