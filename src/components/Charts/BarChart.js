import "./chartStypes.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "2017",
//     PaidUpShare: 4000,
//     Loan: 2400,
//     amt: 2400,
//   },
//   {
//     name: "2018",
//     PaidUpShare: 3000,
//     Loan: 1398,
//     amt: 2210,
//   },
//   {
//     name: "2019",
//     PaidUpShare: 2000,
//     Loan: 9800,
//     amt: 2290,
//   },
//   {
//     name: "2020",
//     PaidUpShare: 2780,
//     Loan: 3908,
//     amt: 2000,
//   },
//   {
//     name: "2021",
//     PaidUpShare: 1890,
//     Loan: 4800,
//     amt: 2181,
//   },
//   {
//     name: "2022",
//     PaidUpShare: 2390,
//     Loan: 3800,
//     amt: 2500,
//   },
//   {
//     name: "2023",
//     PaidUpShare: 3490,
//     Loan: 4300,
//     amt: 2100,
//   },
// ];

export default function BarChart1({ data, isMemberData }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={isMemberData === true ? "Unions" : "Loan"}
          fill="#3bbbd1"
        />
        <Bar
          dataKey={isMemberData === true ? "Pr_Cooperatives" : "PaidUpShare"}
          fill="#FF781F"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
