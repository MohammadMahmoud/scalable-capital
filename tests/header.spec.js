import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../src/components/header';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

beforeAll(() => {
  wrapper = mount(<Header />);
});

afterAll(() => {
  wrapper.unmount();
});

describe('testing Header component', () => {
  it('should find the logo inside the header', () => {
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('img').props().src).toEqual(
      'https://d27i7n2isjbnbi.cloudfront.net/careers/photos/70000/thumb_photo_1528705764.png'
    );
  });
});
