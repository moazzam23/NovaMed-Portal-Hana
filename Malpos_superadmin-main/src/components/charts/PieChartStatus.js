// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import axios from 'axios';
// import { BASE_URL } from '../../apis/NodeApiUrl';

// const COLORS = ['#FFBB28', 'lightblue', '#00C49F', 'red']; // Adjust as needed

// const PieChartStatus = () => {
//   const [data, setData] = useState([]);
//   const companyDB = localStorage.getItem("companyDB");
//   useEffect(() => {
//     const fetchStatusCounts = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/documents/document-status-summary?CompanyDB=${companyDB}`);
//         const counts = response.data.statusCounts;

//         // Transform into array format for Recharts
//         const chartData = [
//           { name: 'Pending', value: counts.pending },
//           { name: 'In Progress', value: counts.in_progress },
//           { name: 'Approved', value: counts.approved },
//           { name: 'Rejected', value: counts.rejected }
//         ];

//         setData(chartData);
//       } catch (error) {
//         console.error('Error fetching document status summary:', error);
//       }
//     };

//     fetchStatusCounts();
//   }, []);

//   return (
//     <ResponsiveContainer width="100%" height={360}>
//       <PieChart>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="name"
//           outerRadius={100}
//           label
//         >        {data.map((entry, index) => (
//             <Cell key={index} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default PieChartStatus;

import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../apis/NodeApiUrl';

const COLORS = ['#FFBB28', '#82ca9d', '#00C49F', '#FF6B6B'];

const RADIAN = Math.PI / 180;

// Custom label with percentage
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ fontWeight: 'bold', fontSize: 12, fontFamily: 'Segoe UI' }}
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: 8,
          fontFamily: 'Segoe UI',
        }}
      >
        <strong>{name}</strong>: {value}
      </div>
    );
  }
  return null;
};

const PieChartStatus = () => {
  const [data, setData] = useState([]);
  const companyDB = localStorage.getItem('companyDB');

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/documents/document-status-summary?CompanyDB=${companyDB}`);
        const counts = response.data.statusCounts;

        const chartData = [
          { name: 'Pending', value: counts.pending },
          { name: 'In Progress', value: counts.in_progress },
          { name: 'Approved', value: counts.approved },
          { name: 'Rejected', value: counts.rejected }
        ].filter(d => d.value > 0); // Remove empty values

        setData(chartData);
      } catch (error) {
        console.error('Error fetching document status summary:', error);
      }
    };

    fetchStatusCounts();
  }, []);

  return (
    <div style={{
      width: '100%',
      height: 400,
      // background: '#fff',
      // borderRadius: 16,
      // boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      // padding: '20px',
      fontFamily: 'Segoe UI'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: 20, fontWeight: 600, color: '#333' }}>
        Inventory Request Documents Status
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            labelLine={false}
            label
            isAnimationActive
            >
            
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => <span style={{ fontSize: 14, color: '#555' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartStatus;
