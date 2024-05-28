import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import isAuth, { userType } from "../lib/isAuth";

const useReset = () => {
	const [submitting, setSubmitting] = useState(false);
	const [resetOutcome, setResetOutcome] = useState(false);
	const [passwordOutcome, setPasswordOutcome] = useState(false);
	const navigate  = useNavigate()
	passwordOutcome

	const resetPassword = async (email) => {
		const success = handleResetErrors(email);
		if (!success) return;
		setSubmitting(true);
		try {
            console.log(email)
			const res = await fetch("https://codsoft-fmke.onrender.com/auth/reset", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			const data = await res.json();
			//console.log(data)
			if (data.error) {
				throw new Error(data.error);
			}
			console.log(data)
            setResetOutcome(data.success)
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	const UpdatePassword = async (password, confirmPassword, token) => {
		const success = handlePasswordErrors(password, confirmPassword);
		if (!success) return;
		setSubmitting(true);
		try {
            
			const res = await fetch(`https://codsoft-fmke.onrender.com/auth/reset/${token}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password, confirmPassword }),
			});

			const data = await res.json();
			//console.log(data)
			if (data.error) {
				throw new Error(data.error);
			}
			console.log(data)
            setPasswordOutcome(data.success)
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return { passwordOutcome, resetOutcome, submitting, resetPassword, UpdatePassword };
};
export default useReset;

function handleResetErrors(email) {
	if (!email) {
		toast.error("Please fill in all fields");
		return false;
	} 
	return true;
}

function handlePasswordErrors(password, confirmPassword) {
	
	if (!password || !confirmPassword) {
		toast.error("Please fill in all password fields");
		return false;
	}
	if ( password !== confirmPassword) {
		toast.error("passwords do not match");
		return false;
	}
	return true;
}