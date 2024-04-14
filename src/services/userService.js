import { apiClient } from '../utils/api';

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/users/', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log("ondje");
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);
    const response = await apiClient.post('/token', params);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchUserDetails = async () => {
  try {
    console.log("ovdje");
    const response = await apiClient.get('/users/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
      const response = await apiClient.get('/users/');
      return response.data;
  } catch (error) {
      throw error;
  }
};