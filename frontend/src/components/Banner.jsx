import { BsSearch } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const Banner = ({query, handleInputChange}) => {

  return (
    <div className='overflow-hidden max-w-screen-2xl container
      mx-auto lg:px-24 md:pt-28 py-14 px-5 bg-gradient-to-t from-white  to-gray-100 '
     >
      <h1 className='text-3xl md:text-5xl font-bold w-full mb-3'>
        Your <span className='text-blue'>New Job </span> 
        Opportunities Awaits <span className='text-blue'>Today</span>
      </h1>
      <p className="text-base sm:text-lg text-black/70 mb-8">
        Thousand of jobs in Computer, Engineering and Technology sectors are waiting for you
      </p>

      {/* search bar */}
      <form action="" className="submit">
        <div className="flex justify-start sm:flex-row flex-col sm:gap-0 gap-4">
          <div className="flex sm:rounded-s-md rounded shadow-lg  sm:w-1/22 w-full focus:outline-none"
          >
            <input 
              type="text" 
              name='job-title' 
              id='job-title'
              onChange={handleInputChange}
              value={query}
              className='input-blue '
              placeholder='find your job title here'
            />
            <BsSearch className="absolute mt-2.5 ml-2 text-blue"/>
          </div>

          <div className="flex sm:rounded-s-md rounded shadow-lg  sm:w-1/22 w-full"
          >
            <input 
              type="text" 
              name='location' 
              id='location'
              
              className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 
                placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6 focus:outline-none focus:border focus:border-blue focus:rounded-md'
              placeholder='Location'
            />
            <CiLocationOn className="absolute mt-2.5 ml-2 text-blue"/>
          </div>
          <button 
            type="submit" 
            className="bg-blue py-2 px-8 text-white sm:rounded-r-md shadows-lg rounded hover:bg-blue/70"
          >
            Search
          </button>
        </div>
      </form>
    </div>

  )
}

export default Banner;