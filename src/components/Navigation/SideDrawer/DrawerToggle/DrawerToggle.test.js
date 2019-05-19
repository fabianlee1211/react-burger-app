import React from 'react';
import { shallow } from 'enzyme';
import DrawerToggle from './DrawerToggle';

describe('<DrawerToggle />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DrawerToggle />);
  });

  it('renders DrawerToggle correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has 3 empty div', () => {
    expect(wrapper.children()).toHaveLength(3);
    wrapper.children().forEach(child => {
      expect(child.equals(<div />)).toBeTruthy();
    });
  });

  it('should trigger onClick', () => {
    const clickFn = jest.fn();
    wrapper.setProps({ clicked: clickFn });
    wrapper.find('.DrawerToggle').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
