// src/pages/Dashboard.js (updated)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
  const [kpi, setKpi] = useState({ total: 0, month: 0, count: 0 });
  const [recentExpenses, setRecentExpenses] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      nav('/login');
      return;
    }

    async function load() {
      try {
        const res = await api.get(`/expenses?user_id=${userId}`);
        const items = res.data || [];
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const total = items.reduce((sum, item) => sum + Number(item.amount), 0);
        const monthTotal = items
          .filter(item => new Date(item.date) >= firstDayOfMonth)
          .reduce((sum, item) => sum + Number(item.amount), 0);
        const count = items.length;
        setKpi({
          total: total.toFixed(2),
          month: monthTotal.toFixed(2),
          count: count,
        });

        // Set recent expenses (last 5)
        const sortedRecent = items
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setRecentExpenses(sortedRecent);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [nav]);

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div className="h1">Hello 👋</div>
          <div style={{ color: 'var(--muted)' }}>Here's a quick summary of your expenses</div>
        </div>
      </div>

      <div className="kpi" style={{ marginBottom: 16 }}>
        <div className="item card">
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Total Spent</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>₹ {kpi.total}</div>
        </div>
        <div className="item card">
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>This Month</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>₹ {kpi.month}</div>
        </div>
        <div className="item card">
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Transactions</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{kpi.count}</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ minWidth: '500px' }}>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.length > 0 ? (
                recentExpenses.map((item) => (
                  <tr key={item.id}>
                    <td>₹{item.amount}</td>
                    <td>{item.category}</td>
                    <td>{item.date}</td>
                    <td>{item.description || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                    No recent expenses yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12 }}>
          <a href="/recent" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 14 }}>
            View all expenses →
          </a>
        </div>
      </div>
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [expenses, setExpenses] = useState([]);
//   const nav = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       nav("/login"); // redirect to login
//       return;
//     }
//     loadExpenses(userId);
//   }, [nav]);

//   const loadExpenses = async (userId) => {
//     try {
//       const res = await api.get(`/expenses?userId=${userId}`);
//       setExpenses(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {expenses.length === 0 ? (
//         <p>No expenses found</p>
//       ) : (
//         <ul>
//           {expenses.map((exp) => (
//             <li key={exp.id}>
//               {exp.category} — ₹{exp.amount}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
