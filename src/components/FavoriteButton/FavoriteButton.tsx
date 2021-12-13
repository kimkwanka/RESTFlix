import { memo, MouseEvent } from 'react';

import {
  useAddMovieToFavoritesMutation,
  useRemoveMovieFromFavoritesMutation,
} from '#state/slices/api';

import { useAppSelector } from '#state/hooks';

import './FavoriteButton.scss';

interface IFavoriteButtonProps {
  movieId?: string;
  showText?: boolean;
  clear?: boolean;
}

const FavoriteButton = ({ movieId, showText, clear }: IFavoriteButtonProps) => {
  if (!movieId) {
    return null;
  }

  const [addMovieToFavorites] = useAddMovieToFavoritesMutation();
  const [removeMovieFromFavorites] = useRemoveMovieFromFavoritesMutation();

  const currentUserData = useAppSelector((state) => state.user.data);

  const { _id: userId, favoriteMovies } = currentUserData;

  const isFavorite = favoriteMovies.indexOf(movieId) !== -1;

  const addToFavorites = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    addMovieToFavorites({ userId, movieId });
  };

  const removeFromFavorites = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    removeMovieFromFavorites({ userId, movieId });
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
