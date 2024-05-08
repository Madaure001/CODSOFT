import React from "react"
import InputField from "../components/InputField"

const WorkExperience = ({handleChange}) => {
  return (
    <>
      {/* small screens */}
      <div className="small-screen-filter">
          <label id="experience-select" className="text-sm mr-2 font-semibold"> Experience

            <select 
              onClick={handleChange} 
              className="select-filter">
                <option value=""> Any </option>
                <option value="Internship" >Internship</option>
                <option value="Work remotely" > Work Remotely </option>
                <option value="Junior" > Junior </option>
                <option value="Intermediate" > Senior </option>
            </select>
          </label>
      </div>
    </>
  )
}

export default WorkExperience