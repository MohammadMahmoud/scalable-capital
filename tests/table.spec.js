import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from '../src/components/table';
import { getInvestmentCalculation } from '../src/utils';
import { Table as TableComponent } from 'antd';
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
  const props = getInvestmentCalculation(3, cones, 10000);
  wrapper = mount(<Table {...props} />);
});

afterAll(() => {
  wrapper.unmount();
});

describe('testing Table component', () => {
  it('it should have the correct columns and values', () => {
    const columns = [
      { title: 'Month', dataIndex: 'month' },
      { title: 'Good', dataIndex: 'good' },
      { title: 'Median', dataIndex: 'median' },
      { title: 'Bad', dataIndex: 'bad' },
    ];

    expect(wrapper.find(TableComponent).length).toEqual(1);
    expect(wrapper.find(TableComponent).props().columns).toEqual(columns);
    expect(wrapper.find(TableComponent).props().dataSource[2].good).toEqual(
      10571.081737643844
    );
  });
});
