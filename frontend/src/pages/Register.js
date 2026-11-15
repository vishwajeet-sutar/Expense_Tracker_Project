// src/pages/Register.js
import React, {useState} from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const nav = useNavigate();

  const submit = async (e) =>{
    e.preventDefault();
    if(password !== confirm){ toast.error('Passwords do not match'); return; }
    try{
      const res = await api.post('/auth/register', { name, email, password });
      toast.success('Account created. Please login');
      nav('/login');
    }catch(err){ toast.error(err?.response?.data?.msg || 'Register failed'); }
  }

  return (
    <div style={{maxWidth:520, margin:'40px auto'}} className="fade-in">
      <div className="card">
        <h2>Create account</h2>
        <form onSubmit={submit} style={{marginTop:12}}>
          <div style={{marginBottom:8}}><input className="input" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required/></div>
          <div style={{marginBottom:8}}><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <input className="input" type="password" placeholder="Confirm Password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
          </div>
          <div style={{marginTop:12}}><button className="btn">Create account</button></div>
        </form>
      </div>
    </div>
  )
}