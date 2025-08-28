// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import axios from 'axios';
// import { BASE_URL } from '../../apis/NodeApiUrl';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a56eff', '#FF6666', '#00BFA6'];

// const PieChartRoles = () => {
//   const [data, setData] = useState([]);
//   const companyDB = localStorage.getItem("companyDB");

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/api/dashboard/roles?companyDB=${companyDB}`);
//         const roles = res.data.roles;

//         // Transform into chart-friendly format
//         const chartData = roles.map(role => ({
//           name: role.NAME,
//           value: 1 // each role is counted as 1
//         }));

//         setData(chartData);
//       } catch (err) {
//         console.error('Error fetching roles:', err);
//       }
//     };

//     fetchRoles();
//   }, []);

//   return (
//     <div style={{ width: '100%', height: 400 }}>
//       <h4 className="text-center ">Roles Distribution</h4>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={70}
//             outerRadius={100}
//             label={({ name }) => name}
//             stroke="#fff"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip
//             formatter={(value, name) => [`${value} role(s)`, `${name}`]}
//             contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
//           />
//           <Legend
//             verticalAlign="bottom"
//             iconType="circle"
//             wrapperStyle={{ fontSize: '0.85rem' }}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PieChartRoles;
// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
// import axios from 'axios';
// import { BASE_URL } from '../../apis/NodeApiUrl';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a56eff', '#FF6666', '#00BFA6'];

// const PieChartRoles = () => {
//   const [data, setData] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const companyDB = localStorage.getItem("companyDB");

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/api/dashboard/roles?companyDB=${companyDB}`);
//         const roles = res.data.roles;

//         const chartData = roles.map(role => ({
//           name: role.NAME,
//           value: 1
//         }));

//         setData(chartData);
//       } catch (err) {
//         console.error('Error fetching roles:', err);
//       }
//     };

//     fetchRoles();
//   }, []);

//   // Updated label renderer
//   const renderWrappedLabel = ({ name, cx, cy, midAngle, outerRadius }) => {
//     const RADIAN = Math.PI / 180;
//     const maxCharsPerLine = 10;

//     const sin = Math.sin(-RADIAN * midAngle);
//     const cos = Math.cos(-RADIAN * midAngle);

//     const labelRadius = outerRadius + 30; // push label outward
//     const x = cx + labelRadius * cos;
//     const y = cy + labelRadius * sin;

//     const firstLine = name.slice(0, maxCharsPerLine);
//     const secondLine = name.length > maxCharsPerLine ? name.slice(maxCharsPerLine) : '';

//     return (
//       <text x={x} y={y} fill="#333" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
//         <tspan x={x} dy="-0.6em">{firstLine}</tspan>
//         {secondLine && <tspan x={x} dy="1.2em">{secondLine}</tspan>}
//       </text>
//     );
//   };

//   return (
//     <div style={{ width: '100%', height: 400, position: 'relative' }}>
//       <h4 className="text-center">Roles Distribution</h4>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="45%" // move pie up
//             innerRadius={60}
//             outerRadius={100}
//             labelLine={false}
//             label={renderWrappedLabel}
//             onMouseEnter={(_, index) => setActiveIndex(index)}
//             onMouseLeave={() => setActiveIndex(null)}
//             stroke="#fff"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>

//       {/* Center info inside pie */}
//       <div style={{
//         position: 'absolute',
//         top: '48%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         textAlign: 'center',
//         fontSize: '14px',
//         color: '#333'
//       }}>
//         {activeIndex !== null ? (
//           <>
//             <strong>{data[activeIndex].name}</strong><br />
//             {data[activeIndex].value} role(s)
//           </>
//         ) : (
//           <>
//             <strong>Total</strong><br />
//             {data.length} Roles
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PieChartRoles;

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../apis/NodeApiUrl';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a56eff', '#FF6666', '#00BFA6', '#FF99C8'];

const PieChartRoles = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const companyDB = localStorage.getItem("companyDB");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/dashboard/roles?companyDB=${companyDB}`);
        const roles = res.data.roles || [];

        const chartData = roles
          .filter(role => role.NAME && role.NAME.toLowerCase() !== 'unknown')
          .map(role => ({
            name: role.NAME,
            value: 1
          }));

        setData(chartData);
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };

    fetchRoles();
  }, []);

  const renderWrappedLabel = ({ name, cx, cy, midAngle, outerRadius }) => {
    const RADIAN = Math.PI / 180;
    const maxCharsPerLine = 12;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const labelRadius = outerRadius + 30;
    const x = cx + labelRadius * cos;
    const y = cy + labelRadius * sin;

    const firstLine = name.slice(0, maxCharsPerLine);
    const secondLine = name.length > maxCharsPerLine ? name.slice(maxCharsPerLine) : '';

    return (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        <tspan x={x} dy="-0.6em">{firstLine}</tspan>
        {secondLine && <tspan x={x} dy="1.2em">{secondLine}</tspan>}
      </text>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        height: 400,
        // background: 'linear-gradient(145deg, #f3f4f6, #ffffff)',
        // borderRadius: '1rem',
        // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        padding: '1rem',
        position: 'relative'
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>
        🎯 <span style={{ fontWeight: 600 }}>Roles Distribution</span>
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={100}
            labelLine={false}
            label={renderWrappedLabel}
            stroke="#fff"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            isAnimationActive
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{ transition: 'fill 0.3s ease' }}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ fontSize: '14px', borderRadius: '8px' }}
            formatter={(value, name) => [`${value} role(s)`, name]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      <div style={{
        position: 'absolute',
        top: '49%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: activeIndex !== null ? '14px' : '15px',
        fontWeight: '500',
        color: '#444'
      }}>
        {activeIndex !== null ? (
          <>
            <div><strong>{data[activeIndex].name}</strong></div>
            <div>{data[activeIndex].value} Role(s)</div>
          </>
        ) : (
          <>
            <div><strong>Total Roles</strong></div>
            <div>{data.length}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default PieChartRoles;
