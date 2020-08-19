import React from 'react';
import Chart from '../src/components/chart';
import { getInvestmentCalculation } from '../src/utils';
import cones from '../cones.json';
import renderer from 'react-test-renderer';

describe('testing Chart component', () => {
  it('should render correctly', () => {
    const props = getInvestmentCalculation(10, cones, 10000);
    const tree = renderer.create(<Chart {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
