import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import useLogin from "../../hook/useLogin";
import { SetPopupContext } from "../../App"; 
import isAuth, { EazyUser, userType } from "../../lib/isAuth";

const initialState = {
  email: "",
  password: ""
}
const LoginPage = () => {
  
  //const [popup, setPopup] = useContext(SetPopupContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");  

  const { submitting, login, loggedIn } = useLogin();

  useEffect(() => {
    isAuth() ? (
      navigate(`/${userType()}/dashboard`)
    ) : ""
  }, [userType()]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    await login(password, username)
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 sm:px-8 bg-gradient-to-b 
      from-gray-100 to-white py-16 flex flex-col justify-center items-center content-center "
    >
      <div className=" bg-gray-200 shadow-md flex flex-col justify-center items-center 
        content-center  px-4 rounded-lg backdrop-filter md:backdrop-blur-sm 
        bg-opacity-50 "
      >
        <div className=" w-full sm:w-[375px] h-full md:h-[350px] gap-2 p-4 flex flex-col 
          justify-center content-center " 
        >
          <h2 className="font-semibold text-lg px-8 md:px-16">Login To Account</h2>

          <form onSubmit={handleSubmit} className="p-1">
            
            <label 
              className="input input-bordered flex items-center gap-2 mb-2"
            >
              <FaUser />
              <input 
                type="text" 
                id="username" 
                name="username" 
                required  
                className="grow input-blue rounded-lg gap-2 shadows-sm" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername( e.target.value )}
              />
            </label>
            <label             
              className="input input-bordered flex items-center gap-2 mb-2"
            >
              <RiLockPasswordFill />
              <input 
                type="password"
                id="current-password"
                name="password"
                required
                className="grow input-blue rounded-lg gap-2 shadows-sm" 
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword( e.target.value )}
              />
            </label>
            
            <div className="flex text-sm md:text-base font-medium justify-between">
                  <a href="/resetpassword" className=" text-blue hover:underline dark:text-blue">Forgot Password?</a>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" type="checkbox" value="" className="w-4 h-4 border-2 border-blue rounded bg-gray-50 focus:ring-3 focus:ring-blue " />
                    </div>
                    <label htmlFor="remember" className="ms-2   text-gray-400 dark:text-gray-300">Remember me</label>
                  </div>
                  
                </div>
                
                <div className="mb-2">
                  <button type="submit" 
                    className="rounded-md text-white text-base font-semibold mt-2 border bg-blue w-full"
                    disabled={submitting}
                  >
                    {submitting ? "Loggin ..." : "Login"}
                  </button>
                </div>
                <div className="flex text-sm md:text-base">
                  <p>
                      <span className="gap-2 my-3">
                        Not Yet Registered?
                      
                        <Link
                          to={"/signup"}
                          className=" text-gray-400 font-semibold hover:underline hover:text-blue/50 pl-2"
                          href="#"
                          onClick={() => setShowModal(false)}
                        >
                          Create account
                        </Link>
                    </span>
                  </p>
                </div>
          </form>
        </div>
    </div>
    </div>
  )
}

export default LoginPage;