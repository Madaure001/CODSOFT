import React, { useEffect, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { NavLink, Link, useNavigate } from "react-router-dom";
import isAuth, { displayPic, Token, userType } from "../lib/isAuth";
import useLogout from "../hook/useLogout";

const recruiterItems = [
    
    {path: "/recruiter/dashboard", title: "My jobs"},    
    {path: "/jobs/create", title: "Post Job"},
]
const userItems = [
    {path: "/applicant/dashboard", title: "My jobs "},
]
const nonUsers = [
    {path: "/login", title: "My jobs"},
]

const NavBar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [image, setImage ] = useState()
    const token = Token()
    const handleMenuToggler = ( ) => {
        setIsMenuOpen(!isMenuOpen)
    }

    const {submitting, logout}=useLogout()
    const [NavItems, setNavItems] = useState(nonUsers)
    const navigate = useNavigate()

    useEffect(() => {
        
        isAuth() ? (
            userType() === "recruiter" ? (setNavItems(recruiterItems))
                : (setNavItems(userItems))
        ) : (NavItems)
    },  [isAuth()]);

  return (
    <header className="max-w-screen-2xl container mx-auto lg:px-24 px-4 bg-gray-100 ">
        <nav className="flex justify-between items-center py-6 z-10">
            {/* Logo and page Heading */}
            <Link to={"/"} className="flex items-center gap-2 text-xl md:text-2xl px-6 md:px-2 
            py-1 md:py-1 rounded-lg text-white logo-color shadows-lg font-bold cursor-pointer
            
            ">
                EazilyHired
            </Link>
            {/* Nav items large devices */}
            <div className="justify-between  hidden md:flex lg:gap-12 md:gap-4">                
                <ul className="hidden md:flex lg:gap-12 md:gap-4  content-center ">

                    
                            {NavItems.map(heading => (
                                <li key={heading.path} className="navItems ">
                                    <NavLink 
                                        to={heading.path}
                                        className={({isActive}) => isActive ? "active" : ""}
                                    >
                                        {heading.title}
                                    </NavLink>
                                </li>
                            ))}         
                </ul>                
                {isAuth() ? (
                    <>
                        <div className="text-base text-blue font-medium space-x-3 lg:space-x-5 
                            hidden md:flex"
                            >
                                <img src={`https://codsoft-fmke.onrender.com/profileUploads/${displayPic()}`} 
                                    alt="" 
                                    width={40}
                                    height={30}
                                    className="rounded-full gap-2"
                                />
                                <p to="/" className="py-2 px-3 lg:px-5  rounded-md 
                                    bg-blue hover:bg-blue/50 text-white cursor-pointer"
                                    onClick={logout}
                                    disabled={submitting}
                                >
                                    {submitting ? "Logging Out ..." : "Logout"}
                                </p>                                
                            </div>
                    </>
                ):(
                    <>
                        {/* signup and login buttoons */}
                        <div className="text-base text-blue font-medium space-x-2 lg:space-x-5 
                            hidden md:block "
                        >
                            <Link to="/login" className="py-1 lg:py-2 px-2 lg:px-5 border  border-blue 
                                rounded-md hover:bg-blue/50 hover:text-white">
                                Log in
                            </Link>
                            <Link to="/signup" className="py-1 lg:py-2 px-2 lg:px-5  rounded-md bg-blue 
                                hover:bg-blue/50 text-white"
                            >
                                Sign up
                            </Link>
                        </div>
                    </>
                )}                
            </div>
            {/* smaller devices icon*/}
            <div className="md:hidden flex gap-2">
                { isAuth() &&
                    <img 
                        src={`https://codsoft-fmke.onrender.com/profileUploads/${displayPic()}`} 
                        alt="profile" 
                        width={37}
                        height={37}
                        className="rounded-full"
                    />
                }
                <button onClick={handleMenuToggler}>
                    {
                        isMenuOpen ? <RxCross2 className="w-5 h-5 text-blue"/> 
                        : <RiMenu3Line className="w-5 h-5 text-blue"/>
                    }
                </button>
            </div>
        </nav>
        {/* small devices field*/}
        <div className={` md:hidden z-index-10 shadow-lg px-2 w-1/4 
            bg-gray-200 py-2 rounded-lg absolute right-0  flex flex-col gap-2 
            ${isMenuOpen ? "" : "hidden"} backdrop-filter backdrop-blur-lg bg-opacity-50`}
        >    
            {/* Nav items small devices */}
            <ul className=" justify-items-end ">
                {NavItems.map(heading => (
                    <li 
                        key={heading.path} 
                        className=" right-0 text-sm text-gray-700  
                            py-1 hover:text-blue/60">
                        <NavLink 
                            to={heading.path}
                            className={({isActive}) => isActive ? "active" : ""}
                        >
                            {heading.title}
                        </NavLink>
                    </li>
                ))}
                {/* Logout Button */}
                <li className={`text-blue hover:text-primary py-1 ${isAuth() ? "block"  :"hidden" }`}>
                    <Link to="#" onClick={logout}>LogOut</Link>
                </li>
                            
                {/* Login Button */}
                <li className={`text-blue hover:text-primary py-1 ${isAuth() ? "hidden" : "block"}`}>
                    <Link to="/login">LogIn</Link>
                </li>         
            </ul>
        </div>
    </header>
  )
}

export default NavBar