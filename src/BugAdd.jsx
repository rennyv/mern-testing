import React from 'react';

export default class BugAdd extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        const form = this.document.forms.bugAdd;
        this.props.addBug({ owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1' });
        // clear the form for the next input
        form.owner.value = '';
        form.title.value = '';
    }
}
