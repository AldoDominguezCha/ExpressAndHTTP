const express = require('express');
const { router } = require('../app');
const movieRouter = express.Router();

const movieDetails = require('./../data/movieDetails');

const requireJSON = (req, res, next) => {
    if (!req.is('application/json')) {
        res.status(400).json({ error: 'Content-Type must be application/json' });
    } else {
        next();
    }
};

/* This middleware function will only kick in for paths in the router
   that make use of the 'movieId' named parameter (wildcard) */

movieRouter.param('movieId', (req, res, next) => {
    /* Pretend we do some DB analytics with this middleware function */
    console.log('Someone hit a route that uses the movieId wildcard');
    next();
});

movieRouter.get('/top_rated', (req, res, next) => {

    let page = req.query.page || 1;

    const startIndex = (page - 1)*20;
    const sortedByRateMovies = movieDetails.sort((a, b) => b.vote_average - a.vote_average).slice(startIndex, startIndex + 19);

    res.status(200).json(sortedByRateMovies);

});

movieRouter.get('/:movieId', (req, res, next) => {
    const movieId = req.params.movieId;
    const result = movieDetails.find((movie) => movie.id === Number(movieId)) || { message: 'Movie id not found' };

    res.status(200).json(result);

});

/* This is another way to register middleware for a route, requireJSON will handle the
   request before passing it to the next registered middleware for the route, but this
   will only happen if next() is invoked in requireJSON, if not, the process will
   be cut there */

movieRouter.post('/:movieId/rating', requireJSON, (req, res, next) => {
    const { movieId } = req.params;
    const userRating = Number(req.body.value);

    console.log(userRating);
    if (isNaN(userRating) || !req.body.value) {
        res.status(400).json({ error: 'The value property is required and must be an integer between 0.5 and 10' });
    }
    else if ( userRating < 0.5 || userRating > 10 ) {
        res.status(400).json({ error: 'The rating must be a number between 0.5 and 10' });
    } else {
        res.status(200).json({ message: 'The rating has been submitted' });
    }

    /* Review the content of the Content-Type header
       in the request --> console.log(req.get('content-type')); 
    */

});

movieRouter.delete('/:movie/rating', requireJSON, (req, res, next) => {
    res.status(204).json({ message: 'The rating was deleted successfully' });
});

module.exports = movieRouter;