import logo from './logo.svg';
import './App.css';
import React from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import State from './Components/State/state'
import District from './Components/District/district'

function App() {
  return (
    <div className="body">
      <h1>COVID19</h1>
      <Router>
        <Route exact path='/' component={State}></Route>
        <Route exact path="/state/:id" component={District}></Route>
      </Router>
    </div>
  );
}

export default App;
