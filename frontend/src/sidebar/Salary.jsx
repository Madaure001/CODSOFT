import React from "react"
import Button from "./Button"
import InputField from "../components/InputField"

const Salary = ({handleChange, handleClick}) => {
  return (
    <>
      <section className="large-screen-filter">
          <h4 className="">Salary</h4>
          {/*salary buttons */}
          <div className="flex mb-2 w-full">
              <Button 
                  onClickHandler={handleClick}
                  value="Monthly"
                  title="Monthly"
              />
              <Button 
                  onClickHandler={handleClick}
                  value="Yearly"
                  title="Yearly"
                  cl
              />
          </div>
          {/* salary radios */}
          <div className="flex gap-2 text-sm sm:text-md sm:flex-col">
              <label id="slary-radio">
                <input 
                  type="radio" 
                  name="test2" 
                  id="test2"
                  value=""
                  onChange={handleChange}
                />
                <span ></span> Any
              </label>

              <InputField 
                handleChange={handleChange} 
                value="30" 
                title="< 30k" 
                name="test2" 
              />
              <InputField 
                handleChange={handleChange} 
                value="50" 
                title="< 50k" 
                name="test2" 
              />
              <InputField 
                handleChange={handleChange} 
                value="80" 
                title="< 80k" 
                name="test2" 
              />
              <InputField 
                handleChange={handleChange} 
                value="100" 
                title="< 100k" 
                name="test2" 
              />
          </div>
      </section>
      {/* smaller screens */}
      <div className="bg-gray-100 shadow-md rounded-lg p-2  md:hidden">
          <label id="salary-select" className="text-sm mb-2 font-semibold mr-2">
            Salary
            <select 
              onClick={handleChange}
              className="select-filter">
                <option value="" > Any </option>
                <option value="30" > &lt; 30 000 </option>
                <option value="50" > &lt; 50 000 </option>
                <option value="80" > &lt; 80 000 </option>
                <option value="100" > &lt; 100 000 </option>
            </select>
          </label>
      </div>
    </>
  )
}

export default Salary