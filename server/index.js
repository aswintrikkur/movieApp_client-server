console.log('=======START=======');
const express = require('express'); //express imported
const app =express();  

const PORT =3005;
app.listen(PORT, ()=>{ console.log(`server started in ${PORT}`);});

const API_URL =
    "https://api.themoviedb.org/3/search/movie?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&page=1&include_adult=false&query=movies";


app.get('/', (req,res)=>{
    res.json(API_URL);
    
});

