import React, { useState } from "react"
import CreatableSelect from 'react-select/creatable';
import { useForm, useFieldArray, Controller } from "react-hook-form"; 
import { SlMinus } from "react-icons/sl";
import { EazyUser } from "../lib/isAuth";

const Form = ({type, selectedOption, onSubmit, submitting, setSelectedOption, job}) => {  
  
  const {
    jobTitle,
    deadline,
    minSalary,
    maxSalary,
    jobPostingDate,
    jobLocation,
    salaryType,
    employmentType,
    experienceLevel,
    description,
    maxApplicants,
    skills,
    companyLogo,
    jobBenefits,
    referenceNumber,
    keyResAreas,
    jobReqs 
  } = job;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    defaultValues: {
      fieldsKeyResAreas: keyResAreas,
      fieldsJobReqs: jobReqs,
      fieldsBenefits: jobBenefits
    }
  }) 
  
  // we add dynamic inputs 
  const {
    fields: fieldsKeyResAreas, 
    append: appendKeyResAreas, 
    remove: removeKeyResAreas
  } = useFieldArray({control, name:  "keyRespAreas"})

  const { 
    fields: fieldsJobReqs,
    remove: removeJobReqs, 
    append: appendJobReqs 
  } = useFieldArray({ control, name: "jobReqs" });

  const { 
    fields: fieldsBenefits,
    remove: removeBenefits, 
    append: appendBenefits 
  } = useFieldArray({ control, name: "jobBenefits" });
  
  const options = [
    {value: "Javascript", label: "Javascript"},
    {value: "HTML", label: "HTML"},
    {value: "CSS", label: "CSS"},
    {value: "C++", label: "C++"},
    {value: "MongoDb", label: "MongoDb"},
    {value: "MySQL", label: "MySQL"}
  ]
  
  return (
    <div className="max-w-screen-2xl container mx-auto lg:px-24 px-8 bg-gradient-to-b 
      from-gray-100 to-white">
      {/* posting form */}
      <div className="bg-gradient-to-r from-gray-100 to-white lg:px-32 pt-16 rounded-lg">
        <h1 className=" flex j text-gray-600 font-semibold text-2xl pb-3">
          {type} A Job
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label  className="block mb-1 text-base ">Job Title</label>
              <input type="text" placeholder={"Web Developer"}
                {...register("jobTitle", { required: true })} 
                className="create-job-input" 
                defaultValue={jobTitle}               
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </div>
            <div className="lg:w-1/2 w-full">
              <label  className="block mb-1 text-base ">Deadline</label>
              <input type="date" placeholder={"e.g Google"}
                {...register("deadline" , { required: true })} 
                className="create-job-input"
                defaultValue={deadline}
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label  className="block mb-1 text-base ">Minimum Salary:</label>
              <input type="text" placeholder="$55k"
                {...register("minSalary" , { required: true })}
                className="create-job-input"
                defaultValue={minSalary}
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </div>
            <div className="lg:w-1/2 w-full">
              <label  className="block mb-1 text-base ">Maximum Salary:</label>
              <input type="text" placeholder="$80k"
                {...register("maxSalary" , { required: true })}
                className="create-job-input"
                defaultValue={maxSalary}
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label  className="block mb-1 text-base ">Salary Type:</label>
              {/* select options */}
              <select 
                className="create-job-input"
                {...register("salaryType" , { required: true })}
                defaultValue={salaryType}                 
              >
                <option value="">select salary type</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              {errors.exampleRequired && <span>This field is required</span>}
            </div>
            <div className="lg:w-1/2 w-full">
              <label  className="block mb-1 text-base ">Job Location:</label>
              <input type="text" placeholder="e.g New York"
                {...register("jobLocation" , { required: true })}
                className="create-job-input"
                defaultValue={jobLocation}                
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </div>
          </div>

           {/* 4th row */}
          <div className="create-job-flex">
                          
              <div className="lg:w-1/2 w-full">
                <label  className="block mb-1 text-base ">Job Posting Date:</label>
                <input type="date" placeholder="e.g Today"
                  {...register("jobPostingDate" , { required: true })}
                  className="create-job-input"
                  defaultValue={jobPostingDate} 
                />
                {errors.exampleRequired && <span>This field is required</span>}
              </div>
              {/* select options */}
              <div className="lg:w-1/2 w-full">
                <label  className="block mb-1 text-base ">Experience Level:</label>
                <select 
                  className="create-job-input"
                  {...register("experienceLevel" , { required: true })}
                  defaultValue={experienceLevel}
                >
                  <option value="">select experience level</option>
                  <option value="Internship">Internship</option>
                  <option value="Junior">Junior</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Senior">Senior</option>
                </select>
                {errors.exampleRequired && <span>This field is required</span>}
            </div>            
          </div>

          {/* 5th row */}
          <div className="create-job-flex">
                          
              <div className="lg:w-1/2 w-full">
                <label  className="block mb-1 text-base ">Max Applications</label>
                <input type="number" placeholder="200"
                  {...register("maxApplicants" , { required: true })}
                  className="create-job-input"
                  defaultValue={maxApplicants}
                />
                {errors.exampleRequired && <span>This field is required</span>}
              </div>
              {/* select options */}
              <div className="lg:w-1/2 w-full">
                <label  className="block mb-1 text-base ">Employment Type:</label>
                <select 
                  className="create-job-input"
                  {...register("employmentType" , { required: true })}
                  defaultValue={employmentType}
                >
                  <option value={employmentType}>{employmentType}</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                </select>
                {errors.exampleRequired && <span>This field is required</span>}
            </div>            
          </div>

          {/* 6th row */}
          
          {/* 7th row select options */}
          <div className="w-full">
            <label  className="block mb-1 text-base ">Set Required Skills:</label>
            <CreatableSelect
              defaultValue={skills}
              options={options}
              isMulti 
              setSelectedOption={(option) => option.value}
              className="create-job-input border-none "
              
            />
          </div>
            
          {/* 8th row */}
          <div className="create-job-flex">
            <div className=" w-full">
              <label  className="block mb-1 text-base ">Reference Number</label>
              <input type="text" placeholder={"job reference"}
                {...register("referenceNumber", { required: true })} 
                className="create-job-input"  
                defaultValue={referenceNumber}              
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </div>            
          </div>

          {/* 9th row */}
          <div>
            <label  className="block mb-1 text-base ">Job Description:</label>
            <textarea 
              name="description" 
              id="description" 
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              cols="30" 
              rows="6"
              {...register("description" , { required: true })}
              className="create-job-input"
              defaultValue={description}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          {/* 10th row */}          
          <div className=" w-11/12">
            <label  className="block mb-1 text-base ">Key Performance Areas:</label>            
            {fieldsKeyResAreas?.map((field, index) => {
               return (
                <div key={field.id} className="flex gap-2">                  
                  <Controller
                    render={({ field }) => <input {...field} placeholder="responsibilities" className="create-job-input"/>}
                    name={`keyResAreas.${index}`}
                    control={control}
                  />
                  <button className="text-white bg-red-500 px-4 py-1 mb-1 gap-2 rounded-md text-base" type="button" onClick={() => removeKeyResAreas(index)}>
                    <SlMinus />
                  </button>
                  
                </div>
              )})
            }
            <button className="text-white bg-blue/80 px-4 py-2 rounded-md text-base" type="button" onClick={() => appendKeyResAreas({})}>
              Add More Responsibilities 
            </button>
          </div>

          <div className=" w-full">
            <label  className="block mb-1 text-base ">Job Requirements:</label>
            {fieldsJobReqs?.map((field, index) => {
               return (
                <div key={field.id} className="flex gap-2">                  
                  <Controller
                    render={({ field }) => <input {...field}  className="create-job-input"/>}
                    name={`jobReqs.${index}`}
                    control={control}
                  />
                  <button className="text-white bg-red-500 px-4 py-1 mb-1 gap-2 rounded-md text-base" type="button" onClick={() => removeJobReqs(index)}>
                    <SlMinus />
                  </button>
                  
                </div>
              )})
            }
            <button className="text-white bg-blue/80 px-4 py-2 rounded-md text-base" type="button" onClick={() => appendJobReqs({})}>
                  Add More Requirements 
                  </button>
          </div>

          {/* 10th row */}          
          <div className=" w-11/12">
            <label  className="block mb-1 text-base ">Benefits</label>            
            {fieldsBenefits?.map((field, index) => {
               return (
                <div key={field.id} className="flex gap-2">                  
                  <Controller
                    render={({ field }) => <input {...field} placeholder="responsibilities" className="create-job-input"/>}
                    name={`jobBenefits.${index}`}
                    control={control}
                  />
                  <button className="text-white bg-red-500 px-4 py-1 mb-1 gap-2 rounded-md text-base" type="button" onClick={() => removeBenefits(index)}>
                    <SlMinus />
                  </button>
                  
                </div>
              )})
            }
            <button className="text-white bg-blue/80 px-4 py-2 rounded-md text-base" type="button" onClick={() => appendBenefits({})}>
              Add More Benefits 
            </button>
          </div>          
          <div className="flex py-2 gap-4  ">
            <a rel="stylesheet" href="/recruiter/dashboard" className="text-red-500 border-2 border-red-500
            rounded-lg py-1 lg:py-2 px-3 lg:px-5 " >
              Cancel
            </a>

            <button 
              className="py-1 lg:py-2 px-3 lg:px-5  rounded-md bg-blue hover:bg-blue/50
              text-white"
              type="submit"
              disabled={submitting}
            >
              {submitting ?  `${type} ...` : type}
            </button>
          </div>      
        </form>
      </div>
    </div>
  )
}

export default Form