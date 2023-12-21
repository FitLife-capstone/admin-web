import React, { useEffect, useState } from "react";
import "../styles/userTask.css";
import { getCookie } from "../utils/utils";
import backendUrl from "../config/config";
import Navbar from "../component/navbar";

function UserTask() {
	const [userTasks, setUserTasks] = useState([]);

	useEffect(() => {
		const token = getCookie("token");
		if (!token) {
			window.location.href = "/login";
		} else {
			fetchUserTasks(token);
		}
	}, []);

	const fetchUserTasks = async (token) => {
		try {
			const response = await fetch(`${backendUrl}/user-task/user-task`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (data.error === false) {
				setUserTasks(data.data);
			} else {
				console.error("Error fetching user tasks:", data.message);
			}
		} catch (error) {
			console.error("Error fetching user tasks:", error);
		}
	};

	const handleAccept = async (taskId, userID) => {
		try {
			const token = getCookie("token");
			const acceptURL = `${backendUrl}/user-task/accept-task/${userID}/${taskId}`;
			const response = await fetch(acceptURL, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("response", response);
			window.location.href = "/user-task";
		} catch (error) {
			console.error("Error accepting task:", error);
		}
	};

	const handleReject = async (taskId, userID) => {
		try {
			const token = getCookie("token");
			const rejectURL = `${backendUrl}/user-task/reject-task/${userID}/${taskId}`;
			const response = await fetch(rejectURL, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("response", response);
			window.location.href = "/user-task";
		} catch (error) {
			console.error("Error rejecting task:", error);
		}
	};

	return (
		<>
			<Navbar />
			<div className="usertask-page">
				<h1>UserTask</h1>
				{userTasks && userTasks.length > 0 ? (
					<div className="user-tasks">
						<table>
							<thead>
								<tr>
									<th>No</th>
									<th>User ID</th>
									<th>Task ID</th>
									<th>Rate</th>
									<th>Created Date</th>
									<th>Image</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{userTasks.map((task, index) => (
									<tr className="task-card" key={index}>
										{/* <img src={task.img} alt={`Task ${task.task_id}`} /> */}
										<td>{index}</td>
										<td>{task.user_id}</td>
										<td>{task.task_id}</td>
										<td>{task.rate}</td>
										<td>{new Date(task.created_date).toLocaleString()}</td>
										<td>
											<a href={task.img}>Download</a>
										</td>
										<td>
											<div className="action-buttons">
												<button
													onClick={() =>
														handleAccept(task.task_id, task.user_id)
													}
													className="accept-button"
												>
													Accept
												</button>
												<button
													onClick={() =>
														handleReject(task.task_id, task.user_id)
													}
													className="reject-button"
												>
													Reject
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="no-pending">No Pending Task</div>
				)}
			</div>
		</>
	);
}

export default UserTask;
