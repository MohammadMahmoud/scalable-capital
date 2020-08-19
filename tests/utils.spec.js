import { getInvestmentCalculation } from '../src/utils';
import cones from '../cones.json';

describe('test suits for the calculation in utils', () => {
  it('should get investment calculation with risk level 3 and initial sum 10000', () => {
    const result = getInvestmentCalculation(3, cones, 10000);

    expect(result.dataGood[2]).toEqual(10571.081737643844);
    expect(result.dataMedian[2]).toEqual(10419.54546107991);
    expect(result.dataBad[2]).toEqual(10270.18145445814);
  });

  it('should get investment calculation with risk level 10 and initial sum 55871', () => {
    const result = getInvestmentCalculation(10, cones, 55871);

    expect(result.dataGood[2]).toEqual(58271.77587103792);
    expect(result.dataMedian[2]).toEqual(56567.49530423458);
    expect(result.dataBad[2]).toEqual(54913.06000483492);
  });
});
