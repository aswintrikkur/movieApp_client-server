console.log('=======START=======');
const { default: axios } = require('axios');
const express = require('express'); //express imported
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const movieList = require('./DataBase/movieData.json')

console.log(movieList.length);
//creating server
const PORT = 3500;
app.listen(PORT, () => { console.log(`server started in ${PORT}`); });
app.use(cors());
app.use(express.json());


const API_URL_movieDB =
    "https://api.themoviedb.org/3/search/movie?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&page=1&include_adult=false&query=batman";

const fetchDBmovieApi = async () => {
    const response = axios(API_URL_movieDB);
    const movieData = ((await response).data.results);
    fs.writeFile(path.join(__dirname, 'DataBase', 'movieData.json'), `${JSON.stringify(movieData, null, ' ')}`, (err) => {
        if (err) throw err;
        console.log(`${movieData.length} movies data added to movieData.json`);
    })
}
// fetchDBmovieApi();       //to fetch movie from DBmovies and store in movieData.json

app.get('/', (req, res) => {
    res.json('Hello World');
})

app.get('/api/movie', (req, res) => {
    res.json(movieList);
    console.log('data responded');
})



console.log(`========END========`);