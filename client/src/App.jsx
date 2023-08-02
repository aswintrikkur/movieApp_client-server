import { useState } from "react";
import "./App.css";
import { Search } from "./components/SearchBar/Search";


function App() {
	const [bgImage, setBgImage]=useState('');
	const fetchBgImage=(data)=>{
		setBgImage(data);
	}
console.log(bgImage);

	return (
		<div className="app-container">
			<div className="blur"></div>
			<Search fetchBgImage={fetchBgImage} />;
		</div>
	);
}

export default App;
