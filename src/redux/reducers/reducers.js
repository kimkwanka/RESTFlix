import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  SET_TOKEN,
  ADD_FAVORITE_MOVIE,
  REMOVE_FAVORITE_MOVIE,
  SET_ERRORS,
} from '../actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.value;
    case ADD_FAVORITE_MOVIE: {
      const favoritesCopy = state.FavoriteMovies.slice(0);
      favoritesCopy.push(action.value);

      return { ...state, FavoriteMovies: favoritesCopy };
    }
    case REMOVE_FAVORITE_MOVIE: {
      const favoritesCopy = state.FavoriteMovies.slice(0);
      const indexOfMovieIDToRemove = favoritesCopy.indexOf(action.value);
      favoritesCopy.splice(indexOfMovieIDToRemove, 1);

      return { ...state, FavoriteMovies: favoritesCopy };
    }
    default:
      return state;
  }
};

const token = (state = '', action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.value;
    default:
      return state;
  }
};

const errorMessages = (state = [], action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.value;
    default:
      return state;
  }
};

export default combineReducers({
  visibilityFilter,
  movies,
  user,
  token,
  errorMessages,
});
