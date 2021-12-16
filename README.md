## RESTFlix
React app that allows you to discover old and upcoming movies alike and let's you save them in a "favorite movies list".

GraphFlix utilizes [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) to consume [flix-backend](https://github.com/kimkwanka/flix-backend)'s REST API endpoints that act as a proxy for the [TMDb's REST API](https://developers.themoviedb.org/3/getting-started/introduction) and also provide access to the backend's User Management (CRUD) functionality.

State management is achieved through [Redux](https://react-redux.js.org/) and [Redux Toolkit slices](https://redux-toolkit.js.org/usage/usage-guide#creating-slices-of-state).

### GraphQL Version

To see the GraphQL version of this app, check out [GraphFlix](https://github.com/kimkwanka/GraphFlix).

## Built With
- React
- Redux / Redux Toolkit
- RTK Query
- TypeScript

## Live Version
Check out the [live version](https://restflix.netlify.app/) to see the app in action.

## Getting Started

### Install
After cloning the repository run either
``yarn`` or ``npm install`` to install all dependencies.

### Environment Variables
The app depends on the following environment variable (supplied via a [.env file](https://www.npmjs.com/package/react-native-dotenv) or natively by your OS environment):

  ***VITE_MOVIE_API_URL**=movie-api.cardinalzero.com*

(Just create a file named ``.env`` in the project root, copy the above line into it and you're good to go.)


### Development
Use ``yarn dev`` or ``npm run dev`` to run app in development mode.

### Build
Use ``yarn build`` or ``npm run build`` to build for production.
