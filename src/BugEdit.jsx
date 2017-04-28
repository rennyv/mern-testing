import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';

export default class BugEdit extends React.Component {
  
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.state = { successVisible: false, bug: {} };
  }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        console.log("BugEdit: componentDidUpdate", prevProps.match.params.id, this.props.match.params.id);
        if (this.props.match.params.id != prevProps.match.params.id) {
            this.loadData();
        }
    }

    loadData() { 
        $.ajax('/api/bugs/' + this.props.match.params.id) .done(function(bug) { 
            this.setState(bug); 
        }.bind(this)); 
    }

    onChangePriority(e) { 
        this.setState({priority: e.target.value}); 
    }

    onChangeStatus(e) { 
        this.setState({status: e.target.value}); 
    }

    onChangeOwner(e) { 
        this.setState({owner: e.target.value}); 
    } 

    onChangeTitle(e) { 
        this.setState({title: e.target.value}); 
    }

    submit(e) { 
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

  render() {
    console.log('params: ', this.props.match.params);
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
    }
}
