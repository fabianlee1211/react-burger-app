import React from 'react';
import SideDrawer from './SideDrawer';
import { shallow } from 'enzyme';

describe('<SideDrawer />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SideDrawer />);
  });

  it('renders SideDrawer correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a Backdrop', () => {
    expect(wrapper.find('Backdrop')).toHaveLength(1);
  });

  it('renders an opened side menu with backdrop', () => {
    wrapper.setProps({ open: true });
    const backdrop = wrapper.find('Backdrop');
    expect(wrapper.find('div.SideDrawer.Open')).toHaveLength(1);
    expect(backdrop.props().show).toEqual(true);
  });

  it('renders a closed side menu without backdrop', () => {
    wrapper.setProps({ open: false });
    const backdrop = wrapper.find('Backdrop');
    expect(wrapper.find('div.SideDrawer.Close')).toHaveLength(1);
    expect(backdrop.props().show).toEqual(false);
  });

  it('toggles SideDrawer', () => {
    const clickFn = jest.fn();
    wrapper.setProps({ closed: clickFn });
    const backdrop = wrapper.find('Backdrop');
    expect(backdrop.props().clicked).toBe(clickFn);
    wrapper.find('nav').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
