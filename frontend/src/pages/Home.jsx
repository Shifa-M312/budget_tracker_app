import React, { useState, useEffect } from "react";
import api from "../api"; 
import ExpenseChart from "../components/ExpenseChart";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeDashboardData = async () => {
      try {
        setLoading(true); 
        
        
        const res = await api.get("/api/transactions");
        
        if (Array.isArray(res.data)) {
          setTransactions(res.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard statistics:", err);
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
    return (
      <main className="pt-24 px-6 flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 font-medium animate-pulse">Synchronizing ledger insights...</p>
      </main>
    );
  }

  return (
    <main className="pt-24 px-6 max-w-5xl mx-auto space-y-8">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg shadow text-white bg-gradient-to-r from-green-300 to-green-500 text-center 
                        transform transition duration-300 hover:scale-105 hover:shadow-xl 
                        border-2 border-transparent hover:border-green-400 hover:shadow-green-400/50">
          <h2 className="font-semibold text-sm tracking-wider uppercase opacity-90">Total Income</h2>
          <p className="text-3xl font-bold mt-1">₹{income}</p>
        </div>

        <div className="p-6 rounded-lg shadow text-white bg-gradient-to-r from-red-300 to-red-500 text-center 
                        transform transition duration-300 hover:scale-105 hover:shadow-xl 
                        border-2 border-transparent hover:border-red-400 hover:shadow-red-400/50">
          <h2 className="font-semibold text-sm tracking-wider uppercase opacity-90">Total Expense</h2>
          <p className="text-3xl font-bold mt-1">₹{expense}</p>
        </div>

        <div className="p-6 rounded-lg shadow text-white bg-gradient-to-r from-blue-300 to-blue-500 text-center 
                        transform transition duration-300 hover:scale-105 hover:shadow-xl 
                        border-2 border-transparent hover:border-blue-400 hover:shadow-blue-400/50">
          <h2 className="font-semibold text-sm tracking-wider uppercase opacity-90">Available Balance</h2>
          <p className="text-3xl font-bold mt-1">₹{balance}</p>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex justify-center 
                      transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <ExpenseChart transactions={safeTransactions} />
      </div>
    </main>
  );
}

export default Home;
