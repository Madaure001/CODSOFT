import { useState } from "react";

export  const calculatePageRange = ({arrayLength, itemsPerPage}) => {
  const [currentPage, setCurrentPage] = useState(1);  
  const totalPages = Math.ceil(arrayLength/itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;     
  
  return {startIndex, endIndex, totalPages}
} 

const Pagination = ({totalResults}) => {

  //pagination
  const [currentPage, setCurrentPage] = useState(1);  
  const itemsPerPage = 5;    
  //calculate the index range
  const {totalPages} = <calculatePageRange totalResults={totalResults} itemsPerPage={itemsPerPage} />

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
  return (
    <div className="flex justify-center mt-4 space-x-8 text-gray-500 ">
      <button 
        onClick={previousPage} 
        disabled={currentPage === 1}
        className="hover:border-blue hover:border hover:rounded-md px-2 disabled:hover:border-none"
        >
        Previous
      </button>
      <span>
        Page {currentPage} of { totalPages}
      </span>
      <button 
        onClick={nextPage} 
        disabled={currentPage === totalPages}
        className="hover:border-blue hover:border hover:rounded-md px-2 disabled:hover:border-none"
        >
        Next
      </button>
    </div>
  )
}
export default Pagination; 

