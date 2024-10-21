import React from "react";
import Dog from "./Dog";
import "./DogList.css";

const DogList = (props) => {
	const dogsArray = props.dogs.map((dogURL) => {
		return <Dog url={dogURL} />;
	});
	return <div className="doglistcontainer">{dogsArray}</div>;
};

export default DogList;
