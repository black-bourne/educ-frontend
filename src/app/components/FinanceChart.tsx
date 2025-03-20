"use client";
import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Define colors for the lines
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

// Sample data with monthly income and expense, including crossings
const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 3500 },
  { name: "Mar", income: 4000, expense: 3000 },
  { name: "Apr", income: 2500, expense: 3000 },
  { name: "May", income: 3500, expense: 2800 },
  { name: "Jun", income: 2000, expense: 2500 },
  { name: "Jul", income: 3000, expense: 2800 },
  { name: "Aug", income: 2800, expense: 3000 },
  { name: "Sep", income: 3200, expense: 3100 },
  { name: "Oct", income: 2900, expense: 3000 },
  { name: "Nov", income: 3100, expense: 2900 },
  { name: "Dec", income: 3300, expense: 3200 },
];

const FinanceChart = () => {
  return (
    <div className="rounded-xl w-full h-[40vh] md:h-[50vh] p-3 bg-white">
      {/* Chart title */}
      <div className="font-serif">
        <h2>Finance</h2>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={data}>
          {/* Dashed grid for a modern look */}
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
          {/* X-axis without ticklines */}
          <XAxis dataKey="name" scale="band" tickLine={false} />
          {/* Y-axis without ticklines, with a label */}
          <YAxis
            tickLine={false}
            label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
          />
          {/* Tooltip with currency formatting */}
          <Tooltip formatter={(value) => `$${value}`} />
          {/* Legend with circular dots */}
          <Legend iconType="circle" iconSize={10} />
          {/* Income line with custom dots */}
          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke={colors[0]}
            strokeWidth={2}
            dot={{ r: 4 }} // Larger dots on the line
            activeDot={{ r: 6 }} // Larger dot on hover
          />
          {/* Expense line with custom dots */}
          <Line
            type="monotone"
            dataKey="expense"
            name="Expense"
            stroke={colors[1]}
            strokeWidth={2}
            dot={{ r: 4 }} // Larger dots on the line
            activeDot={{ r: 6 }} // Larger dot on hover
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
