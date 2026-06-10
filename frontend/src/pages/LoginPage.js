import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box, TextField, Button, Typography, Alert,
  CircularProgress, Paper, InputAdornment, IconButton
} from '@mui/material';
import { Login as LoginIcon, Visibility, VisibilityOff, LocalMovies } from '@mui/icons-material';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', form);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#555' },
      '&:hover fieldset': { borderColor: '#e50914' },
      '&.Mui-focused fieldset': { borderColor: '#e50914' },
    },
    '& .MuiInputLabel-root': { color: '#aaa' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#e50914' },
    '& .MuiInputAdornment-root .MuiIconButton-root': { color: '#aaa' },
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0000 50%, #0a0a0a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2
    }}>
      <Paper elevation={10} sx={{
        width: '100%', maxWidth: 420,
        background: 'rgba(20,20,20,0.95)',
        border: '1px solid rgba(229,9,20,0.3)',
        borderRadius: 3, p: 4,
      }}>
        <Box textAlign="center" mb={3}>
          <LocalMovies sx={{ fontSize: 48, color: '#e50914', mb: 1 }} />
          <Typography variant="h4" fontWeight="900" color="white">Welcome Back</Typography>
          <Typography variant="body2" color="#aaa" mt={0.5}>Login to your MovieBooking account</Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, background: 'rgba(229,9,20,0.15)', color: '#ff6b6b', border: '1px solid rgba(229,9,20,0.4)' }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2.5}>
          <TextField label="Email Address" name="email" type="email"
            value={form.email} onChange={handleChange} required fullWidth sx={inputStyles} />

          <TextField label="Password" name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password} onChange={handleChange} required fullWidth sx={inputStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#aaa' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }} />

          <Button type="submit" variant="contained" fullWidth disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <LoginIcon />}
            sx={{
              mt: 1, py: 1.5, fontWeight: 700, fontSize: '1rem',
              background: 'linear-gradient(135deg, #e50914, #b20710)',
              '&:hover': { background: 'linear-gradient(135deg, #ff1a1a, #e50914)' },
              '&:disabled': { opacity: 0.6 }
            }}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>

        <Typography textAlign="center" mt={3} color="#aaa" variant="body2">
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#e50914', fontWeight: 700, textDecoration: 'none' }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}