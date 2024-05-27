import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import useLogin from "../../hook/useLogin";
import { SetPopupContext } from "../../App"; 
import isAuth, { EazyUser, userType } from "../../lib/isAuth";
import { MdOutlineClose } from "react-icons/md";

const initialState = {
  email: "",
  password: ""
}
const SmallModalLogin = ({handleMenuToggler}) => {
  const [showMiniModal, setShowMiniModal, ] = useState(false)
  //const [popup, setPopup] = useContext(SetPopupContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");  

  const { submitting, modalLogin, loggedIn } = useLogin();

  useEffect(() => {
    isAuth() ? (
      navigate(`/${userType()}/dashboard`)
    ) : ""
  }, [userType()]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    await modalLogin(password, username)
  };

  return (
    <div className='justify-center items-center'>
      <button className=" flex md:hidden border-0 text-blue font-semibold hover:text-gray-500" onClick={() => setShowMiniModal(true)}>
        LogIn
      </button>            
      {/* !-- small screen Modal main --*/}
      <div id="sm-login-popup" tabindex="-1" 
        className={`bg-white/60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 z-50 min-h-[100vh] h-[100vh]]  ${showMiniModal ? "flex-grow w-screen md:hidden" : "hidden"}`}
      >
        <div className="absolute right-0 w-full p-4 max-w-md h-full">

          <div className="relative bg-white rounded-lg shadow">
            <button type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-blue rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close">
                <MdOutlineClose className='text-2xl font-semibold z-10' onClick={() => setShowMiniModal(false)}/>
              <span className="sr-only">Close popup</span>
            </button>
            <div className=" bg-gray-200 shadow-md flex flex-col justify-center items-center 
              content-center py-4 px-4 rounded-lg backdrop-filter md:backdrop-blur-sm 
              bg-opacity-50 "
            >
              <div className=" w-full  h-full md:h-[350px] gap-2 flex flex-col 
                justify-center content-center text-blue" 
              >
              <h2 className="font-semibold text-lg px-8">Login To Account</h2>

              <form onSubmit={handleSubmit} className="p-1 text-blue">
                
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
                <div className="flex text-base font-medium justify-between">
                  <a href="/resetpassword" className=" text-blue hover:underline dark:text-blue">Lost Password?</a>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" type="checkbox" value="" className="w-4 h-4 border-2 border-blue rounded bg-gray-50 focus:ring-3 focus:ring-blue " />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-gray-400 dark:text-gray-300">Remember me</label>
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
                <div className="flex">
                  <p>
                      <span className="gap-2 my-3">
                        Not Registered?
                      
                        <Link
                          to={"/signup"}
                          className="text-base font-semibold text-gray-400 hover:underline hover:text-blue/50 pl-2"
                          href="#"
                          onClick={() => {setShowMiniModal(false); handleMenuToggler()}  }
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
      </div>
      </div>
    </div>
    
  )
}

export default SmallModalLogin;