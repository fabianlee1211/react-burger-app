import React from 'react';
import { shallow } from 'enzyme';
import NavigationItem from './NavigationItem';

describe('<NavigationItem />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItem link='/' />);
  });

  it('renders NavigationItem correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has NavigationItem class', () => {
    expect(wrapper.find('.NavigationItem')).toHaveLength(1);
  });

  it('renders NavigationItem correctly with given props', () => {
    wrapper.setProps({ link: '/home', exact: false, children: 'Hello' });
    expect(wrapper.find('NavLink').props().to).toBeDefined();
    expect(wrapper.find('NavLink').props().exact).toBeFalsy();
    expect(
      wrapper
        .find('NavLink')
        .children()
        .text()
    ).toEqual('Hello');
  });
});
