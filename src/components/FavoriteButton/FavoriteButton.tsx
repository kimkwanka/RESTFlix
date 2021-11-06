import { memo, MouseEvent } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { IState } from '../../features/types';

import './FavoriteButton.scss';

import { addMovieToFavorites, removeMovieFromFavorites } from '../../features';

interface IFavoriteButtonProps {
  movieId?: string;
  showText?: boolean;
  clear?: boolean;
}

const FavoriteButton = ({ movieId, showText, clear }: IFavoriteButtonProps) => {
  const dispatch = useDispatch();

  if (!movieId) {
    return null;
  }

  const favoriteMovies = useSelector(
    (state: IState) => state.user.data.favoriteMovies,
  );
  const isFavorite = favoriteMovies.indexOf(movieId) !== -1;

  const addToFavorites = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(addMovieToFavorites(movieId));
  };

  const removeFromFavorites = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(removeMovieFromFavorites(movieId));
  };

  return !isFavorite ? (
    <button
      type="button"
      className={`favorite-button ${clear ? 'clear' : ''}`}
      onClick={(e) => addToFavorites(e)}
    >
      &#10010;
      {showText ? ' Add to Favorites ' : ' '}
      &#x2661;
    </button>
  ) : (
    <button
      type="button"
      className={`favorite-button secondary ${clear ? 'clear--secondary' : ''}`}
      onClick={(e) => removeFromFavorites(e)}
    >
      &#8722;
      {showText ? ' Remove from Favorites ' : ' '}
      &#x2661;
    </button>
  );
};

export default memo(FavoriteButton);
