import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#06B6D4", "#FF781F"];

const PieChartDraw = ({ data1, data2 }) => {
  const data = [{ value: data1 || 0 }, { value: data2 || 0 }];

  return (
    <PieChart width={90} height={90}>
      <Pie
        data={data}
        cx={45}
        cy={45}
        innerRadius={22}
        outerRadius={35}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartDraw;
