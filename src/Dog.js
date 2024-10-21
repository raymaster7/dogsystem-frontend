import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

export default function Dog() {
	const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
	const [name, setName] = useState("");
	const [breed, setBreed] = useState("");
	const [dogs, setDogs] = useState([]);
	const classes = useStyles();

	const handleClick = (e) => {
		e.preventDefault();
		const dog = { name, breed };
		console.log(dog);
		fetch("http://localhost:8080/dog/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(dog),
		}).then(() => {
			console.log("New Dog added");
		});
	};

	useEffect(() => {
		fetch("http://localhost:8080/dog/getAll")
			.then((res) => res.json())
			.then((result) => {
				setDogs(result);
			});
	}, []);

	return (
		<Container>
			<Paper elevation={3} style={paperStyle}>
				<h1 style={{ color: "blue" }}>
					<u>Add Dog</u>
				</h1>
				<form className={classes.root} noValidate autoComplete="off">
					<TextField
						id="outlined-basic"
						label="Dog Name"
						variant="outlined"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="Dog Breed"
						variant="outlined"
						fullWidth
						value={breed}
						onChange={(e) => setBreed(e.target.value)}
					/>
					<Button variant="contained" color="secondary" onClick={handleClick}>
						Submit
					</Button>
				</form>
			</Paper>
			<h1>Dogs</h1>

			<Paper elevation={3} style={paperStyle}>
				{dogs.map((dog) => (
					<Paper
						elevation={6}
						style={{ margin: "10px", padding: "15px", textAlign: "left" }}
						key={dog.id}
					>
						Id:{dog.id}
						<br />
						Name:{dog.name}
						<br />
						breed:{dog.breed}
					</Paper>
				))}
			</Paper>
		</Container>
	);
}
