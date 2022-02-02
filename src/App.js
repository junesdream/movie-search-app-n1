import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
	const [end, setEnd] = useState("");
	const [film, setFilm] = useState([]);
	const inputField = useRef("");

	useEffect(() => {
		fetch(
			`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/+${end}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host":
						"imdb-internet-movie-database-unofficial.p.rapidapi.com",
					"x-rapidapi-key": "",
				},
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setFilm(data.titles);
				// console.log(data.titles)
			})

			.catch((err) => {
				console.error(err);
			});
	}, [end]);

	const onSubmit = (e) => {
		e.preventDefault();
		setEnd(inputField.current.value);
	};

	return (
		<div className="App">
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Type the name of movies..."
					ref={inputField}
				/>
				<button className="submit">Submit</button>
			</form>

			<div className="print">
				{film.map((item, index) => {
					return (
						<div key={index} className="container">
							<img src={item.image} alt="" />
							<p>{item.title}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
