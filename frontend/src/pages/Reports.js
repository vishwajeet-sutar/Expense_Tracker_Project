// src/pages/Reports.js (fixed)
import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Reports(){
  const [data,setData] = useState([]);
  const [type,setType] = useState('weekly');
  const userId = localStorage.getItem('userId');

  async function load(t){
    if (!userId) return;
    try{ 
      const res = await api.get(`/reports/${t}?user_id=${userId}`); 
      setData(res.data || []); 
      setType(t);
    }catch(e){console.error(e)}
  }

  useEffect(() => { load('weekly'); }, []);

  return (
    <div className="fade-in">
      <div className="card">
        <h3>Reports</h3>
        <div style={{display:'flex', gap:8, marginBottom:12}}>
          <button className="btn" onClick={()=>load('weekly')}>Weekly</button>
          <button className="btn" onClick={()=>load('monthly')}>Monthly</button>
          <button className="btn" onClick={()=>load('yearly')}>Yearly</button>
        </div>
        <table className="table"><thead><tr><th>Date</th><th>Amount</th><th>Category</th></tr></thead>
          <tbody>
            {data.map((r,i)=>(<tr key={i}><td>{r.date}</td><td>₹{r.amount}</td><td>{r.category}</td></tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}