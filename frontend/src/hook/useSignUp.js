import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userType } from "../lib/isAuth";

const useSignup = () => {
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate()
	const [resumeName, setResumeName] = useState("")
	
	const signup = async (inputs) => {
		const {type, email, password, username, fullName, phoneNumber, image, about, equity, nationality, profile, confirmPassword} = inputs;

		//handle input errors
		const success = handleSignupErrors({type, email, password, confirmPassword, username, fullName, phoneNumber, image, about, equity, nationality, profile});
		if (!success) return;

		setSubmitting(true);
		try {
			
			navigate("/loader")
			//create user profile image
			const res = await axios.post(`http://localhost:8000/upload/profile`,inputs, {
				headers: { "Content-Type": "multipart/form-data"},
			});
			
			const imageData = await res.data
			if (imageData.error) {
				throw new Error(imageData.error);
			}
			//console.log(imageData)
			const profileImage = imageData.imageName 
			
			localStorage.setItem("EazilyHired-userImage", JSON.stringify(imageData));
			
			//save user locally 
			const response = await fetch(`http://localhost:8000/auth/signup/`, {           //handle CORS error
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username,
					password,
					confirmPassword,
					type,
					email,	
					fullName,
					about,
					phoneNumber,
					equity,
					nationality,
					profileImage				
				})
			});
			
			const data = await response.json();
			if (data.error) {
				throw new Error(data.error);
			}
			
			//save user locally
			localStorage.setItem("EazilyHired-user", JSON.stringify(data));
			//redirect to home
			navigate(`/${userType()}/dashboard`)
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return { submitting, signup };                 //handle CORS errors
};
export default useSignup;

export function handleSignupErrors({
	username, password, confirmPassword, type, email, fullName, about,profile, 
}) {

	const pattern = /^[a-zA-Z0-9]+$/;
	const patternName = /^[a-zA-Z ]+$/;
	const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
	//console.log(username, password, confirmPassword, type, email, fullName, about, )

	if (!username || !password || !confirmPassword || !type || !email || !fullName || !about ) {
		toast.error("Please fill in all fields");
		return false;
	};

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	};

	if (password.length < 8) {
		toast.error("Password must be at least 8 characters");
		return false;
	};

	if (username.length < 6) {
		toast.error("username must be at least 6 characters");
		return false;
	};

	if (!pattern.test(username)) {
		toast.error("Username cannot have special characters");
		return false;
	};
	if (!type) {
		toast.error("Account type cannont be empty")
		return false;
	};
	if (!profile) {
		toast.error("Please upload your profile")
		return false;
	};

	return true;

}