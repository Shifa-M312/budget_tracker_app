import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseChart from "../components/ExpenseChart";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  /
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHomeDashboardData = async () => {
      try {
        
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        
        const { data } = await axios.get(`${API_BASE}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (Array.isArray(data)) {
          setTransactions(data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeDashboardData();
  }, []);

  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  
  const income = safeTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expense = safeTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const balance = income - expense;

  if (loading) {
    return <div className="pt-24 text-center text-gray-500">Loading dashboard...</div>;
  }

  return (
    <main className="pt-24 px-6 max-w-5xl mx-auto space-y-8">
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg shadow text-white bg-gradient-to-r from-green-300 to-green-500 text-center">
          <h2 className="font-semibold">Total Income</h2>
          <p className="text-2xl">₹{income}</p>
        </div>

        <div className="p-6 rounded-lg shadow text-white bg-gradient-to-r from-red-300 to-red-500 text-center">
          <h2 className="font-semibold">Total Expense</h2>
          <p className="text-2xl">₹{expense}</p>
        </div>

        <div className="p-6 rounded-lg shadow text-white bg-gradient-to-r from-blue-300 to-blue-500 text-center">
          <h2 className="font-semibold">Available Balance</h2>
          <p className="text-2xl">₹{balance}</p>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex justify-center">
        <ExpenseChart transactions={safeTransactions} />
      </div>
    </main>
  );
}

export default Home;
