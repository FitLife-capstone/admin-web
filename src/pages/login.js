import React, { useState } from "react";
import axios from "axios";
import "../styles/home.css";
import backendUrl from "../config/config";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();

		if (email && password) {
			try {
				const response = await axios.post(`${backendUrl}/auth/login`, {
					email: email,
					pass: password,
				});

				if (response.data.error === false) {
					if (response.data.loginResult.name === "Admin") {
						const expirationTime = new Date(
							new Date().getTime() + 60 * 60 * 1000
						); // 1 hour in milliseconds

						console.log(
							"data",
							response.data,
							"expirationTime",
							expirationTime,
							"token",
							response.data.loginResult.token
						);
						const token = response.data.loginResult.token;
						document.cookie = `token=${token}; expires=${expirationTime.toUTCString()}; path=/`;
						window.location.href = "/task";
					} else {
						const reponseText = document.getElementById("response-text");
						reponseText.innerHTML = "Please login as Admin";
					}
				}
			} catch (error) {
				console.error("Login error:", error.message);
				console.log("data");
				const reponseText = document.getElementById("response-text");
				reponseText.innerHTML = "Username or Password is incorrect";
			}
		} else {
			console.error("Please enter both email and password");
		}
	};

	return (
		<>
			<div className="login-page">
				<h1>LOGIN</h1>
				<form onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit">Login</button>
				</form>
				<p id="response-text"></p>
			</div>
		</>
	);
}

export default Login;
