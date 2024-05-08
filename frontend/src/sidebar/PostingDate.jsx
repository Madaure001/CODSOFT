import React from "react"
import InputField from "../components/InputField";

const PostingDate = ({handleChange}) => {

    const now = new Date();

    const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(now - 3 * 30 * 24 * 60 * 60 * 1000);

    // convert date to string
    const aDayAgo = twentyFourHoursAgo.toISOString().substring(0, 10);
    const aWeekAgo = sevenDaysAgo.toISOString().substring(0, 10);
    const aMonthAgo = thirtyDaysAgo.toISOString().substring(0, 10);
    const threeMonthsAgo = ninetyDaysAgo.toISOString().substring(0, 10);
  return (
    <>
      {/* larger screens */}
      <div className='bg-gray-100 shadow-md rounded-lg p-2 hidden md:block'>
            <h4 className="text-md sm:text-lg mb-2 font-semibold">Date of Posting</h4>

            <div className="flex gap-2 text-sm sm:text-md sm:flex-col">
                <label id="posting-radio" className='sidebar-label-container '>
                  <input 
                    type="radio" 
                    name='test3' 
                    id='test'
                    value=''
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span> All time
                </label>

                <InputField 
                  handleChange={handleChange} 
                  value={aDayAgo} 
                  title='Last 24 Hours' 
                  name='test3' 
                />
                <InputField 
                  handleChange={handleChange} 
                  value={aWeekAgo} 
                  title='Last 7 days' 
                  name='test3' 
                />
                <InputField 
                  handleChange={handleChange} 
                  value={aMonthAgo} 
                  title='Last Month' 
                  name='test3' 
                />
                
            </div>
      </div>
      {/* smaller screens */}
      <div className="bg-gray-100 shadow-md rounded-lg p-2 md:hidden ">
        <label id="posting-select" className="text-sm mr-2 font-semibold"> Date
          <select 
            onClick={handleChange}
            className=" select-filter">
              <option value=""> Any </option>
              <option value={aDayAgo} > Last 24 Hours </option>
              <option value={aWeekAgo} > Last 7 days </option>
              <option value={aMonthAgo} > Last Month </option>
              <option value={threeMonthsAgo} > Last 3 Months </option>
          </select>
        </label>
      </div>
    </> 
  )
}

export default PostingDate