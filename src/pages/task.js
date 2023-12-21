import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/task.css";
import { getCookie } from "../utils/utils";
import backendUrl from "../config/config";

function Task() {
	const [taskName, setTaskName] = useState("");
	const [taskDesc, setTaskDesc] = useState("");
	const [points, setPoints] = useState(10); // Default value of points set to 0
	const [startAt, setStartAt] = useState("");
	const [endAt, setEndAt] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const taskData = {
			task_name: taskName,
			task_desc: taskDesc,
			points: parseInt(points), // Convert points to an integer
			start_at: startAt,
			end_at: endAt,
		};

		if (!taskName || !taskDesc || !points || !startAt || !endAt) {
			const reponseText = document.getElementById("response-text");
			reponseText.innerHTML = "Please fill all the fields";
			return;
		} else if (startAt > endAt) {
			const reponseText = document.getElementById("response-text");
			reponseText.innerHTML = "Start date cannot be greater than end date";
			return;
		}

		const authToken = getCookie("token");

		try {
			const response = await axios.post(
				`${backendUrl}/task/create-task`,
				taskData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authToken}`,
					},
				}
			);

			if (response.status === 201) {
				window.location.href = "/task";
			} else {
				console.error("Error creating task");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		const token = getCookie("token");
		if (!token) {
			window.location.href = "/login";
		}
	});

	return (
		<div className="task-page">
			<h1>Create Task</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Task Name"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Task Description"
					value={taskDesc}
					onChange={(e) => setTaskDesc(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Points"
					value={points}
					onChange={(e) => setPoints(e.target.value)}
				/>
				<input
					type="date"
					placeholder="Start Date"
					value={startAt}
					onChange={(e) => setStartAt(e.target.value)}
				/>
				<input
					type="date"
					placeholder="End Date"
					value={endAt}
					onChange={(e) => setEndAt(e.target.value)}
				/>
				<button type="submit">Create Task</button>
			</form>
			<p id="response-text"></p>
		</div>
	);
}

export default Task;
