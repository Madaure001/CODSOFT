import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import isAuth, { userType } from "../lib/isAuth"

const Loader = () => {
    const navigate = useNavigate()
    useEffect(() => {
    isAuth() ? (
      navigate(`/${userType()}/dashboard`)
    ) : ""
  }, [isAuth()]);
  return (
    <div className="flex justify-center items-center py-36 w-full"><span className="loading loading-bars loading-xs"></span>
        
        <span className="loading loading-spinner loading-lg text-2xl text-blue/70">creating your account... this may take a minute</span></div>
  )
}

export default Loader