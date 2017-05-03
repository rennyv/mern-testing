import React from 'react';
import queryString from 'query-string';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import BugFilter from './BugFilter.jsx';
import BugAdd from './BugAdd.jsx';

/*
 * BugRow and BugTable are stateless, so they can be defined as pure functions
 * that only render. Both the following do the same, but with slightly different
 * styles.

 */
class BugRow extends React.Component {
    render() {
        // console.log("Rendering BugRow:", this.props.bug);
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
        );
    }
}

class BugTable extends React.Component {
    render() {
        // console.log("Rendering bug table, num items:", this.props.bugs.length);
        const bugRows = this.props.bugs.map(function(bug) {
            return <BugRow key={ bug._id } bug={bug} />;
        });
        return (
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
        );
    }
}

export default class BugList extends React.Component {
    static get getInitialState() {
        return { bugs: [] };
    }

    constructor() {
        super();
    /*
     * Using ES6 way of intializing state
     */

        this.state = { bugs: [] };
    /*
     * React on ES6 has no auto-binding. We have to bind each class method. Doing it in
     * the constructor is the recommended way, since it is bound only once per instance.
     * No need to bind loadData() since that's never called from an event, only from other
     * methods which are already bound.
     */

        this.addBug = this.addBug.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }

    componentDidMount() {
        console.log('BugList: componentDidMount');
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const oldQuery = queryString.parse(prevProps.location.search);
        const newQuery = queryString.parse(this.props.location.search);

        if (oldQuery.priority === newQuery.priority &&
            oldQuery.status === newQuery.status) {
            console.log('BugList: componentDidUpdate, no change in filter, not updating');
        } else {
            console.log('BugList: componentDidUpdate, loading data with new filter');
            this.loadData();
        }
    }

    loadData() {
        const query = queryString.parse(this.props.location.search) || {};
        const filter = { priority: query.priority, status: query.status };

        $.ajax('/api/bugs', { data: filter }).done(function (data) {
            this.setState({ bugs: data });
        }.bind(this));
        // In production, we'd also handle errors.
    }

    changeFilter(newFilter) {
        this.props.history.push({search: '?' + queryString.stringify(newFilter)}); 
    }

    addBug(bug) {
        console.log('Adding bug:', bug);
        $.ajax({
            type: 'POST',
            url: '/api/bugs',
            contentType: 'application/json',
            data: JSON.stringify(bug),
            success: function success(data) {
                const bbug = data;
                // We're advised not to modify the state, it's immutable. So, make a copy.
                const bugsModified = this.state.bugs.concat(bbug);
                this.setState({ bugs: bugsModified });
            }.bind(this),
            error: (xhr, status, err) => {
                // ideally, show error to user.
                console.log('Error adding bug:', err);
            },
        });
    }

    render() {
        // console.log("Rendering bug list, num items:", this.state.bugs.length);
        return (
          <div>
            <h1>Bug Tracker</h1>
            <BugFilter 
              submitHandler={this.changeFilter}
              initFilter={queryString.parse(this.props.location.search)}
            />
            <hr />
            <BugTable bugs={this.state.bugs} />
            <hr />
            <BugAdd addBug={this.addBug} />
          </div>
        );
    }
}
