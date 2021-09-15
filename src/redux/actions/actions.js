export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const ADD_FAVORITE_MOVIE = 'ADD_FAVORITE_MOVIE';
export const REMOVE_FAVORITE_MOVIE = 'REMOVE_FAVORITE_MOVIE';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ERRORS = 'SET_ERRORS';
export const SET_ISLOADING = 'SET_ISLOADING';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}

export function addFavoriteMovie(value) {
  return { type: ADD_FAVORITE_MOVIE, value };
}

export function removeFavoriteMovie(value) {
  return { type: REMOVE_FAVORITE_MOVIE, value };
}

export function setToken(value) {
  return { type: SET_TOKEN, value };
}

export function setErrors(value) {
  return { type: SET_ERRORS, value };
}

export function setIsLoading(value) {
  return { type: SET_ISLOADING, value };
}
