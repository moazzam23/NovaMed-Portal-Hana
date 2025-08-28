// LineChartDocumentsOverTime.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../apis/NodeApiUrl';

const LineChartDocumentsOverTime = () => {
  const [data, setData] = useState([]);
    const companyDB = localStorage.getItem("companyDB");
console.log(companyDB)
  useEffect(() => {
    axios.get(`${BASE_URL}/api/documents/created-over-time?CompanyDB=${companyDB}`).then((res) => {
      console.log('Raw response:', res.data);
      setData(
        res.data.map(d => ({
          month: d.MONTH,
          inventory_requests: parseInt(d.INVENTORY_REQUESTS, 10),
          goods_issues: parseInt(d.GOODS_ISSUES, 10),
          // count: parseInt(d.COUNT, 10),
        }))
      );
    });
  }, []);
  

  return (
    <div style={{ height: 400 }}>
      <h5 className='text-center mb-4' >Documents Created Over Month</h5>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {/* <Line type="monotone" dataKey="count" stroke="#4285f4" /> */}
          {/* <Line
        type="monotone"
        dataKey="count"
        stroke="#4285f4"
        strokeWidth={5}
        dot={{ r: 3 }} // optional: adds small dots at each point
        activeDot={{ r: 5 }}
      />
       */}
      <Line
      type="monotone"
      dataKey="inventory_requests"
      stroke="#4285f4"
      strokeWidth={3}
      dot={{ r: 3 }}
      activeDot={{ r: 5 }}
      name="Inventory Requests"
    />
    <Line
      type="monotone"
      dataKey="goods_issues"
      stroke="#f44336"
      strokeWidth={3}
      dot={{ r: 3 }}
      activeDot={{ r: 5 }}
      name="Goods Issues"
    />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartDocumentsOverTime;
