console.log('=======START=======');
const { default: axios } = require('axios');
const express = require('express'); //express imported
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const movieList = require('./DataBase/movieData.json');

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

//          ------Routes-------
app.get('/', (req, res) => {
    res.json('Hello World');
});
app.get('/movieList', ((req, res) => {
    res.json(movieList);
}));


//          ----------API----------
app.get('/api/movie', (req, res) => {
    const { movieName } = req.query;
    const filteredList = movieList.filter((data) => {
        return data.title.toLocaleLowerCase().includes(movieName.toLocaleLowerCase());
    });
    res.json({
        message: 'api fetched successfully',
        results: filteredList,
    });
    // console.log('data responded');
})

app.post('/api/movie', (req, res) => {
    const { movieName } = req.body;
    const today = new Date();
    movieList.push({
        id: Date.now(),
        release_date: today.getFullYear().toString(),
        title: movieName,
    })
    res.json({
        message: 'movie added to DB'
    });
});



console.log(`========END========`);