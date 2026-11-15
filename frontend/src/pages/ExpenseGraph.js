// src/pages/ExpenseGraph.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

export default function ExpenseGraph() {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => { 
    if (userId) load(); 
  }, []);

  async function load(){ 
    try{ 
      const res = await api.get(`/expenses?user_id=${userId}`); 
      setData(res.data || []);
    }catch(e){console.error(e)} 
  }

  const categories = [...new Set(data.map(d => d.category))];
  const catSums = categories.map(c => data.filter(i => i.category === c).reduce((s, x) => s + Number(x.amount), 0));

  const categoryColors = {
    Food: '#4CAF50',
    Travel: '#2196F3',
    Bills: '#FF9800',
    Shopping: '#9C27B0',
    Health: '#F44336',
    Other: '#9E9E9E'
  };

  const pieData = { 
    labels: categories, 
    datasets: [{ 
      data: catSums,
      backgroundColor: categories.map(cat => categoryColors[cat] || '#9E9E9E')
    }] 
  };

  const dates = data.map(d => d.date).reverse();
  const amounts = data.map(d => Number(d.amount)).reverse();
  const lineData = { 
    labels: dates, 
    datasets: [{ 
      label: 'Amount', 
      data: amounts, 
      tension: 0.3,
      borderColor: '#6C5CE7',
      backgroundColor: 'rgba(108, 92, 231, 0.1)',
      fill: true
    }] 
  };

  return (
    <div className="fade-in">
      <div className="card">
        <h3>Expense graphs</h3>
        <div className="chart-wrap">
          <div style={{ maxWidth: 400 }}><Pie data={pieData} /></div>
        </div>
        <div style={{ marginTop: 16 }} className="chart-wrap"><Line data={lineData} /></div>
      </div>
    </div>
  )
}