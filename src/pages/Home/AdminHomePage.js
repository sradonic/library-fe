import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { fetchUsers } from '../../services/userService';
import Table from '../../components/Table';

function AdminHomePage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error:', error);
            }
        };
        getUsers();
    }, []);

    const columns = [
        { header: 'ID' },
        { header: 'Username' },
        { header: 'Name' },
        { header: 'Email' },
        { header: 'Role' },
        { header: 'Actions' }
    ];

    const renderRow = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role.name}</td>
            <td>
                <Link to={`/user/${item.id}`} className="btn btn-primary btn-sm">View Details</Link>
            </td>
        </tr>
    );

    return (
        <div>
            <Navbar name="Librarian/Admin Dashboard" />
            <div className="container mt-4">
                <h2>Users List</h2>
                {error ? <p>{error}</p> : <Table data={users} columns={columns} renderRow={renderRow} />}
            </div>
        </div>
    );
}

export default AdminHomePage;
