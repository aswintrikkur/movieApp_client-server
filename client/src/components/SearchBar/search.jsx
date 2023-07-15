import React, { useEffect, useState } from "react";
import "./Search.css";
import { SearchInput } from "./searchInput/SearchInput";
import { SearchList } from "./searchList/SearchList";
import axios from 'axios';

// method 1: local filteration
// method 2: Filter through API 

const API_URL =
    "https://api.themoviedb.org/3/search/movie?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&page=1&include_adult=false";

export const Search = () => {
    //              --------state------------
    const [searchInputValue, setSearchInputvalue] = useState("");
    const [searchListValue, setSearchListValue] = useState([]);

    //              ---------API Call--------
    const fetchSearchList = async () => {
        try {
            // const response= await axios(API_URL+'&query'+searchInputValue); //old method
            // const response= await axios(`${API_URL}&query${searchInputValue}`); // template literals method
            const response = await axios(API_URL, {
                params: {
                    query: searchInputValue,
                }
            });                                         // best practice
            setSearchListValue(response.data.results);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const APIcall = setTimeout(() => {
            console.log("mount")
            fetchSearchList();
        }, 300);

        return () => {
            console.log("unMount");
            clearTimeout(APIcall);
        }
    }, [searchInputValue])




    //input-box handling
    const handleChange = (event) => {
        setSearchInputvalue(event.target.value);
        const newFilteredList = searchListValue.filter((data) => {
            return data.title.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setSearchListValue(newFilteredList);
    }

    //clear button handling
    const handleClearButton = () => {
        setSearchInputvalue("");
    }




    return (
        <div>
            <div className="search-container">
                <div className="title">
                    <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                    <p>Looking for movies? </p>
                </div>

                <SearchInput searchInputValue={searchInputValue}
                    handleChange={handleChange}
                    handleClearButton={handleClearButton}
                />
                <SearchList searchListValue={searchListValue} />
            </div>
        </div>
    );
};
