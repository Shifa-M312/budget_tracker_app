import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ExpenseChart({ transactions = [] }) {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

 
  const income = safeTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const expense = safeTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#22c55e", "#ef4444"]; 

  return (
    <div className="bg-white p-6 rounded shadow w-96 mx-auto flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Spending Overview
      </h2>

      
      <div style={{ width: "350px", height: "250px" }} className="flex justify-center items-center">
        <PieChart width={350} height={250}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>
    </div>
  );
}

export default ExpenseChart;
