import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import NavBar from './components/NavBar/NavBar';

import Routes from './Routes';

import 'modern-css-reset';

import './App.scss';

const App = () => (
  <>
    <header>
      <NavBar />
    </header>
    <main>
      <div className="container">
        <LoadingSpinner />
        <Routes />
      </div>
    </main>
  </>
);

export default App;
