import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';

describe('<Input />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Input />);
  });

  it('renders Input correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a label', () => {
    wrapper.setProps({ label: 'Testing Label' });
    expect(wrapper.find('label.Label')).toHaveLength(1);
    expect(wrapper.find('label.Label').text()).toBe('Testing Label');
  });

  it('renders different input types', () => {
    const elementTypes = ['input', 'textarea', 'select'];
    const options = [{ value: 'test', displayValue: 'Test' }];
    const wrapper = shallow(<Input elementConfig={{ options }} />);
    elementTypes.forEach(element => {
      wrapper.setProps({ elementType: element });
      expect(wrapper.find(element)).toHaveLength(1);
      if (element === 'select') expect(wrapper.find('option')).toHaveLength(1);
    });
  });

  it('renders error message when invalid', () => {
    const wrapper = shallow(<Input invalid touched shouldValidate />);
    expect(wrapper.find('p.ErrorMessage')).toHaveLength(1);
  });

  it('can call onChange', () => {
    const onChange = jest.fn();
    wrapper.setProps({ changed: onChange });
    wrapper.find('input').simulate('change', 'Test');
    expect(onChange).toHaveBeenCalledWith('Test');
  });
});
