import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Widget from '../src/components/widget';
import RiskLevelSelector from '../src/components/risk-level-selector';
import { Steps, Typography, Divider, Input, Button } from 'antd';
import cones from '../cones.json';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  wrapper = mount(<Widget cones={cones} />);
});

afterAll(() => {
  wrapper.unmount();
});

describe('testing Widget component', () => {
  it('should render values and child components correctly', () => {
    expect(wrapper.find(Steps).length).toEqual(1);
    expect(wrapper.find(Steps.Step).length).toEqual(3);
    expect(wrapper.find(Steps.Step).get(0).props.title).toEqual(
      'Initial Investment'
    );
    expect(wrapper.find(Steps.Step).get(1).props.title).toEqual('Risk Level');
    expect(wrapper.find(Steps.Step).get(2).props.title).toEqual('Result');
    expect(wrapper.find(Typography.Title).text()).toEqual(
      'Initial investment '
    );
    expect(wrapper.find(Divider).length).toEqual(2);
    expect(wrapper.find(Input).length).toEqual(1);
    wrapper.find(Button).simulate('click');
    expect(wrapper.find(Typography.Title).text()).toEqual('Risk Level');
    expect(wrapper.find(RiskLevelSelector).length).toEqual(1);
  });
});
