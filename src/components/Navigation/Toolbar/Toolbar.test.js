import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Toolbar />);
  });

  it('renders Toolbar correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains 3 children node', () => {
    expect(wrapper.children()).toHaveLength(3);
  });

  it('renders a Logo and DrawerToggle', () => {
    expect(wrapper.find('DrawerToggle')).toHaveLength(1);
    expect(wrapper.find('Logo')).toHaveLength(1);
  });
});
