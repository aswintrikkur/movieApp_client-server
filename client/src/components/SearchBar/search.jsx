import React, { useEffect, useState } from "react";
import "./Search.css";
import { SearchInput } from "./searchInput/SearchInput";
import { SearchList } from "./searchList/SearchList";
import axios from "axios";

// method 1: local filteration
// method 2: Filter through API

const API_URL = "http://localhost:3500/api/movie";

export const Search = () => {
	//              --------state------------
	const [searchInputValue, setSearchInputvalue] = useState("");
	const [searchListValue, setSearchListValue] = useState([]);
	const [initialList, setInitialList] = useState([]);

	//              ---------API Call--------
	const fetchSearchList = async () => {
		try {
			const response = await axios(
				API_URL /*,  {
                params:{
                    query : searchInputValue
                }
            }*/
			);
			// setSearchListValue(response.data);
			console.log(response.data);
			setInitialList(response.data);
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
	}, []);

	//input-box handling
	const handleChange = (event) => {
		setSearchInputvalue(event.target.value);
		const newFilteredList = initialList.filter((data) => {
			return data.title.toLowerCase().includes(event.target.value.toLowerCase());
		});
		setSearchListValue(newFilteredList);
	};

	//clear button handling
	const handleClearButton = () => {
		setSearchInputvalue("");
	};

	return (
		<div>
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
				<SearchList searchListValue={searchListValue} />
			</div>
		</div>
	);
};
