import React, { useEffect, useState } from "react";
import "./PopUpMessage.css";

export const PopUpMessage = ({ showPopUp, children }) => {
	return (
		<div>
			{showPopUp && (
				<div className="popUp-message">
					{children}
				</div>
			)}
		</div>
	);
};
