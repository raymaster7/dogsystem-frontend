import { useEffect, useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import Dog from "./components/Dog";
function App() {
	const current_theme = localStorage.getItem("current_theme");
	const [theme, setTheme] = useState(current_theme ? current_theme : "light");

	useEffect(() => {
		localStorage.setItem("current_theme", theme);
	}, [theme]);
	return (
		<div className={`container ${theme}`}>
			<Appbar theme={theme} setTheme={setTheme} />
			<Dog />
		</div>
	);
}

export default App;
