import React, { useEffect } from "react";
import "./SearchList.css";
import { useState } from "react";

export const SearchList = ({ searchListValue }) => {
	const [selected, setSelected] = useState(false);
	const [selectedContent, setSelectedContent] = useState(null);

	// selected content handling
	const handleSeclectedContent = (key) => {
		// console.log(key);
		setSelected((prev) => !prev);
		const newContent = searchListValue.find((data) => {
			return data.id === key;
		});
		setSelectedContent(newContent);
		console.log(newContent);
		// console.log(newContent[0].title);
		// console.log(newContent[0].poster_path);
	};

	return (
		<div>
			<div className="search-list-container">
				{selected && (
					<div className="selected-content-div ">
						<div className="selected-content">
							<button onClick={() => setSelected(false)}> X</button>
							<img
								className="image"
								src={`https://image.tmdb.org/t/p/w500/${selectedContent.poster_path}`}
								alt="couldn't find"
							/>
							<div>
								<h2>
									{selectedContent.title.toUpperCase()} {`(${selectedContent.release_date?.slice(0, 4)})`}{" "}
								</h2>
								<p className="overview">{selectedContent.overview} </p>
							</div>
						</div>
					</div>
				)}
				{searchListValue.map((data) => (
					<div className="content" onClick={() => handleSeclectedContent(data.id)} key={data.id}>
						<img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} />
						<p> {data.title}</p>
					</div>
				))}
			</div>
		</div>
	);
};
