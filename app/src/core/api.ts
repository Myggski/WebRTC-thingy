import axios from 'axios';

const api = axios.create({
  baseURL: '/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;
