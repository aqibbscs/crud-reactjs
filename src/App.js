import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './App.css'

import Home from './components/Home';
// import Create from './components/Create';
import CreateWithValidation from './components/CreateWithValidation'
import Edit from './components/Edit'
// import DataTable from './components/DataTable'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={CreateWithValidation} />
            <Route path="/edit/:id" component={Edit} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;