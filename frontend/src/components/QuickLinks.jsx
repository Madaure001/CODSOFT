import React from 'react'
import { SlHeart, SlShare } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { MdOutlineLocalPrintshop } from "react-icons/md";

const QuickLinks = ({job}) => {

  return (
    <div className="flex items-center font-semibold text-white text-base lg:text-lg gap-2 px-2">
        <Link 
          to={
            {
             pathname: `/jobs/job/${job?._id}/apply`,
             myCustomProps: job
            }
          }
          className="bg-green-500 px-2 md:px-8 py-1  rounded-md"
          
        >
            Apply Now
        </Link>
        <button 
          to={"/save"}
          className="bg-blue/60 px-4 py-1 flex gap-2 rounded-md"
        >
          Save
        </button>
        <button 
          to={"/share"}
          className="px-4 py-1 bg-blue/60 flex items-center justify-center gap-2 rounded-md"
        >Share<SlShare />
        </button>
        
    </div>
  )
}

export default QuickLinks;