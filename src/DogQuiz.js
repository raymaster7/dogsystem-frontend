import { useState } from "react";
import "./DogQuiz.css";
import { data } from "../assets/data";

export const DogQuiz = () => {
	let [index, setIndex] = useState(0);
	let [question, setQuestion] = useState(data[index]);
	let [lock, setLock] = useState(false);
	let [result, setResult] = useState(false);
	let [answers, setAnswers] = useState([]); // State to track answers
	let [breed, setBreed] = useState(null); // State to track the returned breed

	const next = () => {
		if (lock === true) {
			if (index === data.length - 1) {
				setResult(true);

				// Send answers to backend and fetch the corresponding breed
				const requestBody = JSON.stringify({ answer: answers }); // Changed to 'answer'
				console.log("Sending JSON:", requestBody); // Log the JSON being sent

				fetch("http://localhost:8080/dog/getBreed", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: requestBody,
				})
					.then((res) => res.json())
					.then((data) => {
						console.log("Received Response:", data); // Log the response
						setBreed(data.breed);
					});

				return;
			}
			setIndex(++index);
			setQuestion(data[index]);
			setLock(false);
			// Clear highlighted options
			document
				.querySelectorAll(".highlighted")
				.forEach((elem) => elem.classList.remove("highlighted"));
		}
	};

	const reset = () => {
		setIndex(0);
		setQuestion(data[0]);
		setResult(false);
		setLock(false);
		setAnswers([]); // Reset answers
		setBreed(null); // Reset breed
	};

	const highlightOption = (e) => {
		if (lock === false) {
			e.target.classList.add("highlighted");
			setLock(true);
			const selectedOption = e.target.textContent.charAt(0);
			setAnswers([...answers, selectedOption]); // Save selected answer
		} else {
			document
				.querySelectorAll(".highlighted")
				.forEach((elem) => elem.classList.remove("highlighted"));
			e.target.classList.add("highlighted");
			const selectedOption = e.target.textContent.charAt(0);
			setAnswers([...answers.slice(0, -1), selectedOption]); // Update selected answer
		}
	};

	return (
		<div className="dogcontainer">
			<h1>Dog Quiz</h1>
			<hr />
			{result ? (
				<>
					<h2>Your Dog Breed is: {breed}</h2>
					<button onClick={reset}>Reset</button>
					<div>
						{/* <h3>Your Answers:</h3>
						<ul>
							{answers.map((answer, i) => (
								<li key={i}>{answer}</li>
							))}
						</ul> */}
					</div>
				</>
			) : (
				<>
					<h2>
						{index + 1}. {question.question}
					</h2>
					<ul>
						{Object.keys(question)
							.filter((key) => key.startsWith("option"))
							.map((key, i) => (
								<li key={i} onClick={highlightOption}>
									{question[key]}
								</li>
							))}
					</ul>
					<button onClick={next}>Next</button>
					<div className="index">
						{index + 1} of {data.length} questions
					</div>
				</>
			)}
		</div>
	);
};
