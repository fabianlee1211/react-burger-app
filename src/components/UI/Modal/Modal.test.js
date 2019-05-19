import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

describe('<Modal />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Modal />);
  });

  it('renders Modal correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a Backdrop and modal', () => {
    expect(wrapper.find('Backdrop')).toHaveLength(1);
    expect(wrapper.find('div.Modal')).toHaveLength(1);
  });

  it('renders modal children', () => {
    wrapper.setProps({ children: 'Test' });
    expect(wrapper.find('div.Modal').props().children).toBe('Test');
  });
});
