/* eslint-disable react/no-array-index-key */
/* eslint no-restricted-globals: ["error"] */
import { useSelector } from 'react-redux';

import useProfileView from './useProfileView';

import { IState } from '../../features/types';

import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

import FilteredMoviesList from '../../components/FilteredMoviesList/FilteredMoviesList';

import './ProfileView.scss';

const ProfileView = () => {
  const currentUserData = useSelector((state: IState) => state.user.data);
  const { username, email, birthday, favoriteMovies } = currentUserData;

  const {
    formatDate,
    handleSubmit,
    handleDelete,
    setEmail,
    setBirthday,
    setPassword,
    setUsername,
    dataHasChanged,
    updateFormRef,
  } = useProfileView();

  return (
    <div className="profile-view">
      <h1>Profile</h1>
      <form className="profile-view__form" ref={updateFormRef}>
        <label htmlFor="formUsername">
          Username:
          <input
            id="formUsername"
            type="text"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={5}
            pattern="^[a-zA-Z0-9]+$"
          />
        </label>
        <label htmlFor="formPassword">
          Password:
          <input
            id="formPassword"
            type="password"
            defaultValue=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="formEmail">
          Email:
          <input
            id="formEmail"
            type="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="formBirthday">
          Birthday:
          <input
            id="formBirthday"
            type="date"
            defaultValue={formatDate(birthday)}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <div className="profile-view__button-wrapper">
          <button
            disabled={!dataHasChanged}
            className="profile-view__update-button"
            type="submit"
            onClick={handleSubmit}
          >
            &#x21bb; Update Profile
          </button>
          <button
            className="profile-view__delete-button clear"
            type="submit"
            onClick={handleDelete}
          >
            &#10006; Delete Profile
          </button>
        </div>
        <ErrorMessages errorType="profileErrors" />
      </form>
      {favoriteMovies.length > 0 ? (
        <>
          <h2>Favorite Movies</h2>
          <FilteredMoviesList
            filterFunc={(movie) => favoriteMovies.includes(movie._id)}
          />
        </>
      ) : null}
    </div>
  );
};

export default ProfileView;
