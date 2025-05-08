import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://192.168.5.230:8000/api',
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`Bearer token set in axios interceptor`);
  } else {
    console.log(`No bearer token in axios interceptor`);
  }
  return config;
});
