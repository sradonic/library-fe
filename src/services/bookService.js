import { apiClient } from '../utils/api';

/**
 * Fetches the books borrowed by the current user.
 * @returns {Promise} A promise that resolves to an array of books.
 * @throws {Error} If there is an error while fetching the data.
 **/
export const fetchMyBooks = async () => {
  try {
      const response = await apiClient.get('/books/mybooks');
      return response.data;
  } catch (error) {
      throw error;
  }
};

/**
 * Fetches all books with pagination support.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of books per page.
 * @returns {Promise} A promise that resolves to an object containing books and total count.
 * @throws {Error} If there is an error while fetching the data.
 **/
export const fetchAllBooks = async (page, limit) => {
  try {
    const response = await apiClient.get(`/books?skip=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Fetches books borrowed by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise} A promise that resolves to an array of books.
 * @throws {Error} If there is an error while fetching the data.
 */
export const fetchBooksByUser = async (userId) => {
  try {
    const response = await apiClient.get(`/books/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Renews the return date of a borrowed book.
 * @param {string} bookId - The ID of the book.
 * @param {Date} newReturnDate - The new return date.
 * @returns {Promise} A promise that resolves to the updated book object.
 * @throws {Error} If there is an error while renewing the book.
 **/
export const renewBook = async (bookId, newReturnDate) => {
  try {
    const response = await apiClient.patch(`/books/borrowed/${bookId}/return-date/${newReturnDate.toISOString().split('T')[0]}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Returns a borrowed book.
 * @param {string} bookId - The ID of the book.
 * @returns {Promise} A promise that resolves to a success message.
 * @throws {Error} If there is an error while returning the book.
 **/
export const returnBook = async (bookId) => {
  try {
    const response = await apiClient.delete(`/books/borrowed/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Adds a book to a user's borrowed book collection.
 * @param {string} userId - The ID of the user.
 * @param {string} bookId - The ID of the book.
 * @returns {Promise} A promise that resolves to the added book object.
 * @throws {Error} If there is an error while adding the book.
 **/
export const addBookToUser = async (userId, bookId) => {
  try {
    const response = await apiClient.post(`/books/user/${userId}/book/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Fetches details of a book.
 * @param {string} bookId - The ID of the book.
 * @returns {Promise} A promise that resolves to the book details.
 * @throws {Error} If there is an error while fetching the details.
 */
export const fetchBookDetails = async (bookId) => {
  try {
    const response = await apiClient.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};