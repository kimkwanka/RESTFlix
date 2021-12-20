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
- Jest
- Cypress
- React / Cypress Testing Library

## Live Version
Check out the [live version](https://restflix.netlify.app/) to see the app in action.

## Getting Started

### Install
After cloning the repository run either
``yarn`` or ``npm install`` to install all dependencies.

### Environment Variables
The app depends on the following environment variable (supplied via a [.env file](https://www.npmjs.com/package/react-native-dotenv) or natively by your OS environment):

  ***VITE_MOVIE_API_URL**=https://flix.kimkwanka.io*

(Just create a file named ``.env`` in the project root, copy the above line into it and you're good to go.)


### Development
Use ``yarn dev`` or ``npm run dev`` to run app in development mode.

### Build
Use ``yarn build`` or ``npm run build`` to build for production.

### Testing (Unit / Integration)
Use ``yarn test`` or ``npm run test`` to run the test suite ([Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)) once or
``yarn test --watch`` or ``npm run test -- --watch`` to run it in watch mode.

Check the [Jest CLI docs](https://jestjs.io/docs/cli) for more options.
### Testing (E2E)
Use ``yarn test:e2e`` or ``npm run test:e2e`` to run the end-to-end test suite ([Cypress](https://www.cypress.io/) + [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/)) headlessly or ``yarn test:e2e --headed`` or ``npm run test:e2e -- --headed`` to force the browser to show.

Check the [Cypress CLI docs](https://docs.cypress.io/guides/guides/command-line) for more CLI options.

Alternatively you can run ``yarn cy:open`` or ``npm run cy:open`` to open Cypress and run the tests manually.
