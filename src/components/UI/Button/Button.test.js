import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Button btnType='Success' disabled clicked={() => {}} />);
  });

  it('renders Button correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Success / Danger type Button', () => {
    wrapper.setProps({ btnType: 'Success' });
    expect(wrapper.find('button.Button.Success')).toHaveLength(1);
    wrapper.setProps({ btnType: 'Danger' });
    expect(wrapper.find('button.Button.Danger')).toHaveLength(1);
  });

  it('renders a disabled button', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('button').props().disabled).toBe(true);
  });

  it('renders Button text', () => {
    wrapper.setProps({ children: 'Click Here' });
    expect(wrapper.find('button').text()).toBe('Click Here');
  });

  it('can be clicked', () => {
    const clickFn = jest.fn();
    wrapper.setProps({ clicked: clickFn });
    wrapper.find('button').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
