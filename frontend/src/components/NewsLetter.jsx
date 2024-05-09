import axios from "axios";
import { useState } from "react";
import { BsEnvelopePaper } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const NewsLetter = () => {
    const [file, setFile] = useState();
    const navigate = useNavigate()
    
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
        alert("Resume uploaded successfully!")
        setFile("")
        navigate("/login")
    }
  return (
    <div className="flex-col">
        <h3 className="pb-4 text-gray-300 font-semibold">Get Noticed</h3>
        <div className="bg-gray-100 shadow-md w-full p-2 rounded-[10px]">
            <h3 className="text-md mb-2 flex items-center gap-2 font-bold text-blue">
                <BsEnvelopePaper className=" text-black w-5 h-5"/>
                Email me for Jobs
            </h3>
            <p className="text-gray-500 text-base mb-4">
                eque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
            </p>
            <div className="w-full space-y-4 ">
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="name@mail.com" 
                    className="w-full block py-2 pl-3 border focus:outline-none rounded-lg" 
                />
                <input 
                    type="submit" 
                    value={"Subscribe"}  
                    placeholder="name@mail.com" 
                    className="w-full block py-2 pl-3 border focus:outline-none bg-blue 
                    rounded-lg text-white cursor-pointer font-semibold" 
                />
            </div>            
        </div>

        {/* part 2 */}
        <div className="bg-gray-100 shadow-md w-full p-2 rounded-[10px] mt-4">
            <h3 className="text-md mb-2 flex items-center gap-2 font-bold text-blue">
                <IoRocketOutline  className=" w-5 h-5 text-black"/>
                Easy Apply
            </h3>
            <p className="text-gray-500 text-base mb-4">
                eque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
            </p>
            <div className="w-full space-y-1 text-xs">
                <input 
                    type="file"
                    name="resume"
                    id="resume"
                    accept="application/pdf"
                    onChange={e => setFile(e.target.files[0])}
                    className="w-full block py-1 pl-1 border focus:outline-none bg-blue 
                    rounded-lg text-white cursor-pointer font-semibold" 
                />
                <button 
                    onClick={onSubmit}
                    className="w-full block py-1 pl-1 border focus:outline-none bg-blue 
                    rounded-lg text-white cursor-pointer font-semibold"
                >Upload</button>                
            </div>            
        </div>
    </div>
  )
}

export default NewsLetter