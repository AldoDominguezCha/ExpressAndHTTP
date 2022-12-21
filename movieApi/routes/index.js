var express = require('express');
var router = express.Router();

const movies = require('./../data/movies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/most_popular', (req, res, next) => {

  let page = req.query.page || 1;

  const startIndex = (page - 1)*20;
  
  let popularMovies = movies.filter((movie) => movie.most_popular);
  popularMovies.slice(startIndex, startIndex + 19);
  res.status(200).json({ results: popularMovies });

});

module.exports = router;