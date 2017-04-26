var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router-dom').BrowserRouter; 
var Switch = require('react-router-dom').Switch; 
var Route = require('react-router-dom').Route; 
var Redirect = require('react-router-dom').Redirect; 

var BugList = require('./BugList'); 

var NoMatch = React.createClass({ 
  render: function() { 
    return ( 
      <h2>No match for the route</h2> 
    ); 
  } 
});

ReactDOM.render(
    <Router>
      <Switch>
          <Redirect exact from="/" to="/bugs" />
          <Route path="/bugs" component={BugList} />
          <Route path='*' component={NoMatch} />
       </Switch>  
    </Router>,
    document.getElementById('main')
);