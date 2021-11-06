export interface IUserData {
  birthday: string;
  email: string;
  password: string;
  username: string;
}

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
  description: string;
  name: string;
}

interface IDirector {
  bio: string;
  birth: string;
  death: string;
  name: string;
}

export interface IMovie {
  _id: string;
  description: string;
  director: IDirector;
  featured: boolean;
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
