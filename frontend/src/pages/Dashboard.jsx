import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } });
        setProfile(data.user);
      } catch (err) { setError('Failed to load profile'); }
    };
    fetchProfile();
  }, []);

  return (
    <div style={{ minHeight:'calc(100vh - 64px)', padding:'40px 24px', maxWidth:'800px', margin:'0 auto' }}>
      <div style={{ background:'#1a1d27', border:'1px solid #2e3350', borderRadius:'16px', padding:'40px', marginBottom:'24px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'32px' }}>
          <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'linear-gradient(135deg, #6c63ff, #a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', fontWeight:'700', color:'#fff' }}>
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 style={{ fontSize:'22px', fontWeight:'700' }}>Welcome, {user.name}! 👋</h1>
            <p style={{ color:'#8892b0', fontSize:'14px', marginTop:'4px' }}>You are successfully authenticated</p>
          </div>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {profile && (
          <div style={{ display:'grid', gap:'16px' }}>
            <h3 style={{ color:'#8892b0', fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em' }}>Profile Information</h3>
            {[
              { label:'Name', value: profile.name },
              { label:'Email', value: profile.email },
              { label:'User ID', value: profile._id },
              { label:'Member Since', value: new Date(profile.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }) },
            ].map(({ label, value }) => (
              <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px', background:'#22263a', borderRadius:'8px', border:'1px solid #2e3350' }}>
                <span style={{ color:'#8892b0', fontSize:'13px', fontWeight:'500' }}>{label}</span>
                <span style={{ fontSize:'14px', fontFamily: label === 'User ID' ? 'monospace' : 'inherit' }}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ background:'rgba(108,99,255,0.08)', border:'1px solid rgba(108,99,255,0.25)', borderRadius:'12px', padding:'20px' }}>
        <p style={{ color:'#a78bfa', fontSize:'13px', fontWeight:'500', marginBottom:'8px' }}>🔒 JWT Protected Route</p>
        <p style={{ color:'#8892b0', fontSize:'13px', lineHeight:'1.6' }}>This page is only accessible with a valid JWT token. Your token is stored in localStorage and sent in the Authorization header for every protected API request.</p>
      </div>
    </div>
  );
}
