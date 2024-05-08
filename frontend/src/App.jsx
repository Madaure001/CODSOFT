import { Outlet } from "react-router-dom"
import "./index.css"
import NavBar from "./components/NavBar"
import { Toaster } from "react-hot-toast"
import { createContext, useState } from "react";
import { EazyUser, Token } from "./lib/isAuth";

export const SetPopupContext = createContext();



const App = () => {
  //const [token, setToken] = useState(Token());
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <div className="bg-white">
      
      <NavBar />
      <Outlet />
      <Toaster />
    </div >
  )
}

export default App
