import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Box, Typography, TextField, Button, Chip, Avatar,
  CircularProgress, Alert, Paper, Grid, Divider
} from '@mui/material';
import {
  Edit, Save, Cancel, LocalMovies, Cake, Favorite,
  Phone, LocationOn, Movie
} from '@mui/icons-material';

const ALL_GENRES = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Romance',
  'Sci-Fi', 'Thriller', 'Animation', 'Documentary', 'Fantasy'
];

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: '#333' },
    '&:hover fieldset': { borderColor: '#e50914' },
    '&.Mui-focused fieldset': { borderColor: '#e50914' },
  },
  '& .MuiInputLabel-root': { color: '#888' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#e50914' },
};

export default function ProfilePage() {
  const { user, login, token } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', contact: '', city: '', state: '',
    birthday: '', anniversary: '', genres: []
  });

  // Load full profile from backend on mount
  useEffect(() => {
    axios.get('http://localhost:5001/api/auth/me')
      .then(res => {
        const u = res.data;
        setForm({
          name:        u.name        || '',
          contact:     u.contact     || '',
          city:        u.city        || '',
          state:       u.state       || '',
          birthday:    u.birthday    || '',
          anniversary: u.anniversary || '',
          genres:      u.genres      || [],
        });
      })
      .catch(() => {
        // fallback to token data
        setForm(f => ({ ...f, name: user?.name || '' }));
      });
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleGenre = (genre) => {
    setForm(f => ({
      ...f,
      genres: f.genres.includes(genre)
        ? f.genres.filter(g => g !== genre)
        : [...f.genres, genre]
    }));
  };

  const handleSave = async () => {
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await axios.put('http://localhost:5001/api/auth/profile', form);
      // Update name in auth context so navbar reflects new name
      login(token, { ...user, name: res.data.name });
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError('');
  };

  const initials = form.name
    ? form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #110000 100%)',
      px: { xs: 2, md: 6 }, py: 5
    }}>
      <Typography variant="h4" fontWeight="900" color="white" mb={4}
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalMovies sx={{ color: '#e50914' }} /> My Profile
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 3, background: 'rgba(0,200,100,0.1)', color: '#4caf50', border: '1px solid #4caf50' }}>{success}</Alert>}
      {error   && <Alert severity="error"   sx={{ mb: 3, background: 'rgba(229,9,20,0.1)',  color: '#ff6b6b', border: '1px solid #e50914' }}>{error}</Alert>}

      <Grid container spacing={3}>

        {/* LEFT — Avatar card */}
        <Grid item xs={12} md={3}>
          <Paper sx={{
            background: 'rgba(20,20,20,0.9)',
            border: '1px solid rgba(229,9,20,0.25)',
            borderRadius: 3, p: 3,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
          }}>
            <Avatar sx={{
              width: 100, height: 100, fontSize: 36, fontWeight: 900,
              background: 'linear-gradient(135deg, #e50914, #b20710)',
              border: '3px solid rgba(229,9,20,0.5)'
            }}>
              {initials}
            </Avatar>

            <Box textAlign="center">
              <Typography variant="h6" fontWeight="800" color="white">{form.name || '—'}</Typography>
              <Typography variant="body2" color="#888">{user?.email}</Typography>
              {(form.city || form.state) && (
                <Typography variant="body2" color="#aaa" mt={0.5}>
                  <LocationOn sx={{ fontSize: 14, mr: 0.3 }} />
                  {[form.city, form.state].filter(Boolean).join(', ')}
                </Typography>
              )}
            </Box>

            {/* Genre chips */}
            {form.genres.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                {form.genres.map(g => (
                  <Chip key={g} label={g} size="small"
                    sx={{ background: 'rgba(229,9,20,0.2)', color: '#ff6b6b', border: '1px solid rgba(229,9,20,0.4)', fontSize: 11 }} />
                ))}
              </Box>
            )}

            {!editing && (
              <Button fullWidth variant="outlined" startIcon={<Edit />}
                onClick={() => setEditing(true)}
                sx={{ borderColor: '#e50914', color: '#e50914', '&:hover': { background: 'rgba(229,9,20,0.1)', borderColor: '#e50914' } }}>
                Edit Profile
              </Button>
            )}
          </Paper>
        </Grid>

        {/* RIGHT — Details / Edit form */}
        <Grid item xs={12} md={9}>
          <Paper sx={{
            background: 'rgba(20,20,20,0.9)',
            border: '1px solid rgba(229,9,20,0.25)',
            borderRadius: 3, p: 3
          }}>

            {/* View mode */}
            {!editing && (
              <Box>
                <Typography variant="h6" fontWeight="700" color="white" mb={2}>Profile Details</Typography>
                <Divider sx={{ borderColor: 'rgba(229,9,20,0.2)', mb: 3 }} />
                <Grid container spacing={2}>
                  {[
                    { icon: <Phone sx={{ color: '#e50914', fontSize: 18 }} />, label: 'Contact', value: form.contact },
                    { icon: <LocationOn sx={{ color: '#e50914', fontSize: 18 }} />, label: 'City', value: form.city },
                    { icon: <LocationOn sx={{ color: '#e50914', fontSize: 18 }} />, label: 'State', value: form.state },
                    { icon: <Cake sx={{ color: '#e50914', fontSize: 18 }} />, label: 'Birthday', value: form.birthday ? new Date(form.birthday).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '' },
                    { icon: <Favorite sx={{ color: '#e50914', fontSize: 18 }} />, label: 'Anniversary', value: form.anniversary ? new Date(form.anniversary).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '' },
                  ].map(({ icon, label, value }) => (
                    <Grid item xs={12} sm={6} key={label}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5,
                        background: 'rgba(255,255,255,0.03)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.06)' }}>
                        {icon}
                        <Box>
                          <Typography variant="caption" color="#666">{label}</Typography>
                          <Typography variant="body2" color={value ? 'white' : '#444'}>
                            {value || 'Not set'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box mt={3}>
                  <Typography variant="body2" color="#666" mb={1.5}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Movie sx={{ fontSize: 16 }} /> Favourite Genres
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {form.genres.length > 0
                      ? form.genres.map(g => (
                          <Chip key={g} label={g}
                            sx={{ background: 'rgba(229,9,20,0.15)', color: '#ff8a80',
                              border: '1px solid rgba(229,9,20,0.35)' }} />
                        ))
                      : <Typography variant="body2" color="#444">No genres selected</Typography>
                    }
                  </Box>
                </Box>
              </Box>
            )}

            {/* Edit mode */}
            {editing && (
              <Box>
                <Typography variant="h6" fontWeight="700" color="white" mb={2}>Edit Profile</Typography>
                <Divider sx={{ borderColor: 'rgba(229,9,20,0.2)', mb: 3 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Full Name" name="name" value={form.name}
                      onChange={handleChange} fullWidth sx={inputStyles} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Contact Number" name="contact" value={form.contact}
                      onChange={handleChange} fullWidth sx={inputStyles} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="City" name="city" value={form.city}
                      onChange={handleChange} fullWidth sx={inputStyles} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="State" name="state" value={form.state}
                      onChange={handleChange} fullWidth sx={inputStyles} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Birthday" name="birthday" type="date" value={form.birthday}
                      onChange={handleChange} fullWidth sx={inputStyles}
                      InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Anniversary" name="anniversary" type="date" value={form.anniversary}
                      onChange={handleChange} fullWidth sx={inputStyles}
                      InputLabelProps={{ shrink: true }} />
                  </Grid>
                </Grid>

                {/* Genre picker */}
                <Box mt={3}>
                  <Typography variant="body2" color="#888" mb={1.5}>
                    Favourite Genres — tap to select
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {ALL_GENRES.map(genre => {
                      const selected = form.genres.includes(genre);
                      return (
                        <Chip key={genre} label={genre} onClick={() => toggleGenre(genre)}
                          sx={{
                            cursor: 'pointer',
                            background: selected ? 'rgba(229,9,20,0.25)' : 'rgba(255,255,255,0.05)',
                            color: selected ? '#ff8a80' : '#888',
                            border: selected ? '1px solid rgba(229,9,20,0.6)' : '1px solid rgba(255,255,255,0.1)',
                            fontWeight: selected ? 700 : 400,
                            transition: 'all 0.2s',
                            '&:hover': { background: 'rgba(229,9,20,0.2)', color: '#ffcdd2' }
                          }} />
                      );
                    })}
                  </Box>
                </Box>

                {/* Save / Cancel */}
                <Box mt={4} display="flex" gap={2}>
                  <Button variant="contained" startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Save />}
                    onClick={handleSave} disabled={loading}
                    sx={{
                      background: 'linear-gradient(135deg, #e50914, #b20710)',
                      fontWeight: 700, px: 4,
                      '&:hover': { background: 'linear-gradient(135deg, #ff1a1a, #e50914)' }
                    }}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outlined" startIcon={<Cancel />} onClick={handleCancel}
                    sx={{ borderColor: '#555', color: '#aaa', '&:hover': { borderColor: '#888', background: 'rgba(255,255,255,0.05)' } }}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}