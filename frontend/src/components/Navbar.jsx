import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login'); };
  return (
    <nav style={{ background:'#1a1d27', borderBottom:'1px solid #2e3350', padding:'0 24px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <Link to={token ? '/dashboard' : '/login'} style={{ fontWeight:700, fontSize:'18px', color:'#e8eaf6', textDecoration:'none' }}>🔐 AuthSystem</Link>
      <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
        {token ? (
          <button onClick={handleLogout} style={{ background:'transparent', border:'1px solid #2e3350', color:'#8892b0', padding:'8px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontWeight:'500' }}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ color:'#8892b0', fontSize:'14px' }}>Login</Link>
            <Link to="/register" style={{ background:'#6c63ff', color:'#fff', padding:'8px 16px', borderRadius:'8px', fontSize:'14px', fontWeight:'600', textDecoration:'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
