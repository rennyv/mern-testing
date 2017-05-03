import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import BugList from './BugList.jsx';
import BugEdit from './BugEdit.jsx';

const NoMatch = () => <h2>No match to the route</h2>;

class App extends React.Component {
    render() {
        return (
          <Router>
            <Switch>
              <Route path="/bugs/:id" component={BugEdit} />
              <Redirect exact from="/" to="/bugs" />
              <Route path="/bugs" component={BugList} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </Router>
        );
    }
  }

export default App;
