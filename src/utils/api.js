import axios from 'axios';
import Alert from '../components/Alert';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const skipTokenRoutes = [
  { endpoint: '/token', method: 'post' },
  { endpoint: '/users/', method: 'post' }  
];


apiClient.interceptors.request.use(
  config => {
    const shouldSkipToken = skipTokenRoutes.some(route =>
      config.url.endsWith(route.endpoint) && config.method === route.method
    );
    if (!shouldSkipToken) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        Alert({ type: 'error', message: 'No authentication token found. Please login again.' });
        return Promise.reject(new Error('No authentication token found.'));
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);