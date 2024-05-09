import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner';
import { parse } from 'dotenv';
import JobCard from '../components/JobCard';
import Jobs from '../components/Jobs';
import SideBar from '../sidebar/SideBar';
import NewsLetter from '../components/NewsLetter';
import axios from 'axios';

const Home = () => {
  
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
    
  //Loading
  const [isLoading, setIsLoading] = useState(true);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);  
  let totalPages = 0;
  let resultsFound = 0;
  const itemsPerPage = 5;

  //handle search input change
  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }
  const getAlljobs = async () => {
    setIsLoading(true);
    const res = await axios.get(`http://localhost:8000/api/jobs`)
    console.log(res)
    setJobs(res.data);
    console.log(jobs)
    setIsLoading(false);
  }
  //update jobs and selected categories
  useEffect( () => {
    getAlljobs();
  }, [])

  //filter jobs search by title
  const filterItems = jobs.filter((job) => 
    job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  )
//console.log(filterItems)
 //----------- Radio filtering --------
 const handleChange = (e) => {
    setSelectedCategory(e.target.value)
 }

 //-----------Button filtering-------
 const handleClick = (e) => {
    setSelectedCategory(e.target.value)    
 }

 //calculate the index range
 const calculatePageRange = (arrayLength) => {
  resultsFound = arrayLength;
  totalPages = Math.ceil(arrayLength/itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  
  return {startIndex, endIndex}
 }

 //next page function
 const nextPage = () => {
  if(currentPage < totalPages ) {
    setCurrentPage(currentPage + 1)
  }
 }

 //next page 
 const previousPage = () => {
  if(currentPage > 1) {
    setCurrentPage(currentPage - 1)
  }
 }
 
 //--------main function ----------- 
 const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    //input query filtering
    if(query) {
      filteredJobs = filterItems;
    }

    //category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter((job) => (

        job.jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(job.maxPrice) === parseInt(selected) ||
        job.postingDate >= selected ||
        job.salaryType.toLowerCase() === selected.toLowerCase() ||
        job.experienceLevel.toLowerCase() === selected.toLowerCase() ||
        job.employmentType.toLowerCase() === selected.toLowerCase()

      ));
      //console.log(filteredJobs);
    }

    //slice the data based on current page
    const {startIndex, endIndex} = calculatePageRange(filteredJobs.length);
    
    if(filteredJobs.length > itemsPerPage) {
      filteredJobs = filteredJobs.slice(startIndex, endIndex)
    }

    return filteredJobs.map((data, i) => (      
      <JobCard data={data} key={i}/>
    ))
  }

  const result = filteredData(jobs, selectedCategory, query);
  //total pages
  
  return (
    <div className='shadow-lg '>
      <Banner 
        query={query}
        handleInputChange={handleInputChange}
      />
      {/* main content */}
      <div className='bg-gray-100 md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-2 '>

        {/*left side */}
        <div className='bg-white p-4 mb-2 rounded-[10px]'>
          <SideBar 
            handleChange={handleChange}
            handleClick={handleClick}
          />
        </div>

        {/*center piece */}
        <div className='col-span-2 bg-white p-4 mb-2 rounded-[10px]'>
          {
            isLoading ? (<> </>) 
            :<>< Jobs result={result} resultsFound={resultsFound} /></>            
          }

          {/* pagination here */}
          {
            result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8 text-gray-500 ">
                  <button 
                    onClick={previousPage} 
                    disabled={currentPage === 1}
                    className='hover:border-blue hover:border hover:rounded-md px-2 disabled:hover:border-none disabled:text-gray-300'
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of { totalPages}
                  </span>
                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className='hover:border-blue hover:border hover:rounded-md px-2 disabled:hover:border-none disabled:text-gray-300'
                  >
                    Next
                  </button>
              </div>
            ) : ''
          }
          
        </div>
        
        {/*right side */}
        <div className='bg-white p-4 rounded-[10px]'>
          <NewsLetter />
        </div>
        
      </div>
    </div>
  )
}

export default Home;