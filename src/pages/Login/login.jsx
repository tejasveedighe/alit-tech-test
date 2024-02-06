import React, { useState } from "react";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<main className="container d-flex flex-column align-items-center justify-content-center vh-100">
			<h1 className="mb-5">Login</h1>
			<form onSubmit={handleSubmit} className="">
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<small id="emailHelp" className="form-text text-muted">
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
					/>
				</div>
				<div className="d-flex align-items-center justify-content-between mt-2">
					<button type="submit" className="btn btn-primary">
						Submit
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
