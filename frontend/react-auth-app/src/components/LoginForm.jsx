import React, { useState } from 'react';
import { loginUser } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await loginUser({ email: form.email, password: form.password });
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#181A1B',
      color: '#fff',
      maxWidth: 480,
      borderRadius: 16,
      padding: 32,
      boxShadow: '0 2px 24px #0008',
      fontFamily: 'inherit',
    }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username or email</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 8, top: 10, opacity: 0.6 }}>👤</span>
            <input
              type="text"
              name="email"
              placeholder="Username or email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              autoComplete="username"
              required
            />
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Password</label>
            <a href="#" style={{ color: '#baff80', fontSize: 13, textDecoration: 'underline' }}>Forgot Password?</a>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 8, top: 10, opacity: 0.6 }}>🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
              autoComplete="current-password"
              required
            />
            <span style={{ position: 'absolute', right: 8, top: 10, opacity: 0.4 }}>🙈</span>
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            style={{ marginRight: 8 }}
          />
          <label style={{ fontSize: 15 }}>Remember Me</label>
        </div>
        {error && <div style={{ color: '#ff5252', marginTop: 12 }}>{error}</div>}
        {success && <div style={{ color: '#baff80', marginTop: 12 }}>{success}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            marginTop: 24,
            background: 'linear-gradient(90deg, #faff00 0%, #eaff6b 100%)',
            color: '#222',
            fontWeight: 600,
            border: 'none',
            borderRadius: 8,
            padding: '14px 0',
            fontSize: 18,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #0004',
            transition: 'filter 0.2s',
            filter: loading ? 'brightness(0.8)' : 'none',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 14 }}>
          Do not have an account?{' '}
          <Link to="/register" style={{ color: '#baff80', textDecoration: 'underline' }}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px 36px',
  borderRadius: 8,
  border: '1px solid #333',
  background: '#232526',
  color: '#fff',
  fontSize: 16,
  marginTop: 4,
  outline: 'none',
  boxSizing: 'border-box',
};

export default LoginForm;
