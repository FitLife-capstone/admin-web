import React, { useEffect, useState } from "react";
import "../styles/login.css";
import { getCookie } from "../utils/utils";

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
			const response = await fetch(
				"http://localhost:5000/user-task/user-task",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
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

	const handleAccept = (taskId, userID) => {
		// Logic to handle accepting the task with taskId
		console.log("Accepted task with ID:", taskId, userID);
	};

	const handleReject = (taskId, userID) => {
		// Logic to handle rejecting the task with taskId
		console.log("Rejected task with ID:", taskId, userID);
	};

	return (
		<>
			<h1>UserTask</h1>
			<div className="user-tasks">
				<table>
					<thead>
						<tr>
							<th>No</th>
							<th>User ID</th>
							<th>Task ID</th>
							<th>Rate</th>
							<th>Created Date</th>
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
									<div className="action-buttons">
										<button
											onClick={() => handleAccept(task.task_id, task.user_id)}
										>
											Accept
										</button>
										<button
											onClick={() => handleReject(task.task_id, task.user_id)}
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
		</>
	);
}

export default UserTask;
