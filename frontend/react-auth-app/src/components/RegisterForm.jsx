import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await registerUser(form);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
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
      margin: '40px auto',
      borderRadius: 16,
      padding: 32,
      boxShadow: '0 2px 24px #0008',
      fontFamily: 'inherit',
    }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 8, top: 10, opacity: 0.6 }}>👤</span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              style={inputStyle}
              autoComplete="username"
              required
            />
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <label>Email</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 8, top: 10, opacity: 0.6 }}>✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              autoComplete="email"
              required
            />
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <label>Phone</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 8, top: 10, opacity: 0.6 }}>📞</span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
              autoComplete="tel"
              required
            />
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 8, top: 10, opacity: 0.6 }}>🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
              autoComplete="new-password"
              required
              minLength={8}
            />
            <span style={{ position: 'absolute', right: 8, top: 10, opacity: 0.4 }}>🙈</span>
          </div>
          <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>Minimum length is 8 characters.</div>
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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <div style={{ fontSize: 12, color: '#aaa', marginTop: 18 }}>
          By creating an account, you agree to the <a href="#" style={{ color: '#baff80', textDecoration: 'underline' }}>Terms of Service</a>. We'll occasionally send you account-related emails.
        </div>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#baff80', textDecoration: 'underline' }}>Login</Link>
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

export default RegisterForm;
