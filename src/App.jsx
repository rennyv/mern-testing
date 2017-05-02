import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'; 

import BugList from './BugList.jsx';
import BugEdit from './BugEdit.jsx';

const NoMatch = () => <h2>No match to the route</h2>;

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/bugs/:id" component={BugEdit} />
      <Redirect exact from="/" to="/bugs" />
      <Route path="/bugs" component={BugList} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </Router>,
  this.document.getElementById('main');
)