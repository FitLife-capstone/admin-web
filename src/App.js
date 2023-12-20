import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
// import Home from "./pages/home";
import Task from "./pages/task";
import UserTask from "./pages/userTask";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<UserTask />} />
					<Route path="/login" element={<Login />} />
					{/* <Route path="/home" element={<Home />} /> */}
					<Route path="/task" element={<Task />} />
					<Route path="/user-task" element={<UserTask />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

