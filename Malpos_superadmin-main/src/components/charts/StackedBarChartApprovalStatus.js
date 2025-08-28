// StackedBarChartApprovalStatus.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../apis/NodeApiUrl';

const StackedBarChartApprovalStatus = () => {
  const [data, setData] = useState([]);
  const companyDB = localStorage.getItem("companyDB");
  // useEffect(() => {
  //   axios.get(`${BASE_URL}/approvals/status-by-role?CompanyDB=${companyDB}`).then((res) => {
  //     setData(res.data);
  //   });
  // }, []);

useEffect(() => {
  axios.get(`${BASE_URL}/api/approvals/status-by-role?CompanyDB=${companyDB}`).then((res) => {
    const transformed = [];

    res.data.forEach((item) => {
      let roles = ['Unknown Role'];

      if (item.role && item.role !== 'Unknown Role') {
        try {
          const parsed = JSON.parse(item.role);
          roles = Array.isArray(parsed) ? parsed : [String(parsed)];
        } catch {
          roles = [item.role];
        }
      }

      roles.forEach((r) => {
        transformed.push({
          role: r,
          approved: item.approved || 0,
          rejected: item.rejected || 0,
          cancelled: item.cancelled || 0,
        });
      });
    });

    setData(transformed);
  });
}, []);


  return (
    <div style={{ height: 400 }}>
      <h5 className='text-center mb-4' >Approvals vs Rejections by Role</h5>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="role" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="approved" stackId="a" fill="#34a853" />
          <Bar dataKey="rejected" stackId="a" fill="#ea4335" />
          {/* <Bar dataKey="pending" stackId="a" fill="#fbbc05" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChartApprovalStatus;
