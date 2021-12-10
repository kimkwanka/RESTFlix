## RESTFlix
React app that allows you discover old and upcoming movies alike and let's you save them in your favorite movies list.

The app uses the [flix-backend](https://github.com/kimkwanka/flix-backend)'s REST API and consumes it via RTK Query operations.

## Built With
- React
- Redux
- RTK Query
- TypeScript

## Live demo
Check out the [live demo](https://restflix.netlify.app/) to see the app in action.

## Getting started

### Install
After cloning the repository run either
``yarn`` or ``npm install`` to install all dependencies.

### Environment Variables
The app depends on the following environment variables (supplied via a [.env file](https://www.npmjs.com/package/react-native-dotenv) or natively by your OS environment).

  ***VITE_MOVIE_API_URL**=movie-api.cardinalzero.com*

(Just create a file named ``.env`` in the project root, copy the above line into it and you're good to go.)


### Development
Use ``yarn dev`` or ``npm run dev`` to run app in development mode.

### Build
Use ``yarn build`` or ``npm run build`` to build for production.
