import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import useReset from '../../hook/useReset';
import { useLoaderData, useParams } from 'react-router-dom';
import Countdown from '../../components/Countdown';

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { passwordOutcome, submitting, UpdatePassword } = useReset();
  const {email, token} = useLoaderData()
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await UpdatePassword(confirmPassword, password, token)
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 py-24 px-8 bg-gradient-to-b from-gray-100 to-white">
      
      <h1 className='font-semibold text-2xl px-0 md:flex md:justify-center  text-blue'>Reset Password</h1>
        {email && (
          <p className='flex justify-center text-base font-medium text-gray-900'>{email}</p>
        )}
        {passwordOutcome && (
          <p className='flex justify-center text-lg font-medium text-gray-900'>{passwordOutcome}</p>
        )}
      <form onSubmit={handleSubmit} className={`py-4 md:flex-col justify-center md:gap-4 md:px-24 ${passwordOutcome ? "hidden" : "flex"} ${email ? "hidden" : "flex"}`}>
        <label 
          className="input input-bordered flex items-center gap-2 mb-2 text-base"
        >
          <MdEmail className='text-2xl md:text-3xl text-blue'/>
          <input 
            type="password" 
            id="NewPassword" 
            name="NewPassword" 
            required  
            className="grow input-blue rounded-lg gap-2 shadows-sm border-b border-blue md:pr-24 md:text-lg font-medium" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword( e.target.value )}
          />
        </label>
        <label 
          className="input input-bordered flex items-center gap-2 mb-2 text-base"
        >
          <MdEmail className='text-2xl md:text-3xl text-blue'/>
          <input 
            type="password" 
            id="confirmNewPassword" 
            name="confirmNewPassword" 
            required  
            className="grow input-blue rounded-lg gap-2 shadows-sm border-b border-blue md:pr-24 md:text-lg font-medium" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword( e.target.value )}
          />
        </label>

        <div className="">
          <button type="submit" 
          className="rounded-lg text-white text-lg font-semibold border bg-blue w-full md:px-4 py-1"
          disabled={submitting}
          >
          {submitting ? "reset ..." : "reset"}
          </button>
        </div>
      </form>
      {passwordOutcome && (
        <>
          <Countdown />
        </>
      )}
      
    </div>
  )
}

export default NewPassword