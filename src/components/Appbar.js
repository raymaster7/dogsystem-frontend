import React from "react";
import "./Appbar.css";
import logo_light from "../assets/logo-black.png";
import logo_dark from "../assets/logo-white.png";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import { Link } from "react-router-dom";
const Appbar = ({ theme, setTheme }) => {
	const toggle_mode = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};

	return (
		<div className="appbar">
			<img
				src={theme === "light" ? logo_light : logo_dark}
				alt=""
				className="logo"
			/>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/dogbreed">Dog Breed</Link>
				</li>
				<li>
					<Link to="/dogquiz">Dog Quiz</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
			<div className="search-box">
				<input type="text" placeholder="Search" />
				<img
					src={theme === "light" ? search_icon_light : search_icon_dark}
					alt=""
				/>
			</div>
			<img
				onClick={() => {
					toggle_mode();
				}}
				src={theme === "light" ? toggle_light : toggle_dark}
				alt=""
				className="toggle-icon"
			/>
		</div>
	);
};
export default Appbar;
