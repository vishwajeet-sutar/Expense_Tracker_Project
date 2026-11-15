// src/components/Sidebar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const MenuItem = ({ to, children }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
    {children}
  </NavLink>
);

export default function Sidebar() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    nav('/login');
  };
  return (
    <aside className="sidebar fade-in">
      <div className="brand">Expense<span style={{color:'#333'}}>Tracker</span></div>
      <div style={{marginBottom:12, color:'var(--muted)'}}>Hi, <strong>{user?.name || 'Guest'}</strong></div>
      <nav className="menu">
        <MenuItem to="/">Dashboard</MenuItem>
        <MenuItem to="/add">Add Expense</MenuItem>
        <MenuItem to="/calendar">Calendar</MenuItem>
        <MenuItem to="/recent">Recent Expenses</MenuItem>
        <MenuItem to="/reports">Reports</MenuItem>
        <MenuItem to="/graphs">Graphs</MenuItem>
      </nav>
      <div className="logout"><button className="btn ghost" onClick={logout}>Logout</button></div>
    </aside>
  );
}