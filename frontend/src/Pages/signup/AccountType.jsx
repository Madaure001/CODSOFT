import { useState } from "react";
import { FaBuildingColumns, FaLocationPin, FaPhone, FaUser } from "react-icons/fa6";
import CreatableSelect from 'react-select/creatable';

const options = [
    {value: "Javascript", label: "Javascript"},
    {value: "HTML", label: "HTML"},
    {value: "CSS", label: "CSS"},
    {value: "C++", label: "C++"},
    {value: "MongoDb", label: "MongoDb"},
    {value: "MySQL", label: "MySQL"}
]

const AccountType = ({
    onCheckboxChange, 
    inputs, 
    setInputs,
    filelogo,
    setFileLogo,
    fileProfile,
    setFileProfile,
    fileResume,
    setFileResume}) => {
	const [selectedOption, setSelectedOption] = useState([null]);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadTo, setUploadTo] = useState("");

  
    const handleUpload = () => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        try {
        fetch(`http://localhost:8000/upload/${uploadTo}`, {
            method: "POST",    
            headers: {
            "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
            setUploadPercentage(
                parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
            );
            },
        })
        .then((response) => {
            console.log(response.data);
            handleInput(identifier, response.data.url);
        })
        } catch (error) {
        console.log(error.response);
        }
    };
    
	return (
		<div className="w-full">
			<div className='form-control gap-4'>
				<label className={`label gap-2 cursor-pointer ${inputs.type === "recruiter" ? "selected" : ""}`}>
					
					<input 
						type='checkbox' 
						className='checkbox border-slate-900 peer' 
						checked={inputs.type === "recruiter"}
						onChange={() => onCheckboxChange("recruiter")}
					/>
					<span className='label-text text-blue gap-2 px-2 font-semibold'>Recruiter</span>
					<div className=" hidden peer-checked:block peer-checked:form_grow">
						{/* 1st row */}
                        <div className="create-job-flex">
                            <div className="lg:w-1/2 w-full">
                                <label  className=" input input-bordered create-acc-input">
                                    <FaBuildingColumns />
                                    <input 
                                        type="text" 
                                        id="conpanyNameInput"
                                        value={inputs.fullName}
                                        onChange={(e)=>setInputs({...inputs, fullName: e.target.value})}
                                        placeholder="Please enter your first company name."
                                        className="create-job-input"              
                                    />
                                </label>
                            </div>
                            <div className="lg:w-1/2 w-full">
                                <label id="location" className="input input-bordered create-acc-input ">
                                    <FaLocationPin />
                                    <input 
                                        type="text" 
                                        id="locationInput"
                                        name="locationInput"
                                        placeholder='Company location to be used as default location'
                                        value={inputs.location}                            
                                        onChange={(e)=>setInputs({...inputs, location: e.target.value})}
                                        className="create-job-input"              
                                    />
                                </label>
                            </div>             
                        </div>
                        {/* 2nd row */}                        
                        <div className="create-job-flex">
                            <div className=" w-full lg:w-1/2">
                                <label id="logo" className="input input-bordered create-acc-input ">
                                    Logo           
                                    <input 
                                        id="logoInput"
                                        type="file"
                                        accept="image/*"
                                        name="upload"
                                        identifier={"profile"}
                                        className="create-job-upload"
                                        onChange={(e)=>setInputs({...inputs, profile:e.target.files[0]})}
                                        placeholder="company logo"
                                    />
                                    
                                </label>                                    
                            </div>                    
                            <div className="lg:w-1/2 w-full">
                                <label id="username" className="input input-bordered create-acc-input">
                                    Type
                                    <input 
                                        type="text" 
                                        id="usernameInput"
                                        value={inputs.type}
                                        className="create-job-input"
                                        disabled
                                    />
                                </label>
                            </div>
                        </div>
                        {/* 4th row */}
                        <div>
                            <label id="aboutCompany" className="block mb-2 text-lg">Recruiter Profile
                                <textarea 
                                name="aboutCompany" 
                                id="aboutCompany" 
                                placeholder="This is your company description. What you want prospective seekers to know about your compnay."
                                cols="15" 
                                rows="6"
                                required={true}
                                value={inputs.about}
                                onChange={(e)=>setInputs({...inputs, about: e.target.value})}
                                className="create-job-input"
                                />
                                
                            </label>
                        </div>
					</div>
				</label>
			
				<label className={`label gap-2 cursor-pointer ${inputs.type === "applicant" ? "selected" : ""}`}>
					<span className='label-text text-blue gap-2 px-2 font-semibold'>Applicant</span>
					<input
						 
						type='checkbox' 
						className='checkbox  border-slate-900  peer' 
						checked={inputs.type === "applicant"}
						onChange={() => onCheckboxChange("applicant")}
					/>
					<div className="hidden peer-checked:block peer-checked:form_grow">
						{/* 1st row */}
                        <div className="create-job-flex">
                            <div className="lg:w-1/2 w-full">
                                <label id="applicant" className=" input input-bordered create-acc-input">
                                    <FaUser />
                                    <input 
                                        type="text" 
                                        id="applicantNameInput"
                                        value={inputs.fullName}
                                        onChange={(e)=>setInputs({...inputs, fullName: e.target.value})}
                                        placeholder="Please enter your full name."
                                        className="create-job-input"              
                                    />
                                </label>
                            </div>
                            <div className="lg:w-1/2 w-full">
                                <label id="phoneNumber" className="input input-bordered create-acc-input ">
                                    <FaPhone />
                                    <input 
                                        type="tel" 
                                        id="cellphoneInput"
                                        value={inputs.phoneNumber}                            
                                        onChange={(e)=>setInputs({...inputs, phoneNumber: e.target.value})}
                                        className="create-job-input"              
                                    />
                                </label>
                            </div>             
                        </div>
                        {/* 2nd row */}                        
                        <div className="create-job-flex">
                            <div className=" w-full lg:w-1/2">
                                <label id="profile" className="input input-bordered create-acc-input ">
                                    image           
                                    <input 
                                        id="profile"
                                        type="file" 
                                        name="upload"
                                        accept="image/*"
                                        className="create-job-upload"
                                        onChange={(e)=>setInputs({...inputs, profile:e.target.files[0]})}
                                        placeholder="company logo"
                                    />
                                </label>                                    
                            </div>                    
                            
                        </div>
                        {/* 3rd row */}
                        <div className="create-job-flex">
                            <div className="lg:w-1/2 w-full">
                                <label id='equitySignup' 
                                    className="input input-bordered create-acc-input md:pr-0"
                                >
                                    Equity
                                    {/* select options */}
                                    <select 
                                        className="create-job-input"
                                        onChange={(e)=>setInputs({...inputs, equity: e.target.value})}
                                    >
                                        <option value="African">African</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Caucasian">Caucasian</option>
                                        <option value="Indian">Indian</option>
                                    </select>
                                </label>
                            </div> 
                            <div className="lg:w-1/2 w-full">
                                <label  
                                    className="input input-bordered create-acc-input"
                                    id='nationality'
                                >
                                    Nationality
                                    <input type="text" placeholder="e.g Canada"
                                        value={inputs.nationality}
                                        onChange={(e) => setInputs({...inputs, nationality: e.target.value})}
                                        className="create-job-input"
                                    />
                                </label>
                            </div>               
                        </div>
                        {/* 4th row */}
                        <div>
                            <label id="aboutApplicant" className="block mb-2 text-lg">About Me
                                <textarea 
                                name="aboutApplicant" 
                                id="aboutApplicant" 
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                cols="15" 
                                rows="6"
                                required={true}
                                value={inputs.about}
                                onChange={(e)=>setInputs({...inputs, about: e.target.value})}
                                className="create-job-input"
                                />
                                
                            </label>
                        </div>
                        
                        {/* submit to create account */}
					</div>
				</label>
				
			</div>
		</div>
	);
};
export default AccountType;