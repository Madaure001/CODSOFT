import React from "react"

const Button = ({onClickHandler, value, title}) => {
  return (
    <div>
        <button 
            className="w-full px-1 lg:px-2 sm:py-1 text-sm md:text-base bg-gray-200 hover:bg-blue 
                shadow-md rounded-md hover:text-white" 
            type="text" 
            value={value} 
            onClick={onClickHandler}
        >
            {title}
        </button>
    </div>
  )
}

export default Button
