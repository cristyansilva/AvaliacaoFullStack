import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  if (!baseURL) {
    return Promise.reject(new Error('Configure VITE_API_URL com a URL pública da API no Render.'));
  }
  const token = localStorage.getItem('monitoria-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
