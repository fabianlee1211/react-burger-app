import React from 'react';
import { shallow } from 'enzyme';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// Each test runs independently
describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render 2 NavigationItem elements if no auth', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render 3 NavigationItem elements if auth', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
