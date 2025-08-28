import React, { useContext } from "react";
import { ThemeContext } from "../../context/Themes";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MyLineChart({ data, dataKey, lineColor }) {
  const { theme } = useContext(ThemeContext);
  const dark = { border: "#39496b", frame: "#2f3f61", title: "#f0f0f0", text: "#d1d1d1", bg: "#1b2b4d" };
  const light = { border: "#d1d1d1", frame: "#f0f0f0", title: "#403e57", text: "#5e5d72", bg: "#ffffff" };

  return (
    <ResponsiveContainer width="100%" aspect={1} maxHeight={400} className='line-Chart'>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme === "light_mode" ? "#f0f0f0" : "#39496b"} />
        <XAxis dataKey="name" stroke={theme === "light_mode" ? "#5e5d72" : "#d1d1d1"} />
        <YAxis stroke={theme === "light_mode" ? "#5e5d72" : "#d1d1d1"} />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={lineColor} />
      </LineChart>
    </ResponsiveContainer>
  );
}
