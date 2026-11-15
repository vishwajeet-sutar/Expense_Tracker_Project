// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import CalendarPage from './pages/Calendar';
import RecentExpenses from './pages/RecentExpenses';
import Reports from './pages/Reports';
import ExpenseGraph from './pages/ExpenseGraph';
import Layout from './components/Layout';

function Private({ children }) {
  const userId = localStorage.getItem('userId');
  if (!userId) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (no sidebar/layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        {/* Private routes wrapped with Layout (contains Sidebar + main area) */}
        <Route
          path="/"
          element={
            <Private>
              <Layout>
                <Dashboard />
              </Layout>
            </Private>
          }
        />
        <Route
          path="/add"
          element={
            <Private>
              <Layout>
                <AddExpense />
              </Layout>
            </Private>
          }
        />
        <Route
          path="/calendar"
          element={
            <Private>
              <Layout>
                <CalendarPage />
              </Layout>
            </Private>
          }
        />
        <Route
          path="/recent"
          element={
            <Private>
              <Layout>
                <RecentExpenses />
              </Layout>
            </Private>
          }
        />
        <Route
          path="/reports"
          element={
            <Private>
              <Layout>
                <Reports />
              </Layout>
            </Private>
          }
        />
        <Route
          path="/graphs"
          element={
            <Private>
              <Layout>
                <ExpenseGraph />
              </Layout>
            </Private>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer theme="colored" />
    </BrowserRouter>
  );
}