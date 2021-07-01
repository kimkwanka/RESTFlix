import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import MainView from './components/MainView';

const App = () => (
  <MainView />
);

ReactDOM.render(<App />, document.getElementById('root'));
