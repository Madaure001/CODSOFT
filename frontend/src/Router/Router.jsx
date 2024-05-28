import { createBrowserRouter,  } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import SignUp from "../Pages/signup/SignUp";
import CreateJob from "../Pages/recruiter/CreateJob";
import EditJob from "../Pages/recruiter/EditJob";
import ApplyJob from "../Pages/ApplyJob";
import JobInfo from "../Pages/ViewJob";
import Dashboard from "../Pages/recruiter/Dashboard";
import UserDashboard from "../Pages/UserDashboard";
import Loader from "../Pages/Loader";
import LoginPage from "../Pages/login/LoginPage";
import PasswordReset from "../Pages/login/reset";
import NewPassword from "../Pages/login/NewPassword";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/', element:  <Home />},
      { path: '/login', element:  <LoginPage />}, 
      { path: "/reset", element: <PasswordReset />},
      { path: '/signup', element:  <SignUp />},
      { path: '/loader', element:  <Loader />},      
      { path: `/jobs/create`, element:  <CreateJob />},
      { path: `/jobs/job/:id/edit`, element:  <EditJob />},
      { path: '/jobs/job/:id', element:  <JobInfo />},
      { path: '/jobs/job/:id/apply', element:  <ApplyJob />},
      { path: `/recruiter/dashboard`,  element: <Dashboard />,},
      { path: "/applicant/dashboard", element: <UserDashboard />},
      { 
        path: "/reset/:token", element: <NewPassword />,
        loader: ({params}) => fetch(`https://codsoft-fmke.onrender.com/auth/reset/${params.token}`)
      },
    ],
    
  },
]);
export default router;