import { useEffect, useState } from "react";
import isAuth, { displayPic, EazyUser, Token, userType } from "../../lib/isAuth";
import { useNavigate } from "react-router-dom";
import Form from "../../components/FormInput";

const CreateJob = () => {
  
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(Token())

  const [job, setJobs] = useState({
    userId: "",
    jobTitle: "",
    companyName: EazyUser().fullName,
    companyLogo: displayPic(),
    jobLocation: "",
    minSalary: "",
    maxSalary: "",
    jobBenefits: [],
    jobPostingDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16),
    maxApplications: 200,    
    salaryType: "",
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16),
    employmentType: "",
    experienceLevel: "",
    description: "",
    referenceNumber: "",
    KeyResAreas: [],
    jobReqs: [],
    MaxApplications: 0
  })
  const [selectedOption, setSelectedOption] = useState(job?.skillsets);
  
  useEffect(() => {

    isAuth() ? (
      userType() === "recruiter" ? (
        "" ): navigate("/signup")
    ) : navigate("/login")
    
  },[isAuth()])
  
  const onSubmit = async (data) => {
    //
    data.skillsets = selectedOption;

    setSubmitting(true)
    try {
      console.log(data)
      const res = await fetch(`http://localhost:8000/api/jobs/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)

      })
      console.log(res)
      const response = await res.json()

      if(!response) {
        alert("Could not post job!")
        
      }
      navigate("/recruiter/dashboard")
      alert("Job posted successfully")
      setSubmitting(false)
    } catch (error) {
      console.log(error);
    }
    
  }; 
  
  return (
    <Form 
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      submitting={submitting}
      onSubmit={onSubmit}
      type="Create"
      job={job}
    />
  )
}

export default CreateJob;