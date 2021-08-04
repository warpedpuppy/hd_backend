const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const xss = require('xss');

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  director: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director' }],
  actors: [String],
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  image_url: String,
  featured: Boolean,
});

const genreSchema = mongoose.Schema({
  name: String,
  description: String,
});

const directorSchema = mongoose.Schema({
  name: String,
  bio: String,
  birth_year: String,
  seath_year: String,
});

const userSchema = mongoose.Schema({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birth_date: Date,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

userSchema.statics.hashPassword = (password) => bcrypt.hashSync(password, 10);

userSchema.statics.serialize = (user) => {
  return {
    user_name: xss(user.user_name), 
    email:  xss(user.email),
    birth_date:  xss(user.birth_date)
  }
}

/* eslint-disable-next-line */
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const Movie = mongoose.model('Movie', movieSchema);
const Genre = mongoose.model('Genre', genreSchema);
const Director = mongoose.model('Director', directorSchema);
const User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.User = User;
