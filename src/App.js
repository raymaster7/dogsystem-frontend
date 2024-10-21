import { useEffect, useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import DogBreed from "./pages/DogBreed";
import { DogQuiz } from "./pages/DogQuiz";
import { About } from "./pages/About";
function App() {
	const current_theme = localStorage.getItem("current_theme");
	const [theme, setTheme] = useState(current_theme ? current_theme : "light");

	useEffect(() => {
		localStorage.setItem("current_theme", theme);
	}, [theme]);
	return (
		<div className={`container ${theme}`}>
			<Router>
				<Appbar theme={theme} setTheme={setTheme} />{" "}
				<div className="containerpages">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/dogbreed" element={<DogBreed />} />
						<Route path="/dogquiz" element={<DogQuiz />} />
						<Route path="/about" element={<About />} />
						<Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
