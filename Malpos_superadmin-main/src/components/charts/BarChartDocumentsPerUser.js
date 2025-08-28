// // BarChartDocumentsPerUser.js
// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
// import axios from 'axios';
// import { BASE_URL } from '../../apis/NodeApiUrl';

// const BarChartDocumentsPerUser = () => {
//   const [data, setData] = useState([]);
//     const companyDB = localStorage.getItem("companyDB");

//   useEffect(() => {
//     axios.get(`${BASE_URL}/api/documents/created-per-user?CompanyDB=${companyDB}`)
//     .then((res) => {
//         const safeData = res.data.map((item) => ({
//           user: item.CREATED_BY,
//           count: Number.isFinite(Number(item.COUNT)) ? Number(item.COUNT) : 0,
//         }));
//         console.log(safeData)
//         setData(safeData);})
//   }, []);

  

//   return (
//     <div style={{ width: '100%', height: 400 }}>
//       <h5 className="text-center mb-2 font-semibold">Documents Created Per User</h5>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           <XAxis dataKey="user" angle={-10} textAnchor="end">
//             <Label value="User" offset={-25} position="insideBottom" />
//           </XAxis>
//           <YAxis allowDecimals={false}>
//             <Label value="Documents" angle={-90} position="insideLeft" />
//           </YAxis>
//           <Tooltip />
//           <Bar dataKey="count" fill="#007bff" barSize={50} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default BarChartDocumentsPerUser;

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label,
  Cell
} from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../apis/NodeApiUrl';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6666'];

const BarChartDocumentsPerUser = () => {
  const [data, setData] = useState([]);
  const companyDB = localStorage.getItem("companyDB");

 useEffect(() => {
  axios.get(`${BASE_URL}/api/documents/created-per-user?CompanyDB=${companyDB}`)
    .then((res) => {
      const safeData = res.data
        .filter(item => item.CREATED_BY) // Filter out null/empty creators
        .map(item => ({
          user: item.CREATED_BY,
          count: Number.isFinite(Number(item.COUNT)) ? Number(item.COUNT) : 0,
        }));
      setData(safeData);
    });
}, []);


  return (
    <div style={{
      width: '100%',
      height: 400,
      // background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
      // borderRadius: '1rem',.
      padding: '1.5rem',
      // boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    }}>
      <h4 className="text-center mb-3" style={{ fontWeight: 600, color: '#333' }}>
        📊 Inventory Documents Created Per User
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
          <XAxis dataKey="user" angle={-15} textAnchor="end" tick={{ fontSize: 12 }}>
            <Label value="User" offset={-25} position="insideBottom" style={{ fill: '#555' }} />
          </XAxis>
          <YAxis allowDecimals={false}>
            <Label
              value="Document Count"
              angle={-90}
              position="insideLeft"
              style={{ fill: '#555' }}
            />
          </YAxis>
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#ccc' }} />
          <Bar dataKey="count" fill="#406286ff" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDocumentsPerUser;
