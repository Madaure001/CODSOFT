import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import useReset from '../../hook/useReset';

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const { resetOutcome, submitting, resetPassword } = useReset();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email)
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 py-24 px-8 bg-gradient-to-b from-gray-100 to-white">
        <h1 className='font-semibold text-2xl px-0 md:flex md:justify-center  text-blue'>Reset Password</h1>
        {resetOutcome && (
          <p className='flex justify-center text-lg font-medium text-gray-900'>{resetOutcome}</p>
        )}
        <form onSubmit={handleSubmit} className={`py-4 md:flex justify-center md:gap-4 ${resetOutcome ? "hidden" : "flex"}`}>
            <label 
                  className="input input-bordered flex items-center gap-2 mb-2 text-base"
                >
                  <MdEmail className='text-2xl md:text-3xl text-blue'/>
                  <input 
                    type="email" 
                    id="resetEmail" 
                    name="emailReset" 
                    required  
                    className="grow input-blue rounded-lg gap-2 shadows-sm border-b border-blue md:pr-24 md:text-lg font-medium" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail( e.target.value )}
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
    </div>
  )
}

export default PasswordReset