import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
	return (
		<nav className="navbar">
			<div className="nav-links">
				<Link to="/user-task">User Task</Link>
				<Link to="/task">Task</Link>
			</div>
		</nav>
	);
}

export default Navbar;
