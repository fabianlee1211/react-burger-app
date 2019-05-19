import React from 'react';
import { shallow } from 'enzyme';
import Backdrop from './Backdrop';

describe('<Backdrop />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Backdrop show={true} />);
  });

  it('renders Backdrop correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders null when show props is false', () => {
    wrapper.setProps({ show: false });
    expect(wrapper.html()).toBeNull();
  });

  it('can be clicked', () => {
    const clickFn = jest.fn();
    wrapper.setProps({ clicked: clickFn });
    wrapper.find('div.Backdrop').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
