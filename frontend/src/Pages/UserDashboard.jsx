import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import isAuth, { EazyUser, resumeFile, Token, userType } from "../lib/isAuth";
import axios from "axios";
import { AiOutlineFilePdf } from "react-icons/ai";

const UserDashboard = () => {
    //const email = "you@you.com";
    const [userId, setUserId] = useState(EazyUser()._id);
    const {id} = useParams()
    const token = Token()
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [file, setFile] = useState();

    const onSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("resume", file)
        //console.log(file)
        const res = await axios.post(`https://codsoft-fmke.onrender.com/upload/resume`, formData, {
            headers: { "Content-Type": "multipart/form-data"},
        });
			//console.log(res.data)
        const resumeData = await res.data
        if (resumeData.error) {
            throw new Error(resumeData.error);
        }
        //console.log(resumeData)
        localStorage.setItem("EazilyHired-userResume", JSON.stringify(resumeData));
    }

    useEffect(() => {
        isAuth() ? (
            userType()  !== "recruiter" ? ("")
            :    navigate(`/`) )
        :  navigate("/login")

        //const token = EazyUser().token

        const getApplications = async () => {
            await fetch(`https://codsoft-fmke.onrender.com/api/jobs/${userId}/applications`,{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => res.json())
            .then((data) => {
                //console.log(data)
                setJobs(data)
                //console.log(jobs)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
        }

        getApplications();
    }, [isAuth(), searchText]);

    
    const handleSearchText = () => {
       const filter =jobs.filter((job) => job.jobTile.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) 

       setJobs(filter);
       setIsLoading(false);
    }

    const handleDelete = (job) => {
        //console.log(job)
        //verify user's decision to delete
        const hasConfirmed = confirm("Are you sure you want to delete this job?");

        if(hasConfirmed) {
            //after confirmation delete post
            try {
                fetch(`https://codsoft-fmke.onrender.com/api/jobs/application/${job?._id}/delete`,{
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type':'application/json'
                    },
                    //body: JSON.stringify(job)
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        alert("Job deleted successfully!")
                    }
                })                
            } catch (error) {
                console.log(error)
                alert("Job could not be deleted!")
            }
        }
        
    }
    
    return (
        <div className="max-w-screen-2xl container mx-auto lg:px-28 py-4 md:py-8">
            <div className="my-jobs-container mt-4">
                <div className="search-box px-6 text-center ">
                    <input 
                        name="search"
                        type="text"
                        id="search"
                        className="py-1 pl-4 border focus:outline-none lg:w-9/12 mb-4 w-full rounded-lg"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button 
                        onClick={handleSearchText}
                        className="bg-blue text-white font-semibold w-1/10 px-2 py-0 lg:px-4 lg:py-1 rounded-md">
                        search
                    </button>
                </div>
                
            </div>
            {/* My Jobs Table */}
            
            <section className="bg-blueGray-50">
                <div className="w-full lg:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <h1 className="font-semibold text-gray-500 text-left ">My Jobs</h1>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 py-2 border-0 bg-gray-200">
                            <div className="flex flex-wrap justify-between">
                                <div className="relative  px-2 max-w-full flex-grow flex-1 ">
                                  <Link to={"/jobs/myjobs"} className="bg-blue/45 text-white active:bg-indigo-600 text-xs font-bold uppercase px-2 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> Jobs</Link>
                                </div>
                                <div className="relative flex items-center content-center gap-2 px-2 max-w-full  ">

                                    <Link 
                                        className="text-gray-700 font-semibold px-2 bg-gray-50 rounded-md flex"
                                        target="_blank"
                                        to={`https://codsoft-fmke.onrender.com/profileUploads/${resumeFile()?.resumeName}`}
                                    >
                                        <AiOutlineFilePdf  className="content-center text-xl"/>
                                        Resume
                                    </Link>
                                    <input    
                                        type="file"
                                        name="resume"    
                                        id="resume"    
                                        accept="application/pdf"
                                        onChange={e => setFile(e.target.files[0])}
                                        className="bg-blue/45 text-white active:bg-indigo-600 text-xs font-bold uppercase px-2 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                                    />
                                    <button 
                                        onClick={onSubmit}
                                        className=" block px-2 py-1 border focus:outline-none bg-blue text-sm
                                        rounded-lg text-white cursor-pointer font-semibold"
                                    >Upload</button>  
                                </div>                                
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto bg-gray-50">
                            <table className="items-center bg-transparent w-full md:px-8 border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-4 bg-blueGray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className=" text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase    border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            TITLE
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase    border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            COMPANY
                                        </th>   
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase    border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            LOCATION
                                        </th>                                     
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        jobs?.map((job, index) => (                                
                                            <tr key={index}>
                                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {index + 1}
                                                </th>
                                                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                <Link to={`/jobs/job/${job?._id}`}>{job?.jobTitle}</Link>
                                                </td>
                                                <td className="border-t-0 px-4 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {job?.companyName}
                                                </td>
                                                <td className="border-t-0 px-4 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {job?.jobLocation}
                                                </td>
                                                <td className="border-t-0 px-4 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                <button onClick={() => handleDelete(job)} className="bg-red-500 px-4 text-white py-1 rounded-md">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>                        
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default UserDashboard;