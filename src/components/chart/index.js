import React, { useRef, useEffect } from 'react';
import { Chart as ChartJs } from 'chart.js';
import PropTypes from 'prop-types';

const Chart = ({ labels, dataGood, dataMedian, dataBad }) => {
  //Using Ref Hook
  const canvas = useRef();
  //Draw Chart once component initialized
  useEffect(() => {
    drawChart();
  }, [labels]);

  const drawChart = () => {
    const data = {
      datasets: [
        {
          data: dataGood,
          label: 'Good performance',
          borderColor: 'rgba(100, 255, 100, 0.2)',
          fill: false,
          pointRadius: 0,
        },
        {
          data: dataMedian,
          label: 'Median performance',
          borderColor: 'rgba(100, 100, 100, 0.2)',
          fill: false,
          pointRadius: 0,
        },
        {
          data: dataBad,
          label: 'Bad performance',
          borderColor: 'rgba(255, 100, 100, 0.2)',
          fill: false,
          pointRadius: 0,
        },
      ],
      labels,
    };

    const options = {
      responsive: false,
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Years',
            },
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Valuation (EUR)',
            },
          },
        ],
      },
    };

    const config = {
      type: 'line',
      data,
      options,
    };

    const context = canvas.current.getContext('2d');
    new ChartJs(context, config);
  };

  return (
    <canvas
      ref={canvas}
      width={600}
      height={400}
      style={{ margin: 'auto', width: '60%' }}
    />
  );
};

Chart.propTypes = {
  labels: PropTypes.array,
  dataGood: PropTypes.array,
  dataMedian: PropTypes.array,
  dataBad: PropTypes.array,
};

export default Chart;
