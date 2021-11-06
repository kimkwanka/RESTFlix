export interface IUser {
  data: {
    _id: string;
    birthday: string;
    email: string;
    favoriteMovies: string[];
    password: string;
    username: string;
  };
  isLoggedIn: boolean;
  token: string;
}
export interface IUI {
  isRequestPending: boolean;
  searchTerm: string;
}
interface IGenre {
  name: string;
}

export interface IMovie {
  _id: string;
  description: string;
  genre: IGenre;
  rating: number;
  slug: string;
  title: string;
}

export interface IState {
  errors: {
    loginErrors: string[];
    registerErrors: string[];
    profileErrors: string[];
  };
  movies: IMovie[];
  ui: IUI;
  user: IUser;
}
