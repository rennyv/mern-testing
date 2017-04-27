var React = require('react');
var ReactDOM = require('react-dom');
var queryString = require('query-string');
var $ = require('jquery');
var Link = require('react-router-dom').Link; 

var BugFilter = require('./BugFilter'); 
var BugAdd = require('./BugAdd'); 

var BugRow = React.createClass({
    render: function() {
        //console.log("Rendering BugRow:", this.props.bug);
        return (
            <tr>
                <td>
                    <Link to={'/bugs/' + this.props.bug._id}>{this.props.bug._id}</Link>
                </td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
            </tr>
        )
    }
});

var BugTable = React.createClass({
    render: function(){
        //console.log("Rendering bug table, num items:", this.props.bugs.length);
        var bugRows = this.props.bugs.map(function(bug) {
            return <BugRow key={bug._id} bug={bug} />
        });
        return(
           <table>
               <thead>
                   <tr>
                       <th>Id</th>
                       <th>Status</th>
                       <th>Priority</th>
                       <th>Owner</th>
                       <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {bugRows}
                </tbody>
            </table>
        )
    }
});

var BugList = React.createClass({
    getInitialState: function() {
        return {bugs: []};
    },
    render: function() {
        //console.log("Rendering bug list, num items:", this.state.bugs.length);
        qs = queryString.parse(this.props.location.search);
        return (
            <div>
                <h1>Bug Tracker</h1>
                <BugFilter submitHandler={this.changeFilter} initFilter={qs} />
                <hr />
                <BugTable bugs={this.state.bugs} />
                 <hr />
                <BugAdd addBug={this.addBug} />
            </div>
        )
    },

    componentDidMount: function() {
        console.log("BugList: componentDidMount");
        this.loadData();
    },

    componentDidUpdate: function(prevProps){
        var oldQuery = queryString.parse(prevProps.location.search);
        var newQuery = queryString.parse(this.props.location.search);  

        if (oldQuery.priority === newQuery.priority && 
            oldQuery.status === newQuery.status) { 
            console.log("BugList: componentDidUpdate, no change in filter, not updating"); 
            return; 
        } else {
            console.log("BugList: componentDidUpdate, loading data with new filter"); 
            this.loadData(); 

        }
    },

    loadData: function(filter) {
        var query = queryString.parse(this.props.location.search) || {}; 
        var filter = {priority: query.priority, status: query.status}; 
        
        $.ajax('/api/bugs', {data: filter}).done(function(data){
            this.setState({bugs: data});
        }.bind(this));
        // In production, we'd also handle errors.
    },

    changeFilter: function(newFilter) {
        this.props.history.push({search: '?' + queryString.stringify(newFilter)}); 
    },

    addBug: function(bug) {
        console.log("Adding bug:", bug);
        $.ajax({
            type: 'POST', url: '/api/bugs', contentType: 'application/json',
            data: JSON.stringify(bug),
            success: function(data) {
                var bug = data;
                // We're advised not to modify the state, it's immutable. So, make a copy.
                var bugsModified = this.state.bugs.concat(bug);
                this.setState({bugs: bugsModified});
            }.bind(this),
            error: function(xhr, status, err) {
                // ideally, show error to user.
                console.log("Error adding bug:", err);
            }
        });
    }
});

module.exports = BugList; 