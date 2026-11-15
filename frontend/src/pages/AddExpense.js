// src/pages/AddExpense.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast.error("Please enter a valid positive amount");
      return;
    }
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found");
      return;
    }
    const payload = {
      user_id: parseInt(userId),
      amount: amountNumber,
      category,
      date: formattedDate,
      description: desc || ""
    };
    try {
      const res = await api.post("/expenses", payload);
      toast.success(res.data.msg || "Expense saved successfully");
      setAmount("");
      setDesc("");
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err?.response?.data?.error || "Error saving expense");
    }
  };

  return (
    <div className="fade-in">
      <div className="card" style={{ maxWidth: 800 }}>
        <h3>Add Expense</h3>
        <form onSubmit={submit} style={{ marginTop: 8 }}>
          <div className="form-grid">
            <input
              className="input"
              placeholder="Amount (eg: 250)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Food</option>
              <option>Travel</option>
              <option>Bills</option>
              <option>Shopping</option>
              <option>Health</option>
              <option>Other</option>
            </select>
            <div>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                dateFormat="dd/MM/yyyy"
                className="input"
              />
            </div>
            <div style={{ gridColumn: "1 / span 2" }}>
              <textarea
                className="input"
                rows={4}
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn">Save expense</button>
          </div>
        </form>
      </div>
    </div>
  );
}