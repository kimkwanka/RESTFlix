import { Switch, Route, Redirect } from 'react-router-dom';

import { useAppSelector } from '@features/hooks';

import LoginView from '@views/LoginView/LoginView';
import RegistrationView from '@views/RegistrationView/RegistrationView';
import HomeView from '@views/HomeView/HomeView';
import MovieView from '@views/MovieView/MovieView';
import GenreView from '@views/GenreView/GenreView';
import DirectorView from '@views/DirectorView/DirectorView';
import ProfileView from '@views/ProfileView/ProfileView';

const Routes = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  // Redirect /login and /register to / if logged in.
  // Redirect all routes to /login (except /login and /register) when not logged in.

  return (
    <Switch>
      {isLoggedIn && <Redirect from="/login" to="/" />}
      {isLoggedIn && <Redirect from="/register" to="/" />}
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/register" component={RegistrationView} />

      {!isLoggedIn && <Redirect from="*" to="/login" />}
      <Route exact path="/" component={HomeView} />
      <Route exact path="/profile" component={ProfileView} />

      <Route exact path="/movies/:movieId" component={MovieView} />
      <Route exact path="/genres/:genreId" component={GenreView} />
      <Route exact path="/directors/:directorName" component={DirectorView} />
    </Switch>
  );
};

export default Routes;
