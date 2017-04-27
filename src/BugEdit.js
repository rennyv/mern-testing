var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router-dom').Link

var BugEdit = React.createClass({
    render: function(){
        console.log("params: ", this.props.match.params)
        return (
            <div>
                Edit bug: {this.props.match.params.id}
                <br />
                <form onSubmit={this.submit}>
                    <select name="priority" value={this.state.priority} onChange={this.onChangePriority}> 
                        <option value="P1">P1</option> 
                        <option value="P2">P2</option> 
                        <option value="P3">P3</option> 
                    </select> 
                    <br/> 
                    Status: 
                    <select value={this.state.status} onChange={this.onChangeStatus}> 
                        <option>New</option> 
                        <option>Open</option> 
                        <option>Fixed</option> 
                        <option>Closed</option> 
                    </select> 
                    <br/> 
                    Owner: <input type="text" value={this.state.owner} onChange={this.onChangeOwner}/> 
                    <br/> 
                    Title: <input type="text" value={this.state.title} onChange={this.onChangeTitle}/> 
                    <br/> 
                    <button type="submit">Submit</button><Link to="/bugs">Back to bugs</Link>
                </form>
            </div>
        );
    },

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        this.loadData();
    },

    componentDidUpdate: function(prevProps) {
        console.log("BugEdit: componentDidUpdate", prevProps.match.params.id, this.props.match.params.id);
        if (this.props.match.params.id != prevProps.match.params.id) {
            this.loadData();
        }
    },

    loadData: function() { 
        $.ajax('/api/bugs/' + this.props.match.params.id) .done(function(bug) { 
            this.setState(bug); 
        }.bind(this)); 
    },

    onChangePriority: function(e) { 
        this.setState({priority: e.target.value}); 
    },

    onChangeStatus: function(e) { 
        this.setState({status: e.target.value}); 
    },

    onChangeOwner: function(e) { 
        this.setState({owner: e.target.value}); 
    }, 

    onChangeTitle: function(e) { 
        this.setState({title: e.target.value}); 
    },

    submit: function(e) { 
        e.preventDefault(); 
        var bug = { 
            status: this.state.status, 
            priority: this.state.priority, 
            owner: this.state.owner, 
            title: this.state.title 
        } 
    
        $.ajax({ 
            url: '/api/bugs/' + this.props.match.params.id, type: 'PUT', contentType:'application/json', 
            data: JSON.stringify(bug), 
            dataType: 'json', 
            success: function(bug) { 
                this.setState(bug); 
            }.bind(this), 
        });
    }
});

module.exports = BugEdit;