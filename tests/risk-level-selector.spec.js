import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Select } from 'antd';
import RiskLevelSelector from '../src/components/risk-level-selector';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

beforeAll(() => {
  wrapper = mount(
    <RiskLevelSelector
      onChange={(value) => console.log(value)}
      defaultRiskLevel={10}
      maxRiskLevel={25}
    />
  );
});

afterAll(() => {
  wrapper.unmount();
});

describe('testing RiskLevelSelector component', () => {
  it('should have selector with default value of 10', () => {
    expect(wrapper.find(Select).length).toEqual(1);
    expect(wrapper.find(Select).props().defaultValue).toEqual(10);
  });
});
