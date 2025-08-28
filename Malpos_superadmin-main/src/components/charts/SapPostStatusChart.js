import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../apis/NodeApiUrl';

const COLORS = ['#82ca9d', '#ff6961']; // green, red

const SapPostStatusChart = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const companyDB = localStorage.getItem('companyDB');

  useEffect(() => {
    const fetchPostStatus = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/documents/sap-post-status-summary?CompanyDB=${companyDB}`);
        const { total, posted, unposted } = res.data;

        setData([
          { name: 'Posted to SAP', value: posted },
          { name: 'Unposted', value: unposted }
        ]);
        setTotal(total);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchPostStatus();
  }, []);

  return (
    <div className="  bg-white p-1" style={{height:"400"}}>
      <h3 className="text-xl font-semibold text-center text-gray-700 mb-3">SAP Inventory Posting Status</h3>
      <p className="text-center text-sm text-gray-600 mb-4">Total Documents: <strong>{total}</strong></p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SapPostStatusChart;
