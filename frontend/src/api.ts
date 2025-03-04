import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

export const fetchTest = async () => {
  try {
    const res = await API.get('/');
    return res.data;
  } catch (error) {
    console.error('Error fetching API', error);
  }
};
