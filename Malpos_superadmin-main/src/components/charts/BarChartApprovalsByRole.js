// // BarChartApprovalsByRole.js
// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import axios from 'axios';
// import { BASE_URL } from '../../apis/NodeApiUrl';

// const BarChartApprovalsByRole = () => {
//   const [data, setData] = useState([]);
//   const companyDB = localStorage.getItem("companyDB");

//   // useEffect(() => {
//   //   axios.get(`${BASE_URL}/approvals/count-by-role?CompanyDB=${companyDB}`).then((res) => {
//   //     const safeData = res.data.map((r) => ({
//   //       role: r.ROLE_NAME ?? 'Unknown',
//   //       count: Number.isFinite(Number(r.COUNT)) ? Number(r.COUNT) : 0,
//   //     }));
//   //     setData(safeData);
//   //   });
//   // }, []);
  
// useEffect(() => {
//   axios.get(`${BASE_URL}/approvals/count-by-role?CompanyDB=${companyDB}`).then((res) => {
//     const temp = [];

//     res.data.forEach((r) => {
//       let roles = ['Unknown'];

//       if (r.ROLE_NAMES) {
//         try {
//           const parsed = JSON.parse(r.ROLE_NAMES);
//           if (Array.isArray(parsed)) {
//             roles = parsed;
//             console.log(roles,parsed)
//           } else {
//             roles = [String(parsed)];
//           }
//         } catch {
//           roles = [r.ROLE_NAMES];
//         }
//       }

//       roles.forEach((role) => {
//         temp.push({
//           role,
//           count: Number.isFinite(Number(r.COUNT)) ? Number(r.COUNT) : 0,
//         });
//       });
//     });

//     // Optional: Group by role and sum counts if duplicates exist
//     const grouped = temp.reduce((acc, item) => {
//       acc[item.role] = (acc[item.role] || 0) + item.count;
//       return acc;
//     }, {});
    
//     const finalData = Object.entries(grouped).map(([role, count]) => ({ role, count }));

//     setData(finalData);
//   });
// }, []);



//   return (
//     <div style={{ height: 400 }}>
//       <h5 className='text-center mb-3' >Approvals by Role</h5>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={data} margin={{ bottom: 50 }}>
//           <CartesianGrid strokeDasharray="5 5" vertical={false} />
//           <XAxis dataKey="role" angle={-30} textAnchor="end" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="count" fill="#34a853" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default BarChartApprovalsByRole;

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList,
} from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../apis/NodeApiUrl';

const BarChartApprovalsByRole = () => {
  const [data, setData] = useState([]);
  const companyDB = localStorage.getItem("companyDB");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const [usersRes, approvalsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/users?companyDB=${companyDB}`),
          axios.get(`${BASE_URL}/approvals/count-by-role?CompanyDB=${companyDB}`)
        ]);

        const users = usersRes.data;
        const approvals = approvalsRes.data;

        const temp = [];

        approvals.forEach((r) => {
          let roles = ['Unknown'];

          if (r.ROLE_NAMES) {
            try {
              const parsed = JSON.parse(r.ROLE_NAMES);
              roles = Array.isArray(parsed) ? parsed : [String(parsed)];
            } catch {
              roles = [r.ROLE_NAMES];
            }
          }

          roles.forEach((role) => {
            const user = users.find(u => u.ID === role);
            const displayName = user ? user.NAME : role;

            if (displayName !== "Unknown") {
              temp.push({
                role: displayName,
                count: Number.isFinite(Number(r.COUNT)) ? Number(r.COUNT) : 0,
              });
            }
          });
        });

        const grouped = temp.reduce((acc, item) => {
          acc[item.role] = (acc[item.role] || 0) + item.count;
          return acc;
        }, {});

        const finalData = Object.entries(grouped).map(([role, count]) => ({ role, count }));

        setData(finalData);
      } catch (err) {
        console.error("Error loading chart data:", err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div
     style={{
      height: 400,
      background: '#fff',
      // borderRadius: '12px',
      // padding: '20px',
      // boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }}
    >
      <h5 className="text-center mb-4" style={{ color: '#202124', fontWeight: 600 }}>
        📊 Approvals by User
      </h5>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="role"
            angle={-25}
            textAnchor="end"
            interval={0}
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#f8f9fa', borderColor: '#ccc' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="count" fill="#4CAF50" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="count" position="top" fill="#333" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartApprovalsByRole;
