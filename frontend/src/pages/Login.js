// src/pages/Login.js
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.user && res.data.user.id) {
        localStorage.setItem("userId", res.data.user.id.toString());
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login successful!");
        nav("/"); // Redirect to dashboard
      } else {
        toast.error(res.data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err?.response?.data?.msg || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="card auth-card fade-in">
        <h2>Welcome back</h2>
        <p style={{ color: "var(--muted)" }}>Sign in to continue to your expenses</p>
        <form onSubmit={submit} style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 10 }}>
            <input
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <Link to="/register" className="btn ghost">Register</Link>
          </div>
        </form>
        <div style={{ marginTop: 10 }}>
          <Link to="/forgot">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}