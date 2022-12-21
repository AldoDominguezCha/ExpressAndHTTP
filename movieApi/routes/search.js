const express = require('express');

const searchRouter = express.Router();

const movies = require('./../data/movies');
const people = require('./../data/people');

searchRouter.use((req, res, next) => {
    if (!req.query.query) {
        res.status(400).json({ error: 'The search query parameter is required' });
    } else {
        next();
    }
});

searchRouter.get('/movie', (req, res, next) => {
    const searchTerm = req.query.query;

    const results = movies.filter((movie) => movie.overview.includes(searchTerm) || movie.title.includes(searchTerm));
    res.status(200).json(results);
});

searchRouter.get('/person', (req, res, next) => {
    const searchTerm = req.query.query;

    const results = people.filter((person) => person.name.includes(searchTerm));
    res.status(200).json(results);
});

module.exports = searchRouter;