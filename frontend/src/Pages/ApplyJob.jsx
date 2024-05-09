import { useEffect, useState } from "react";
import isAuth, { displayPic, EazyUser, resumeFile, Token, userType } from "../lib/isAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import axios from "axios";

const ApplyJob = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [job, setJob] = useState();
  const navigate = useNavigate()
  const [file, setFile] = useState();
  const [inputs, setInputs] = useState({
    noticeperiod: "",
    employmentStatus: "",
    coverLetter: ""
  })
  const token = Token()
  const type = "Apply";
  const {id} = useParams()

    //get job details
  const getJobDetails = async () => {
      await fetch(`http://localhost:8000/api/jobs/job/${id}`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
      })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setJob(data)
      })
      .catch(err => console.log(err))
    }

  useEffect(() => {
    
    isAuth() ? (
      userType() === "recruiter"? (
        navigate("/")
      ):("")
    ) : navigate("/")
    getJobDetails()
  }, [isAuth()])

  //using the form hook
  const onSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true)
    
    await fetch(`http://localhost:8000/api/jobs/job/${id}/apply`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify(inputs)
    }).then((res) => res.json())
    .then((result) => {
      
      if(result._id  ) {
        alert("Job application successfull!")
        navigate("/applicant/dashboard");
      }
       
      
    })
    .catch(err => console.log(err));
    setSubmitting(false)
  };

  //demonstartion of ability to use dependencies
  const resumeUpload = async (e) => {

    e.preventDefault();
      const formData = new FormData();
      formData.append("resume", file)
      console.log(file)
      const res = await axios.post(`http://localhost:8000/upload/resume`, formData, {
      headers: { "Content-Type": "multipart/form-data"},
			});
			console.log(res.data)
			const resumeData = await res.data
			if (resumeData.error) {
				throw new Error(resumeData.error);
			}
			//console.log(imageData) 
			console.log(resumeData)
			localStorage.setItem("EazilyHired-userResume", JSON.stringify(resumeData));
  }

  return (
    <>
      {job &&
          <div className="max-w-screen-2xl container mx-auto lg:px-24 px-8 bg-gradient-to-b 
            from-gray-100 to-white">
          {/* posting form */}
          <div className="bg-gradient-to-r from-gray-100 to-white lg:px-24 p-4 pt-16 rounded-lg">
              <h1 className=" flex text-gray-600 font-semibold text-2xl pb-3">
                {job?.jobTitle} Application
              </h1>
              <form onSubmit={onSubmit}>
                <div className="relative flex items-center content-center gap-2 py-4 px-2 max-w-full  ">

                  <Link 
                    className="text-gray-700 font-semibold px-2 bg-gray-50 rounded-md flex"
                    target="_blank"
                    to={`http://localhost:8000/profileUploads/${resumeFile().resumeName}`}
                  >
                    <AiOutlineFilePdf  className="content-center text-xl"/>
                    {resumeFile().originalName}
                  </Link>
                  <input    
                    type="file"
                    name="resume"    
                    id="resume"    
                    accept="application/pdf"
                    onChange={e => setFile(e.target.files[0])}
                    className="bg-white text-gray-700 active:bg-indigo-600 text-xs font-bold uppercase px-2 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                  />
                  <button 
                    onClick={resumeUpload}
                    className=" block px-2 py-1 border focus:outline-none bg-blue text-sm
                    rounded-lg text-white cursor-pointer font-semibold"
                  >Upload</button>  
                </div>
                {/* 1st row */}
                <div className="create-job-flex">
                  <div className="lg:w-1/2 w-full">
                    <label  className="block mb-2 ">Reference Number </label>
                    <input type="text" 
                      
                      className="create-job-input" 
                      disabled
                      defaultValue={job?.referenceNumber}               
                    />
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <label  className="block mb-2 ">Applicant ID</label>
                    <input type="email" 
                       
                      className="create-job-input" disabled 
                      defaultValue={EazyUser()?._id}         
                    />
                  </div>
                </div>
                {/* 1st row */}
                <div className="create-job-flex">
                  <div className="lg:w-1/2 w-full">
                    <label  className="block mb-2 ">Full Names </label>
                    <input type="text" 
                      
                      className="create-job-input" 
                      defaultValue={EazyUser()?.fullName}               
                    />
                    
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <label  className="block mb-2 ">Email</label>
                    <input type="email" 
                      
                      className="create-job-input" disabled 
                      defaultValue={EazyUser()?.email}         
                    />
                    
                  </div>
                </div>
                {/* 4th row */}
                <div className="create-job-flex">
                                
                    {/* select options */}
                    <div className="lg:w-1/2 w-full">
                      <label  className="block mb-2 ">Employment Status</label>
                      <select 
                        className="create-job-input"
                         onChange={e => setInputs({...inputs, employmentStatus: e.target.value})}                
                      >
                        <option value="">Unemployed</option>
                        <option value="self-employed">Self Employed</option>
                        <option value="employed">Employed</option>
                        <option value="contract">Contractor</option>
                      </select>
                      
                  </div> 
                  <div className="lg:w-1/2 w-full">
                      <label  className="block mb-2 ">Notice Period</label>
                      <select 
                        className="create-job-input"
                        onChange={e => setInputs({...inputs, noticePeriod: e.target.value})}         
                      >
                        <option value="">Available Emmidiately</option>
                        <option value="sevenDays">One Weeek</option>
                        <option value="fourteenDays">Two Weeks</option>
                        <option value="month">Month</option>
                      </select>
                      
                  </div>           
                </div>
                {/* 7th row */}
                <div>
                  <label  className="block mb-2 ">Cover Letter:</label>
                  <textarea 
                    name="description" 
                    id="description" 
                    defaultValue={EazyUser()?.about}
                    onChange={e => setInputs({...inputs, coverLetter: e.target.value})}
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    cols="30" 
                    rows="6"
                    className="create-job-input"
                  />
                  
                </div>

                
                <p>By submitting your personal data and application you hereby confirm:</p>
                <ul  className="list-disc px-4 py-2 text-gray-600 text-sm">
                  <li>
                    That you have read and understood our Privacy Policy. Please view T & Cs, <a className="text-blue cursor-pointer">here</a> 
                  </li>
                  <li>
                    That you have no objection to us retaining your personal information in our database for future employment opportunities that might arise.
                  </li>
                  <li>
                    That the information you have provided to us is true, correct and up to date.
                  </li>
                </ul>
                <div className="flex gap-4">
                  <p className="text-sm">I have read and accept the Terms and Conditions </p>
                  <input type="checkbox" />
                </div>
                <div className="flex py-2 gap-4  ">
                  <a rel="stylesheet" href={`/jobs/job/${job?._id}`} className="text-red-500 border-2 border-red-500
                  rounded-lg py-1 lg:py-2 px-3 lg:px-5 " >
                    Cancel
                  </a>

                  <button 
                    className="py-1 lg:py-2 px-3 lg:px-5  rounded-md bg-blue hover:bg-blue/50
                    text-white"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? `${type}...` : type}
                  </button>
                </div>      
              </form>
            </div>
          </div>
      }
    </>
  )
}

export default ApplyJob


