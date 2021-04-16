import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Routers from './router';
import Header from './views/Header';
import Footer from './views/Footer';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routers />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
