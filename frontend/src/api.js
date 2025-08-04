import axios from 'axios';

const API = axios.create({
  baseURL: 'srv-d28fkter433s73dvg0cg',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
