import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import isAuth, { userType } from "../lib/isAuth";

const useLogin = () => {
	const [submitting, setSubmitting] = useState(false);
	const [loggedIn, setLoggedin] = useState(false);
	const navigate  = useNavigate()

	const login = async (password, username) => {
		const success = handleLoginErrors(username, password);
		if (!success) return;
		setSubmitting(true);
		try {
			const res = await fetch("http://localhost:8000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			//console.log(data)
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("EazilyHired-user", JSON.stringify(data));
			//console.log(userType())
			navigate(`/${userType()}/dashboard`)
			setLoggedin(isAuth());
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return { submitting, login, loggedIn };
};
export default useLogin;

function handleLoginErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}