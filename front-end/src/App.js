import React, {Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ContactState from './Context/Contacts/ContactState';
import AuthState from './Context/Auth/AuthState';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment className="App">
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
}

export default App;
