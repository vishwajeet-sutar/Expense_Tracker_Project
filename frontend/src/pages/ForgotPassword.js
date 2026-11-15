// src/pages/ForgotPassword.js
import React,{useState} from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword(){
  const [email,setEmail]=useState('');
  const [newPwd,setNewPwd]=useState('');
  const nav = useNavigate();

  const submit = async (e) =>{
    e.preventDefault();
    try{
      await api.post('/auth/forgot-password', { email, new_password: newPwd });
      toast.success('Password updated');
      nav('/login');
    }catch(err){ toast.error(err?.response?.data?.msg || 'Error'); }
  }

  return (
    <div style={{maxWidth:480, margin:'40px auto'}} className="fade-in">
      <div className="card">
        <h2>Reset password</h2>
        <form onSubmit={submit}>
          <div style={{marginBottom:8}}><input className="input" placeholder="Registered email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <div style={{marginBottom:8}}><input className="input" type="password" placeholder="New password" value={newPwd} onChange={e=>setNewPwd(e.target.value)} required/></div>
          <button className="btn">Update password</button>
        </form>
      </div>
    </div>
  )
}