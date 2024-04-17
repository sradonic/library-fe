import { apiClient } from 'utils/api';
import ErrorHandler from 'utils/errorHandler'

/**
 * Registers a new user.
 * @param {Object} userData - User data to be registered.
 * @returns {Promise} A promise that resolves to the registered user data.
 * @throws {Error} If there is an error while registering the user.
 **/
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/users/', userData);

    return response.data;
  } catch (error) {
    ErrorHandler.handleServiceError(error);
    throw error;
  }
};

/**
 * Logs in a user.
 * @param {Object} credentials - User credentials (username and password).
 * @returns {Promise} A promise that resolves to the authentication token.
 * @throws {Error} If there is an error while logging in.
 **/
export const loginUser = async (credentials) => {
  try {
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);
    const response = await apiClient.post('/token', params);

    return response.data;
  } catch (error) {
    ErrorHandler.handleServiceError(error);
    throw error;
  }
};

/**
 * Fetches details of the current user.
 * @returns {Promise} A promise that resolves to the user details.
 * @throws {Error} If there is an error while fetching the user details.
 **/
export const fetchUserDetails = async () => {
  try {
    const response = await apiClient.get('/users/me');

    return response.data;
  } catch (error) {
    ErrorHandler.handleServiceError(error);
    throw error;
  }
};

/**
 * Fetches details of all users.
 * @returns {Promise} A promise that resolves to an array of user details.
 * @throws {Error} If there is an error while fetching the user details.
 **/
export const fetchUsers = async () => {
  try {
      const response = await apiClient.get('/users/');

      return response.data;
  } catch (error) {
      ErrorHandler.handleServiceError(error);
      throw error;
  }
};

/**
 * Fetches details of a specific user.
 * @param {string} userId - The ID of the user to fetch details for.
 * @returns {Promise} A promise that resolves to the user details.
 * @throws {Error} If there is an error while fetching the user details.
 **/
export const fetchSpecificUserDetails = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);

    return response.data;
  } catch (error) {
    ErrorHandler.handleServiceError(error);
    throw error;
  }
};

/**
 * Updates details of a specific user.
 * @param {string} userId - The ID of the user to update.
 * @param {Object} userData - New user data.
 * @returns {Promise} A promise that resolves to the updated user details.
 * @throws {Error} If there is an error while updating the user details.
 **/
export const updateUserDetails = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    
    return response.data;
  } catch (error) {
    ErrorHandler.handleServiceError(error);
    throw error;
  }
};