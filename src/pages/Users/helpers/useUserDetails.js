import { useState, useEffect } from 'react';

import { fetchBooksByUser, fetchAllBooks, renewBook, returnBook, addBookToUser, fetchBookDetails } from 'services/bookService';
import { fetchSpecificUserDetails  } from 'services/userService';
import { getPaginationNumbers } from 'utils/pagination';

/** 
* Contains hooks for managing users, including fetching specific user and his books,
* handling book actions like renewing, returning, and adding, and pagination.
**/
const useUserDetails = (userId) => {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [totalBooks, setTotalBooks] = useState(0);
    const [pendingReturns, setPendingReturns] = useState({});
    const totalPages = Math.ceil(totalBooks / booksPerPage);

    // Fetch specific user details and their borrowed books
    useEffect(() => {
        setLoading(true);
        fetchSpecificUserDetails(userId).then(data => {
            setUser(data);
        })
        fetchBooksByUser(userId).then(data => {
            setBooks(data);
            setLoading(false);
        })
    }, [userId]);

    // Fetch all books with pagination
    useEffect(() => {
        setLoading(true);
        const offset = (currentPage - 1) * booksPerPage;
        fetchAllBooks(offset, booksPerPage).then(data => {
            setAllBooks(data.books);
            setTotalBooks(data.total_books);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching all books:', error);
            setLoading(false);
        });
    }, [currentPage, booksPerPage]);

    const handleRenew = async (borrowedBookId, currentReturnDate) => {
        const newReturnDate = new Date(currentReturnDate);
        newReturnDate.setDate(newReturnDate.getDate() + 14);
        try {
            await renewBook(borrowedBookId, newReturnDate); 
            setBooks(books.map(book => {
                if (book.id === borrowedBookId) {
                    return { ...book, returned_date: newReturnDate.toISOString() };
                }
                return book;
            }));
        } catch (error) {
            console.error('Failed to renew book:', error);
        }
    };

    const handleReturn = async (borrowedBookId) => {
        if (!pendingReturns[borrowedBookId]) {
            setPendingReturns(prev => ({ ...prev, [borrowedBookId]: true }));
            return;
        }

        try {
            await returnBook(borrowedBookId);
            setBooks(books.filter(book => book.id !== borrowedBookId));
            setPendingReturns(prev => {
                const newReturns = { ...prev };
                delete newReturns[borrowedBookId];
                return newReturns;
            });
        } catch (error) {
            console.error('Failed to return book:', error);
        }
    };

    const handleAddBook = async (bookId) => {
        setLoading(true);
        try {
            const addedBook = await addBookToUser(userId, bookId);
            if (addedBook && addedBook.book_id) {
                const bookDetails = await fetchBookDetails(addedBook.book_id);                
                const bookWithDetails = {
                    ...addedBook,
                    book: bookDetails
                };
                setBooks(prevBooks => [...prevBooks, bookWithDetails]);
            } else {
                console.error('Book details not found after adding book');
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to add book:', error);
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return {
        user,
        setUser,
        books,
        allBooks,
        searchQuery,
        setSearchQuery,
        loading,
        currentPage,
        setCurrentPage,
        totalBooks,
        pendingReturns,
        setPendingReturns,
        booksPerPage,
        handleRenew,
        handleReturn,
        handleAddBook,
        handlePageChange,
        totalPages,
        getPaginationNumbers: () => getPaginationNumbers(currentPage, totalPages),
    };
};

export default useUserDetails;
