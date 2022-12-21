var express = require('express');
const axios = require('axios');
var router = express.Router();

const apiKey = '123456789';
const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get('/', async function(req, res, next) {

  let data = {};
  
  try {
    const response = await axios({
      method: 'get',
      url: nowPlayingUrl,
      headers: { "Accept-Encoding": "gzip,deflate,compress" }
    });
    
    data = response.data;

  } catch (error) {
    console.log(`There's been an error in the request. ${error}`);
  }

  res.render('index', { parsedData: data.results });
});

router.get('/movie/:id', async (req, res, next) => {

  const movieId = req.params.id;
  const movieDetailsUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;

  let data = {};
  
  try {
    const response = await axios({
      method: 'get',
      url: movieDetailsUrl,
      headers: { "Accept-Encoding" : "gzip,deflate,compress" }
    })

    data = response.data;

  } catch (error) {
    console.log(`There's been an error in the movie details request. ${error}`);
  }
  
  res.render('single-movie', { data });

});

router.post('/search', async (req, res, next) => {

  const searchCategory = req.body.cat;
  const searchTerm = encodeURI(req.body.movieSearch);

  const searchUrl = `${apiBaseUrl}/search/${searchCategory}?api_key=${apiKey}&query=${searchTerm}`;

  console.log(searchUrl);

  let data = {};

  try {
    const response = await axios({
      method: 'GET',
      url: searchUrl,
      headers: { "Accept-Encoding" : "gzip,deflate,compress" }
    });

    data = response.data;

  } catch (error) {
    console.log(`There's been an error in the movie/person search request. ${error}`);
  }

  if (searchCategory === 'person') {
    data.results = data.results[0].known_for;
  }

  res.render('index', { parsedData: data.results });
});

module.exports = router;