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

export interface IState {
  user: IUser;
  movies: IMovie[];
  [key: string]: object;
}

interface IGenre {
  name: string;
}

export interface IMovie {
  _id: string;
  description: string;
  genre: IGenre;
  slug: string;
  title: string;
}
