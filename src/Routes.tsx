import { Routes, Route, Navigate } from 'react-router-dom';

import { useAppSelector } from '#state/hooks';

import LoginView from '#views/LoginView/LoginView';
import RegistrationView from '#views/RegistrationView/RegistrationView';
import HomeView from '#views/HomeView/HomeView';
import SearchView from '#views/SearchView/SearchView';
import MovieView from '#views/MovieView/MovieView';
import GenreView from '#views/GenreView/GenreView';
import ProfileView from '#views/ProfileView/ProfileView';

interface IRoutesProps {
  silentLoginPending: boolean;
}

const AppRoutes = ({ silentLoginPending }: IRoutesProps) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  // When logged in, redirect '/login' and '/register' to '/' and show requested route otherwise
  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Navigate replace to="/" />} />
        <Route path="/register" element={<Navigate replace to="/" />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/movies/:movieId" element={<MovieView />} />
        <Route path="/genres/:genreId" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
    );
  }

  // When not logged in and no silent login request is pending, redirect all routes to '/login' when not already on '/login' or '/register'
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegistrationView />} />
      {!silentLoginPending && (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
