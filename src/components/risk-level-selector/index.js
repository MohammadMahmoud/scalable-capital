import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

const RiskLevelSelector = ({ onChange, defaultRiskLevel, maxRiskLevel }) => {
  //State that store the risk levels
  const [riskLevels, setRiskLevels] = useState([]);

  //initialized the risk level once the component initialized
  useEffect(() => {
    const risklevelsArray = [];
    for (let level = 3; level <= maxRiskLevel; ++level) {
      risklevelsArray.push(level);
    }
    setRiskLevels(risklevelsArray);
  }, []);

  return (
    <div>
      Risk level:
      <br />
      <Select
        onChange={(riskLevel) => onChange(riskLevel)}
        defaultValue={defaultRiskLevel}
        style={{ width: 200 }}
      >
        {riskLevels.map((level, index) => (
          <Select.Option key={index} value={level}>
            {level}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

RiskLevelSelector.defaultProps = {
  minRiskLevel: 3,
  maxRiskLevel: 25,
  onChange: () => {},
};

RiskLevelSelector.propTypes = {
  minRiskLevel: PropTypes.number,
  maxRiskLevel: PropTypes.number,
  onChange: PropTypes.func,
};

export default RiskLevelSelector;
