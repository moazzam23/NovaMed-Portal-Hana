import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const data = [
    { name: 'Jan', value: 20 },
    { name: 'Feb', value: 30 },
    { name: 'Mar', value: 50 },
    { name: 'Apr', value: 40 },
    { name: 'May', value: 70 },
    { name: 'Jun', value: 60 },
    { name: 'Jul', value: 80 }
  ];
export default function LineChartAnalysis() {
  return (
    <div>
        <LineChart width={350} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid stroke="#ccc" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
  </div>
  )
}
