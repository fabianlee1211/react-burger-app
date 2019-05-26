import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

describe('<Logo />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Logo />);
  });

  it('renders Logo correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a div and image', () => {
    const logo = wrapper.find('div.Logo');
    expect(logo).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('receives height props', () => {
    wrapper.setProps({ height: 10 });
    const logo = wrapper.find('div.Logo');
    expect(logo.props().style.height).toBe(10);
  });
});
