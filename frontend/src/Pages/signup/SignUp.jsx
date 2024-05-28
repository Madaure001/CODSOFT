import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import AccountType from "./AccountType";
import useSignup from "../../hook/useSignUp";
import isAuth, { EazyUser, userType } from "../../lib/isAuth";
import axios from "axios";
import Login from "../login/Login";


const SignUp = () => {
  
  const [inputs, setInputs] = useState({
    type: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    fullName: "",
    phoneNumber: "",
    about: "",
    equity: "",
    nationality: "",
    profile: "",
    location: ""
  });
  

  const handleCheckboxChange = (type) => {
		setInputs({ ...inputs, type });
	};
  const { setSubmitting, signup } = useSignup();
  const navigate = useNavigate();

  useEffect(() => {
    isAuth() ? (
      navigate(`/${userType()}/dashboard`)
    ) : ""
  }, [isAuth()]);


  const handleSubmit = async (e) => {

    e.preventDefault();
    await signup(inputs)
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 sm:px-8 bg-gradient-to-b 
      from-gray-100 to-white py-16 flex flex-col justify-center items-center content-center">
      <div className=" bg-gray-200 shadow-md flex flex-col justify-center items-center 
        content-center px-4 rounded-lg backdrop-filter md:backdrop-blur-lg bg-opacity-50 "
      >
      <div className=" w-full h-full  gap-2 p-4 overflow-hidden">
        <h2 className="font-semibold text-lg">Create an Account</h2>

        <form onSubmit={handleSubmit} className="p-1 text-base md:text-xl" >
          <div className="flex flex-col-reverse p-2">
            <AccountType 
              onCheckboxChange={handleCheckboxChange} 
              inputs={inputs} 
              setInputs={setInputs}
            />
          
            <div className="md:w-[375px]">
              <label id="emailSignup" className="input input-bordered flex items-center gap-2 mb-2">
                <MdEmail />
                <input 
                  type="email" 
                  className="grow input-blue rounded-lg gap-2 shadows-sm" 
                  placeholder="Email" 
                  value={inputs.email}
                  onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                />
              </label>
              <label id="usernameSignup" className="input input-bordered flex items-center gap-2 mb-2">
                <FaUser />
                <input 
                  type="text" 
                  className="grow input-blue rounded-lg gap-2 shadows-sm" 
                  placeholder="Username" 
                  value={inputs.username}
                  onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
              </label>
              <label id="psswordSignup" className="input input-bordered flex items-center gap-2 mb-2">
                <RiLockPasswordFill />
                <input 
                  type="password" 
                  className="grow input-blue rounded-lg gap-2 shadows-sm" 
                  placeholder="Enter Password"
                  suggested="new-password"
                  value={inputs.password}
                  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
              </label>
              <label id="confirmPassword" className="input input-bordered flex items-center gap-2 mb-2">
                <RiLockPasswordFill />
                <input 
                  type="password"
                  placeholder="Confirm Password" 
                  className="grow input-blue rounded-lg gap-2 shadows-sm" 
                  value={inputs.confirmPassword}
                  onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                />
              </label>
            </div>
          </div>
          
          <div className="flex">
            <p>
                <span className="gap-2 p-2">
                  Already have an account?
                
                  <Link
                    to={"/login"}
                    className="text-lg font-semibold text-blue hover:underline hover:text-blue/50 pl-2"
                    href="#"
                  >
                    Login
                  </Link>
              </span>
            </p>
          </div>
          <div className="py-1">
						<button 
              type="submit"  
              disabled={setSubmitting}
              className="rounded-lg text-white font-semibold mt-2 border bg-blue  py-1 w-full"
            >
              {setSubmitting ? "Signin Up ..." : "Sign Up"}            
						</button>
					</div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default SignUp