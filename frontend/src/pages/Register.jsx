import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const card = { minHeight:'calc(100vh - 64px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' };
const box = { background:'#1a1d27', border:'1px solid #2e3350', borderRadius:'16px', padding:'40px', width:'100%', maxWidth:'420px', display:'flex', flexDirection:'column', gap:'24px' };

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };
  return (
    <div style={card}>
      <div style={box}>
        <div>
          <h1 style={{ fontSize:'24px', fontWeight:'700', marginBottom:'6px' }}>Create account</h1>
          <p style={{ color:'#8892b0', fontSize:'14px' }}>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div className="form-group"><label>Full Name</label><input type="text" name="name" placeholder="Vikas Reddy" value={form.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>Password</label><input type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required /></div>
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Creating account…' : 'Create Account'}</button>
        </form>
      </div>
    </div>
  );
}
