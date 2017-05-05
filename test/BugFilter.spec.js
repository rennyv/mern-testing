import React from 'react';
import BugFilter from '../src/BugFilter.jsx';

describe('BugEdit item', () => {
  const wrapper = shallow(<BugFilter initFilter='{initFilter: { status: "New" }}'/>);

  it('should be a div', () => {
    expect(wrapper.type()).to.eql('div');
  });
});
