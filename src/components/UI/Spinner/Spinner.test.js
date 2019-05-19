import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';
import { type } from 'os';
import { finished } from 'stream';

describe('<Spinner />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Spinner />);
  });

  it('renders Spinner correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with class Loader', () => {
    expect(wrapper.find('div.Loader')).toHaveLength(1);
  });

  it('renders Loading text', () => {
    expect(wrapper.text()).toBe('Loading...');
  });
});
