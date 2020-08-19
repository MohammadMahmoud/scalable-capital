const React = require('react');
import PropTypes from 'prop-types';
import { Table as TableComponent } from 'antd';

const Table = ({ months, dataGood, dataMedian, dataBad }) => {
  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
    },
    {
      title: 'Good',
      dataIndex: 'good',
    },
    {
      title: 'Median',
      dataIndex: 'median',
    },
    {
      title: 'Bad',
      dataIndex: 'bad',
    },
  ];

  const data = months.map((entry, idx) => ({
    key: idx,
    month: entry,
    good: dataGood[idx],
    median: dataMedian[idx],
    bad: dataBad[idx],
  }));

  return (
    <TableComponent
      columns={columns}
      dataSource={data}
      pagination={{ simple: true }}
      pageSize={5}
    />
  );
};

Table.propTypes = {
  months: PropTypes.array,
  dataGood: PropTypes.array,
  dataMedian: PropTypes.array,
  dataBad: PropTypes.array,
};

export default Table;
