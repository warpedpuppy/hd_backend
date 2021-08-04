const express = require('express');
const MoviesRouter = express.Router();
const passport = require('passport');
const Models = require('../models');
const Movies = Models.Movie;
MoviesRouter
.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const genreQuery = req.query.genre;
    const actorQuery = req.query.actor;
    if (genreQuery && actorQuery) {
      try {
        const movies = await Movies.find({ genre: genreQuery, actors: actorQuery }).populate('genre', 'name').populate('director', 'name');
        if (movies.length === 0) {
          res.status(404).send(`Found no movie with genre ${genreQuery} starring ${actorQuery}.`);
        } else {
          res.status(200).json(movies);
        }
      } catch (error) {
        res.status(500).send(`Error: ${error}`);
      }
    } else if (actorQuery) {
      try {
        const movies = await Movies.find({ actors: actorQuery }).populate('genre', 'name').populate('directors', 'name');
        if (movies.length === 0) {
          res.status(404).send(`Found no movie starring ${actorQuery}.`);
        } else {
          res.status(201).json(movies);
        }
      } catch (error) {
        res.status(500).send(`Error: ${error}`);
      }
    } else if (genreQuery) {
      try {
        const movies = await Movies.find({ genre: genreQuery }).populate('genre', 'name').populate('director', 'name');
        if (movies.length === 0) {
          res.status(404).send(`Found no movie with genre ${genreQuery}.`);
        } else {
          res.status(200).json(movies);
        }
      } catch (error) {
        res.status(500).send(`Error: ${error}`);
      }
    } else {
      try {
        const movies = await Movies.find({}).populate('genre', 'name').populate('director', 'name');
        res.status(200).json(movies);
      } catch (error) {
        res.status(500).send(`Error: ${error}`);
      }
    }
  })
 .get('/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const movie = await Movies.find({ title: req.params.title }).populate('genre', 'name').populate('director', 'name');
      if (movie.length === 0) {
        res.status(404).send(`There is no movie entitled ${req.params.title}`);
      } else {
        res.status(200).json(movie);
      }
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  });

  module.exports = MoviesRouter;