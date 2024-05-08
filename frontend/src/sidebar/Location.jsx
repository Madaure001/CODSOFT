import React from "react"
import InputField from "../components/InputField"

const Location = ({handleChange, handleClick}) => { 

  
  return (
    <>
    {/* smaller screens */}
      <div className="bg-gray-100 shadow-md rounded-lg p-2 ">
        <label id="location-select" className="text-sm font-semibold mr-2">Location

          <select 
            onClick={handleChange} 
            name="location"
            id="location"
            className=" select-filter"
          >
              <option value="" > All </option>
              <option value="london" > London </option>
              <option value="seattle" > Seattle </option>
              <option value="madrid" > Madrid </option>
              <option value="bostn" > Boston </option>
          </select>
        </label>
      </div>
    </>
  )
}

export default Location