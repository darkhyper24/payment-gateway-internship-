import React, { useEffect, useState } from 'react';
import { getProfile, logoutUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    setLogoutError('');
    try {
      await logoutUser();
      navigate('/login');
    } catch (err) {
      setLogoutError(err.message);
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return <div style={containerStyle}>Loading...</div>;
  }
  if (error) {
    return <div style={containerStyle}>Error: {error}</div>;
  }
  if (!user) {
    return <div style={containerStyle}>No user data found.</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#baff80', marginBottom: 24 }}>Welcome, {user.username}!</h2>
      <div style={infoRow}><span style={labelStyle}>Email:</span> {user.email}</div>
      <div style={infoRow}><span style={labelStyle}>Phone:</span> {user.phone || <span style={{ color: '#aaa' }}>N/A</span>}</div>
      <div style={infoRow}><span style={labelStyle}>User ID:</span> {user.id}</div>
      <button
        onClick={handleLogout}
        disabled={logoutLoading}
        style={{
          width: '100%',
          marginTop: 32,
          background: 'linear-gradient(90deg, #faff00 0%, #eaff6b 100%)',
          color: '#222',
          fontWeight: 600,
          border: 'none',
          borderRadius: 8,
          padding: '14px 0',
          fontSize: 18,
          cursor: logoutLoading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px #0004',
          transition: 'filter 0.2s',
          filter: logoutLoading ? 'brightness(0.8)' : 'none',
        }}
      >
        {logoutLoading ? 'Logging out...' : 'Logout'}
      </button>
      {logoutError && <div style={{ color: '#ff5252', marginTop: 12 }}>{logoutError}</div>}
    </div>
  );
};

const containerStyle = {
  background: '#181A1B',
  color: '#fff',
  maxWidth: 480,
  borderRadius: 16,
  padding: 32,
  boxShadow: '0 2px 24px #0008',
  fontFamily: 'inherit',
  margin: '40px auto',
  textAlign: 'center',
};

const infoRow = {
  margin: '12px 0',
  fontSize: 18,
};

const labelStyle = {
  color: '#baff80',
  fontWeight: 600,
  marginRight: 8,
};

export default Home;
