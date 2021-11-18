export interface IUser {
  data: {
    _id: string;
    birthday: string;
    email: string;
    favoriteMovies: string[];
    passwordHash: string;
    username: string;
  };
  isLoggedIn?: boolean;
  token: string;
}

export interface IMovie {
  _id: string;
  description: string;
  director: {
    bio: string;
    birth: string;
    death: string;
    name: string;
  };
  featured: boolean;
  genre: {
    description: string;
    name: string;
  };
  rating: number;
  slug: string;
  title: string;
}

// Dependency cycle is ok here since TypeScript compiler can correctly handle it for types.
// (Check https://redux-toolkit.js.org/tutorials/typescript#application-usage for more details)

// eslint-disable-next-line import/no-cycle
export type { TRootState } from './store';
