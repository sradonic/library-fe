import React, { useContext, useEffect, useState } from 'react';

import Navbar from 'components/Navbar';
import BookList from './components/BookList'; 
import { fetchMyBooks } from 'services/bookService';
import { UserContext } from 'services/UserContext';

/**
* Represents the homepage for logged-in users, displaying their borrowed books.
* It fetches the user's books data on component mount and renders them in a list.
**/
function HomePage() {
    const { user } = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            const getBooks = async () => {
                try {
                    const data = await fetchMyBooks();
                    setBooks(data);
                } catch (error) {
                    setError('Error fetching books');
                    console.error('Error:', error);
                }
            };
            getBooks();
        }
    }, [user]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <Navbar name={`Welcome to the library, ${user.name}`} />
            <div className="container mt-4">
                <h2>My Borrowed Books</h2>
                {error ? <p>{error}</p> : <BookList books={books} />}
            </div>
        </div>
    );
}

export default HomePage;
