import React, { useEffect } from "react";
import "../styles/login.css";
import { getCookie } from "../utils/utils";

function UserTask() {
	useEffect(() => {
		const token = getCookie("token");
		if (!token) {
			window.location.href = "/login";
		}
	});

	return (
		<>
			<h1>UserTask</h1>
		</>
	);
}

export default UserTask;
