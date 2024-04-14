import React from 'react';

const BookList = ({ books }) => {
    return (
        <div className="row">
            {books.map(book => (
                <div className="col-sm-12 col-md-6 col-lg-4 mb-3" key={book.id}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{book.book.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Due: {new Date(book.returned_date).toLocaleDateString()}</h6>
                            <p className="card-text"><strong>Author:</strong> {book.book.author}</p>
                            <p className="card-text"><strong>Description:</strong> {book.book.description}</p>
                            <p className="card-text"><small className="text-muted">Borrowed on: {new Date(book.borrowed_date).toLocaleDateString()}</small></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookList;
