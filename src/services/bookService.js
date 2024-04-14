import { apiClient } from '../utils/api';

export const fetchMyBooks = async () => {
  try {
      const response = await apiClient.get('/books/mybooks');
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const fetchAllBooks = async (page, limit) => {
  try {
    const response = await apiClient.get(`/books?skip=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchBooksByUser = async (userId) => {
  try {
    const response = await apiClient.get(`/books/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const renewBook = async (bookId, newReturnDate) => {
  try {
    const response = await apiClient.patch(`/books/borrowed/${bookId}/return-date/${newReturnDate.toISOString().split('T')[0]}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const returnBook = async (bookId) => {
  try {
    const response = await apiClient.delete(`/books/borrowed/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addBookToUser = async (userId, bookId) => {
  try {
    const response = await apiClient.post(`/books/user/${userId}/book/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchBookDetails = async (bookId) => {
  try {
    const response = await apiClient.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};