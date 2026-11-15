// src/pages/RecentExpenses.js (updated to Recent Activity)
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function RecentExpenses() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  const load = async () => {
    if (!userId) return;
    setLoading(true);
    try { 
      const res = await api.get(`/expenses?user_id=${userId}`); 
      setItems(res.data || []); 
    }
    catch(e){ console.error(e); }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try { 
      await api.delete(`/expenses/${id}?user_id=${userId}`); 
      toast.success('Deleted'); 
      load(); 
    }
    catch(e){ toast.error('Failed'); }
  }

  const editDesc = async (id) => {
    const newD = prompt('New description:');
    if (newD == null) return;
    try { 
      await api.put(`/expenses/${id}`, { user_id: parseInt(userId), description: newD }); 
      toast.success('Updated'); 
      load(); 
    }
    catch(e){ toast.error('Failed'); }
  }

  return (
    <div className="fade-in">
      <div className="card">
        <h3>Recent Activity</h3>
        {loading ? <p>Loading...</p> : (
          <table className="table">
            <thead><tr><th>Amount</th><th>Category</th><th>Date</th><th>Description</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td>₹{i.amount}</td>
                  <td>{i.category}</td>
                  <td>{i.date}</td>
                  <td>{i.description || '-'}</td>
                  <td>
                    <button className="btn ghost" onClick={() => editDesc(i.id)} style={{ marginRight: 8 }}>Edit</button>
                    <button className="btn" onClick={() => del(i.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}