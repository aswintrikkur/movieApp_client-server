import React from "react";
import "./SearchInput.css";

export const SearchInput = ({ searchInputValue, handleChange, handleClearButton }) => {



	return (
		<div>
			<div className="search-input-container">
				<input type="text" placeholder="Search here..." value={searchInputValue} onChange={handleChange} />
				<div className="close-btn">
					{searchInputValue &&
						<button onClick={handleClearButton}> <img src="https://w7.pngwing.com/pngs/1008/558/png-transparent-computer-icons-button-close-angle-rectangle-logo-thumbnail.png"
							alt="" /></button>
					}
				</div>
			</div>
		</div>
	);
};
