import React from "react"
import InputField from "../components/InputField"

const EmploymentType = ({handleClick, handleChange}) => {
  return (
    <>
      {/* larger screen */}
      <div className="large-screen-filter">
        <h4 className="text-md sm:text-lg mb-2 font-semibold">Employment Type</h4>

        <div className="flex gap-2 text-sm sm:text-md sm:flex-col">
            <label id="employment-radio" className="sidebar-label-container ">
              <input 
                type="radio" 
                name="test4" 
                id="test"
                value=""
                onChange={handleChange}
              />
              <span className="checkmark"></span> Any 
            </label>

            <InputField 
              handleChange={handleChange} 
              value="Full-time" 
              title="Full-time" 
              name="test4" 
            />
            <InputField 
              handleChange={handleChange} 
              value="Part-time" 
              title="Part-time" 
              name="test4" 
            />
            
            <InputField 
              handleChange={handleChange} 
              value="Temporary" 
              title="Temporary" 
              name="test4" 
            />
            
        </div>
      </div>
      {/* smaller screens */}
      <div className="bg-gray-100 shadow-md rounded-lg p-2  md:hidden">
          <label id="employment-select" className="text-md mb-2 font-semibold"> Job Type

            <select 
              onClick={handleChange}
              className="select-filter"
            >
                <option value=""> Any </option>
                <option value="full-time" > Full-Time </option>
                <option value="part-time"> Part-Time </option>
                <option value="temporary" > Temporary </option>
                <option value="contract"  > Contract </option>
            </select>
          </label>
      </div>
    </>
  )
}

export default EmploymentType