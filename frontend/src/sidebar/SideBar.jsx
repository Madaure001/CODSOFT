import React from "react"
import Location from "./Location";
import Salary from "./Salary";
import PostingDate from "./PostingDate";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";

const SideBar = ({handleChange, handleClick}) => {
  return (
    <>
      {/*lareger screen */}
      <div className="hidden md:block space-y-5 text-gray-500">
          <h3 className="text-lg font-bold">Filters</h3>
          <Location handleChange={handleChange} handleClick={handleClick}/>          
          <PostingDate handleChange={handleChange} handleClick={handleClick}/>
          <Salary handleChange={handleChange} handleClick={handleClick} />
          <EmploymentType handleChange={handleChange} handleClick={handleClick}/>
          <WorkExperience handleChange={handleChange} handleClick={handleClick}/>          
      </div>
      {/* small screens */}
        <div className="space-y-5 text-gray-500 md:hidden block">
          <h3 className="text-base font-bold">Filters</h3>

          <div className="grid grid-cols-3 text-sm gap-2">
            
            <PostingDate handleClick={handleClick} handleChange={handleChange}/>
            <EmploymentType handleChange={handleChange} handleClick={handleClick}/>
            <WorkExperience handleClick={handleClick} handleChange={handleChange}/>
            
          </div>

      </div>
    </>

  )
}

export default SideBar;