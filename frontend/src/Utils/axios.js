import axios from 'axios';

const API = axios.create({
  baseURL: 'https://docnow-gux6.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
