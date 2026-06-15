import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(["Food", "Housing", "Utilities", "Salary", "Leisure"]);
  const [newCategory, setNewCategory] = useState("");
  
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [image, setImage] = useState(null); 


  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchBackendData = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;
      
      const { data } = await axios.get(`${API_BASE}/api/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(data)) {
        setTransactions(data);
      }
    } catch (err) {
      console.error("Failed to query live ledger:", err);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);

    return { income, expense, balance: income - expense };
  }, [transactions]);

  const formatAmount = (amt) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amt);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
 
    const formData = new FormData();
    formData.append("title", title);
    formData.append("amount", amount);
    formData.append("type", type);
    formData.append("category", category);
    
   
    if (image && image.length > 0) {
      formData.append("image", image[0]); 
    }

    try {
      await axios.post(`${API_BASE}/api/transactions`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      
      setTitle("");
      setAmount("");
      setImage(null);
      const fileInput = document.getElementById("receipt-upload");
      if (fileInput) fileInput.value = "";

      fetchBackendData(); 
    } catch (err) {
      console.error("Submission Error Details:", err.response?.data || err.message);
      alert("Failed to submit transaction.");
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to remove this entry?")) return;
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.delete(`${API_BASE}/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBackendData();
    } catch (err) {
      alert("Failed to delete record.");
    }
  };

  return (
    <div className="pt-20 p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Transactions Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-sm font-medium text-gray-600">Total Income</h2>
          <p className="text-lg font-bold text-green-700">{formatAmount(summary.income)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <h2 className="text-sm font-medium text-gray-600">Total Expenses</h2>
          <p className="text-lg font-bold text-red-700">{formatAmount(summary.expense)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h2 className="text-sm font-medium text-gray-600">Available Balance</h2>
          <p className="text-lg font-bold text-blue-700">{formatAmount(summary.balance)}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Manage Categories</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleAddCategory} className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors">
            Add Category
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">Current categories: {categories.join(", ")}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow-md space-y-4">
          <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded" required />
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded bg-white">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded bg-white">
              {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
            </select>

            <div className="pt-2 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Attach Voucher Receipt (Optional Cloud Upload)
              </label>
              <input
                id="receipt-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-sm text-gray-500 cursor-pointer"
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded">
              Submit Transaction
            </button>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow-md space-y-3">
          <h2 className="text-lg font-semibold mb-2">History Log</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-400 italic text-center py-4">No entries saved yet.</p>
          ) : (
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto pr-1">
              {transactions.map((t) => (
                <div key={t._id} className="py-3 flex justify-between items-center hover:bg-gray-50 rounded px-2 transition">
                  <div>
                    <p className="font-semibold text-gray-800">{t.title}</p>
                    <p className="text-xs text-gray-400 capitalize">{t.category} • {t.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${t.type === "expense" ? "text-red-500" : "text-green-500"}`}>
                      {t.type === "expense" ? "-" : "+"} ₹{t.amount}
                    </span>

                    {t.image && (
                      <a href={t.image} target="_blank" rel="noreferrer">
                        <img src={t.image} alt="receipt" className="w-8 h-8 object-cover rounded border" />
                      </a>
                    )}

                    <button onClick={() => handleDeleteTransaction(t._id)} className="text-xs text-red-500 border border-red-100 px-2 py-1 rounded hover:bg-red-50 transition">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
