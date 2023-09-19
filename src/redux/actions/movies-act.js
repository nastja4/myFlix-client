// action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';
export const GET_ALL_MOVIE = 'GET_ALL_MOVIE';
export const GET_MOVIE = 'GET_MOVIE';
export const GET_MOVIES_BY_GENRE = 'GET_MOVIE_BY_GENRE';
export const GET_MOVIES_BY_DIRECTOR = 'GET_MOVIE_BY_DIRECTOR';

// action creators
export const login = (user) => ({
  type: actionTypes.LOGIN,
  user,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const register = (user) => ({
  type: actionTypes.REGISTER,
  user,
});

export const updateUser = (user) => ({
  type: actionTypes.UPDATE_USER,
  user,
});

export const deleteUser = () => ({
  type: actionTypes.DELETE_USER,
});

export const addFavorite = (movieId) => ({
  type: actionTypes.ADD_FAV,
  movieId,
});

export const removeFavorite = (movieId) => ({
  type: actionTypes.REMOVE_FAV,
  movieId,
});

export const getAllMovies = (movies) => ({
  type: actionTypes.GET_ALL_MOVIE,
  movies,
});

export const getMovie = (movie) => ({
  type: actionTypes.GET_MOVIE,
  movie,
});

export const getMoviesByGenre = (genre) => ({
  type: actionTypes.GET_MOVIES_BY_GENRE,
  genre,
});

export const getMoviesByDirector = (director) => ({
  type: actionTypes.GET_MOVIES_BY_DIRECTOR,
  director,
});