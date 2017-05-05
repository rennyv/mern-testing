import React from 'react';
import BugAdd from '../src/BugAdd.jsx';

describe('BugAdd item', () => {
  const wrapper = shallow(<BugAdd />);

  it('should be in a div', () => {
      expect(wrapper.type()).to.eql('div');
  });
});
