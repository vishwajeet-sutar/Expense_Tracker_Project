// src/components/Navbar.js
import React from 'react';

export default function Navbar(){
  const name = JSON.parse(localStorage.getItem('user') || 'null')?.name;
  return (
    <div style={{display:'flex', justifyContent:'space-between', padding: '10px 20px', borderBottom: '1px solid #ddd'}}>
      <div style={{fontWeight:700}}>Expense Tracker</div>
      <div>Welcome {name || 'Guest'}</div>
    </div>
  )
}