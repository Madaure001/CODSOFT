import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
	const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate()
    
	const logout = async () => {
		setSubmitting(true);
		try {
			const res = await fetch("https://codsoft-fmke.onrender.com/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			
			const data = await res.json();
			if (data.error) {
				
				throw new Error(data.error);
			}
			//console.log(data)
			
			localStorage.removeItem("EazilyHired-user");
			localStorage.removeItem("EazilyHired-userImage");
			
			//redirect to home
			navigate("/")
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return { submitting, logout };
};
export default useLogout;