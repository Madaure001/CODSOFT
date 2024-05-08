
import React, { Suspense, useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Form from "../../components/FormInput";
import { Token } from "../../lib/isAuth";

const EditJob = () => {
  const {id} = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);    
  const token = Token()
  const navigate = useNavigate();

    const [job, setJob] = useState({});

  useEffect(() => {
    
    const getJobDetails = async () => {
      const response = await fetch(`https://codsoft-fmke.onrender.com/api/jobs/job/${id}`,{
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type':'application/json'
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setJob(data)
        console.log(job)
        setIsLoading(false)
      })        
    }
    if(id) getJobDetails();
  }, [id])
    
    
  const onSubmit = async (data) => {

    data.skills = selectedOption;
    console.log(data)
    setSubmitting(true)
    try {
      await fetch(`https://codsoft-fmke.onrender.com/api/jobs/job/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((result) => {

        console.log(result);
        if(result.acknowledge === true ) {
          alert("Job Edited successfully!")
          navigate("/recruite/dashboard")
        }
        
      });
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
      job={job}
      type="Edit"
    />
  )
}
export default EditJob;
