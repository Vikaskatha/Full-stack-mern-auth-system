import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const card = { minHeight:'calc(100vh - 64px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' };
const box = { background:'#1a1d27', border:'1px solid #2e3350', borderRadius:'16px', padding:'40px', width:'100%', maxWidth:'420px', display:'flex', flexDirection:'column', gap:'24px' };

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };
  return (
    <div style={card}>
      <div style={box}>
        <div>
          <h1 style={{ fontSize:'24px', fontWeight:'700', marginBottom:'6px' }}>Welcome back</h1>
          <p style={{ color:'#8892b0', fontSize:'14px' }}>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>Password</label><input type="password" name="password" placeholder="Your password" value={form.password} onChange={handleChange} required /></div>
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
        </form>
      </div>
    </div>
  );
}
