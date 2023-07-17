import React, { useEffect, useState } from "react";
import "./Search.css";
import { SearchInput } from "./searchInput/SearchInput";
import { SearchList } from "./searchList/SearchList";
import axios from "axios";
import { PopUpMessage } from "./popUpMessage/PopUpMessage";

// method 1: local filteration
// method 2: Filter through API

const API_URL = "http://localhost:3500/api/movie";

export const Search = () => {
	//              --------state------------
	const [searchInputValue, setSearchInputvalue] = useState("");
	const [searchListValue, setSearchListValue] = useState([]);
	const [noMovie, setNoMovie] = useState(false);
	const [apiMessage, setApiMessage] = useState({
		fetchSearchList: "",
		addMovieToDB: "",
	});
	const [showPopUp, setShowPopUp] = useState(true);

	//              --------- fetch data from DB--------
	const fetchSearchList = async () => {
		try {
			const response = await axios(API_URL, {
				params: {
					movieName: searchInputValue,
				},
			});
			setSearchListValue(response.data.results);
			console.log(response.data.results);
			console.log(response.data.message);
			{
				response.data.results.length === 0 ? setNoMovie(true) : setNoMovie(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	//              --------- add movie to DB--------
	const addMovieToDB = async () => {
		try {
			const response = axios(API_URL, {
				method: "POST",
				data: {
					movieName: searchInputValue,
				},
			});
			setNoMovie(false);
			const { message } = await (await response).data;
			setApiMessage((prev) => ({ ...prev, addMovieToDB: message }));
			fetchSearchList();

			//popUp message
			setShowPopUp(true);
			setTimeout(() => {
				setShowPopUp(false);
			}, 2000);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const APIcall = setTimeout(() => {
			console.log("mount");
			fetchSearchList();
		}, 300);

		return () => {
			console.log("unMount");
			clearTimeout(APIcall);
		};
	}, [searchInputValue]);

	//input-box handling
	//popUp message
	const handleChange = (event) => {
		setSearchInputvalue(event.target.value);

		/* // for local filtering
		const newFilteredList = searchListValue.filter((data) => {
			return data.title.toLowerCase().includes(event.target.value.toLowerCase());
		});
		setSearchListValue(newFilteredList);	*/
	};

	//clear button handling
	const handleClearButton = () => {
		setSearchInputvalue("");
	};

	return (
		<div>
			{apiMessage.addMovieToDB && (
				<PopUpMessage showPopUp={showPopUp}>
					<p>{apiMessage.addMovieToDB}</p>
				</PopUpMessage>
			)}
			<div className="search-container">
				<div className="title">
					<i className="fa-solid fa-magnifying-glass fa-xl"></i>
					<p>Looking for movies? </p>
				</div>
				<SearchInput
					searchInputValue={searchInputValue}
					handleChange={handleChange}
					handleClearButton={handleClearButton}
				/>
				{noMovie && (
					<div className="no-movie">
						<p> movie not found ? </p>
						<button className="add-movie" onClick={addMovieToDB}>
							ADD MOVIE
						</button>
					</div>
				)}
				<SearchList showPopUp={showPopUp} searchListValue={searchListValue} />
			</div>
		</div>
	);
};
