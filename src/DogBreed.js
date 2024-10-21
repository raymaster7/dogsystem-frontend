import React, { useEffect, useState } from "react";
import DogList from "./DogList";
import "./DogBreed.css";

function DogBreed() {
	const [dogs, setDogs] = useState([]);

	useEffect(() => {
		fetch("https://dog.ceo/api/breeds/image/random/10")
			.then((res) => res.json())
			.then((data) => {
				setDogs(data.message);
			});
	}, []);

	return (
		<div className="header">
			<NavItem icon="Dog Breed List">
				<DropdownMenu setDogs={setDogs} />
			</NavItem>
			<DogList dogs={dogs} />
		</div>
	);
}

function NavItem(props) {
	const [open, setOpen] = useState(false);
	return (
		<li className="nav-item">
			<a href="#" className="icon-button" onClick={() => setOpen(!open)}>
				{props.icon}
			</a>
			{open && props.children}
		</li>
	);
}

function DropdownMenu({ setDogs }) {
	const fetchBreed = (e) => {
		e.preventDefault();
		fetch("https://dog.ceo/api/breed/pug/images/random/10")
			.then((res) => res.json())
			.then((data) => {
				setDogs(data.message);
			});
	};

	function DropdownItem(props) {
		return (
			<a href="#" className="menu-item" onClick={fetchBreed}>
				{props.children}
			</a>
		);
	}

	return (
		<div className="dropdown">
			<DropdownItem>Pugs</DropdownItem>
			<DropdownItem>Shih Tzu</DropdownItem>
		</div>
	);
}

export default DogBreed;
