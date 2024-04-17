import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

import { Table, Button, Alert, Navbar, PaginationComponent } from 'components';
import useUserDetails from './helpers/useUserDetails';
import EditUserModal from './helpers/EditUserModal';
import { useUser } from 'services/UserContext';
import { Roles } from 'utils/constants/role';

/**
* Represents the user details page displaying information about a specific user, their borrowed books,
* and available books. Admins have the ability to edit user details.
**/
function UserDetails() {
    const { userId } = useParams(); 
    const [showEditModal, setShowEditModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const { user: loggedInUser } = useUser()
    const {
        user, books, allBooks, searchQuery, setSearchQuery, loading, handlePageChange,
        currentPage, totalBooks, pendingReturns, totalPages, setUser, booksPerPage, handleRenew, 
        handleReturn, handleAddBook, getPaginationNumbers
    } = useUserDetails(userId);

    const toggleEditModal = () => {
        if (loggedInUser && loggedInUser.role.name === Roles.admin) {
            setShowEditModal(!showEditModal);
        } else {
            setAlert({show: true, type: 'error', message: 'Only admins can edit user details.'});
        }
    };

    // Columns definition for user's borrowed books
    const bookColumns = [
        { header: 'Title' }, { header: 'Author' }, { header: 'Borrowed Date' },
        { header: 'Return Date' }, { header: 'Actions' }
    ];

    // Function to render rows for user's borrowed books
    const renderBookRow = (book, index) => (
        <tr key={index}>
            <td>{book.book.title}</td>
            <td>{book.book.author}</td>
            <td>{new Date(book.borrowed_date).toLocaleDateString()}</td>
            <td>{new Date(book.returned_date).toLocaleDateString()}</td>
            <td>
                <Button 
                    onClick={() => handleRenew(book.id, book.returned_date)} 
                    variant="success" 
                    className="btn-sm">
                        Renew
                </Button>
                <Button 
                    onClick={() => handleReturn(book.id)} 
                    variant={pendingReturns[book.id] ? 'warning' : 'danger'} 
                    className="btn-sm">
                        {pendingReturns[book.id] ? 'Confirm Return' : 'Return'}
                </Button>
            </td>
        </tr>
    );

    // Columns definition for available books
    const allBookColumns = [
        { header: 'Title' }, { header: 'Author' }, { header: 'Books Left' }, { header: 'Action' }
    ];

    // Function to render rows for available books
    const renderAllBookRow = (book, index) => (
        <tr key={index}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.quantity}</td>
            <td>
                <Button 
                    onClick={() => handleAddBook(book.id)} 
                    disabled={book.quantity === 0} 
                    className="btn-sm">
                        Add This Book
                </Button>
            </td>
        </tr>
    );

    // Filtered list of available books based on search query
    const filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
        <div>
            <Navbar name="User Details" />
            <div className="container mt-4">
                {user && (
                    <div>
                        <h2>{user.name} - {user.role.name} 
                            <Button variant="outline-info" onClick={toggleEditModal}>Edit</Button>
                        </h2>
                        <p>Email: {user.email}</p>
                        <EditUserModal 
                            show={showEditModal} 
                            handleClose={toggleEditModal} 
                            user={user} 
                            setUser={setUser} 
                        />
                        {alert.show && <Alert type={alert.type} message={alert.message} />}
                    </div>
                )}
                <Table 
                    data={books} 
                    columns={bookColumns} 
                    renderRow={renderBookRow} 
                />
                <input 
                    type="text" 
                    placeholder="Search books..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="form-control mb-2" 
                />
                {loading ? <p>Loading books...</p> : (
                    <div>
                        <Table 
                            data={filteredBooks} 
                            columns={allBookColumns} 
                            renderRow={renderAllBookRow} 
                        />
                        <div className="d-flex justify-content-between">
                            <div>
                            Showing {1 + (currentPage - 1) * booksPerPage} to {Math.min(currentPage * booksPerPage, totalBooks)} of {totalBooks} entries
                            </div>
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                getPaginationNumbers={getPaginationNumbers}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserDetails;
