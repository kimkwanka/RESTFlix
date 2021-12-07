import { Switch, Route, Redirect } from 'react-router-dom';

import { useAppSelector } from '@features/hooks';

import LoginView from '@views/LoginView/LoginView';
import RegistrationView from '@views/RegistrationView/RegistrationView';
import HomeView from '@views/HomeView/HomeView';
import SearchView from '@views/SearchView/SearchView';
import MovieView from '@views/MovieView/MovieView';
import GenreView from '@views/GenreView/GenreView';
import DirectorView from '@views/DirectorView/DirectorView';
import ProfileView from '@views/ProfileView/ProfileView';

interface IRoutesProps {
  silentLoginPending: boolean;
}

const Routes = ({ silentLoginPending }: IRoutesProps) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  // When logged in, redirect '/login' and '/register' to '/' and show requested route otherwise
  if (isLoggedIn) {
    return (
      <Switch>
        <Redirect from="/login" to="/" />
        <Redirect from="/register" to="/" />
        <Route exact path="/profile" component={ProfileView} />
        <Route exact path="/movies/:movieId" component={MovieView} />
        <Route exact path="/genres/:genreId" component={GenreView} />
        <Route exact path="/directors/:directorName" component={DirectorView} />
        <Route exact path="/search" component={SearchView} />
        <Route exact path="/" component={HomeView} />
      </Switch>
    );
  }

  // When not logged in and no silent login request is pending, redirect all routes to '/login' when not already on '/login' or '/register'
  return (
    <Switch>
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/register" component={RegistrationView} />
      {!silentLoginPending && <Redirect to="/login" />}
    </Switch>
  );
};

export default Routes;
