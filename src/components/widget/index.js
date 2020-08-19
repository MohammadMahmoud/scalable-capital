import React, { useState, useEffect } from 'react';
import { Steps, Button, Modal, Input, Typography, Divider } from 'antd';
import Chart from '../chart';
import Table from '../table';
import RiskLevelSelector from '../risk-level-selector';
import { getInvestmentCalculation } from '../../utils';
import PropTypes from 'prop-types';
import './style.css';

const Widget = ({ cones }) => {
  //State to control steps component
  const [steps, setSteps] = useState(0);
  //State to store calculation
  const [calculation, setCalculation] = useState({});
  //State to control initial investment input value
  const [initialInvestment, setInitialInvestment] = useState(10000);
  //State to control risk level selector value
  const [riskLevel, setRiskLevel] = useState(3);
  //State to show error if the initial investment input has error
  const [hasInputError, setHasInputError] = useState(false);
  //State to control showing the investment table
  const [showTable, setShowTable] = useState(false);

  //To load the calcaution once component initialized or changes happen to cones , risk level and initial investment
  useEffect(() => {
    if (cones) {
      setCalculation(
        getInvestmentCalculation(riskLevel, cones, initialInvestment)
      );
    }
  }, [cones, riskLevel, initialInvestment]);

  // Handle steps changes and show model if someone want start over
  const handleSteps = () => {
    if (steps < 2) {
      setSteps((prev) => prev + 1);
    } else {
      setSteps(3);
      Modal.confirm({
        title: 'Restart',
        content: 'Would you like to start over ?',
        onOk: () => setSteps(0),
      });
    }
  };

  // Handle initial investment changes and small input validation
  const handleInitialInvestment = (e) => {
    const value = parseInt(e.target.value);
    if (value < 10000 || isNaN(value)) {
      setHasInputError(true);
      return;
    } else {
      setHasInputError(false);
    }
    setInitialInvestment(value);
  };

  return (
    <div className='widget'>
      <Steps current={steps}>
        <Steps.Step title='Initial Investment' />
        <Steps.Step title='Risk Level' />
        <Steps.Step title='Result' />
      </Steps>
      {steps === 0 && (
        <div className='content'>
          <Typography.Title>Initial investment </Typography.Title>
          <Typography.Paragraph>
            Initial investment is the amount required to start the investment.
            It is also called initial investment outlay or simply initial
            outlay. It equals capital expenditures plus working capital
            requirement plus after-tax proceeds from assets disposed off or
            available for use elsewhere
          </Typography.Paragraph>
          <Divider />
          Initial Investment Amount :
          <br />
          <Input
            defaultValue={initialInvestment}
            onChange={handleInitialInvestment}
            suffix='€'
            placeholder={'10000'}
          />
          <br />
          {hasInputError && (
            <span className='has-error'>
              This field is required , Minimum Amount is 10000 and it should be
              number
            </span>
          )}
        </div>
      )}
      {steps === 1 && (
        <div className='content'>
          <Typography.Title>Risk Level</Typography.Title>
          <Typography.Paragraph>
            Your “Risk Level” is how much risk you are willing to accept to get
            a certain level of reward; riskier stocks are both the ones that can
            lose the most or gain the most over time.
          </Typography.Paragraph>
          <Divider />
          <RiskLevelSelector
            defaultRiskLevel={riskLevel}
            onChange={(riskLevel) => setRiskLevel(riskLevel)}
          />
        </div>
      )}
      {steps >= 2 && cones && (
        <div className='content'>
          <Chart {...calculation} />
          {showTable && (
            <>
              <Divider />
              <Table {...calculation} />
            </>
          )}
          <Button type='primary' onClick={() => setShowTable((prev) => !prev)}>
            {!showTable ? 'Show' : 'Hide'} Investment Table
          </Button>
        </div>
      )}
      <Divider />
      <div className='footer'>
        <Button type='primary' onClick={handleSteps} disabled={hasInputError}>
          {steps >= 2 ? 'Start Over' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

Widget.propTypes = {
  cones: PropTypes.array,
};

export default Widget;
