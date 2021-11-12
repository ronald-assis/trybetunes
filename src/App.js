import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Login />
          <Home />
          <NotFound />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
