import React from "react"

const Jobs = ({result, resultsFound}) => {
  return (
    <div> 
      <h3 className="text-gray-400 font-medium pb-3" >
        {resultsFound} Jobs found
      </h3>     
      {result}
    </div>
  )
}

export default Jobs