import React  from 'react';
import ReactDOM from 'react-dom';

export default class BugFilter extends React.Component {
    render() {
        console.log("Rendering BugFilter, state=", this.state);
        return (
            <div>
                <h3>Filter</h3>
                Status:
                <select value={this.state.status} onChange={this.onChangeStatus}>
                    <option value="">(Any)</option> 
                    <option value="New">New</option> 
                    <option value="Open">Open</option> 
                    <option value="Closed">Closed</option> 
                </select> 
                <br />
                Priority:
                <select value={this.state.priority} onChange={this.onChangePriority}>
                    <option value="">(Any)</option> 
                    <option value="P1">P1</option> 
                    <option value="P2">P2</option> 
                    <option value="P3">P3</option> 
                </select> 
                <br/>
                <button onClick={this.submit}>Apply</button>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            status: this.props.initFilter.status,
            priority: this.props.initFilter.priority,
        };

        this.submit = this.submit.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.initFilter.status == this.state.status
            && newProps.initFilter.priority === this.state.priority) { 
            console.log("BugFilter: componentWillReceiveProps, no change"); 
            return;
        }
        console.log("BugFilter: componentWillReceiveProps, new filter:", newProps.initFilter); 
        this.setState({status: newProps.initFilter.status, priority: newProps.initFilter.priority}); 
    }

    onChangeStatus(e) {
        this.setState({status: e.target.value});
    }

    onChangePriority(e) {
        this.setState({priority: e.target.value});
    }

    submit(e) {
        var newFilter = {};
        if (this.state.priority) newFilter.priority = this.state.priority;
        if (this.state.status) newFilter.status = this.state.status;
        this.props.submitHandler(newFilter);
    }
};
