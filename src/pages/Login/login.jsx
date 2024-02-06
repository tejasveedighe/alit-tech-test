import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../redux/slices/userSlice";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const state = useSelector((store) => store.user);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			dispatch(
				authenticateUser({
					username,
					password,
				})
			);
			navigate("/");
		},
		[username, password, dispatch, navigate]
	);

	return (
		<main className="container d-flex flex-column align-items-center justify-content-center vh-100">
			<h1 className="mb-5">Login</h1>
			<form onSubmit={handleSubmit} className="">
				<div className="form-group">
					<label htmlFor="username">Email address</label>
					<input
						type="text"
						className="form-control"
						id="username"
						aria-describedby="user-login-name"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<small id="user-login-name" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="text-danger">
					{state.loading === false && state.status === "rejected"
						? "Incorrect password, please try again"
						: ""}
				</div>
				<div className="d-flex align-items-center justify-content-between mt-2">
					<button type="submit" className="btn btn-primary">
						{state.loading ? "loading..." : "Submit"}
					</button>
					<a href="#" className="forgot-password mt-3">
						Forgot Password?
					</a>
				</div>
			</form>
		</main>
	);
}

export default Login;
