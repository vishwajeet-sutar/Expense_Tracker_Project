// src/pages/Calendar.js
import React,{useEffect, useState} from 'react';
import api from '../services/api';
import { eachDayOfInterval, startOfYear, endOfYear, format } from 'date-fns';

export default function CalendarPage(){
  const [map,setMap] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(()=>{ 
    if (userId) load(); 
  },[]);

  async function load(){
    try{
      const res = await api.get(`/expenses?user_id=${userId}`);
      const data = res.data || [];
      const agg = {};
      data.forEach(e=>{ agg[e.date] = (agg[e.date] || 0) + Number(e.amount); });
      setMap(agg);
    }catch(e){ console.error(e); }
  }

  const days = eachDayOfInterval({ start: startOfYear(new Date()), end: endOfYear(new Date()) });
  return (
    <div className="fade-in">
      <div className="card">
        <h3>Year calendar</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6}}>
          {days.map(d=>{
            const key = format(d, 'yyyy-MM-dd');
            const val = map[key];
            return (
              <div key={key} style={{padding:8, borderRadius:8, background: val ? 'linear-gradient(180deg,#fff, #fffef7)' : '#fff', border:'1px solid #f1f3f8'}}>
                <div style={{fontSize:12, color:'var(--muted)'}}>{format(d,'dd MMM')}</div>
                <div style={{fontWeight:700}}>{val ? `₹${val}` : '-'}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}