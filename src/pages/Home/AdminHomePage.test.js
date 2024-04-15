/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AdminHomePage from './AdminHomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import * as userService from '../../services/userService';

jest.mock('../../services/userService');
jest.mock('../../components/Table', () => ({ data, columns, renderRow }) => (
    <table>
      <thead>
        <tr>{columns.map((col, index) => <th key={index}>{col.header}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((item, index) => renderRow(item, index))}
      </tbody>
    </table>
  ));
  
jest.mock('../../components/Navbar', () => () => <div>Navbar</div>);

describe('AdminHomePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        console.error = jest.fn(); // Mock console.error to check error logging
    });

    it('displays the loading state initially', async () => {
        userService.fetchUsers.mockResolvedValue([]);
        render(
            <Router>
                <AdminHomePage />
            </Router>
        );

        expect(screen.getByText('Users List')).toBeInTheDocument();
        expect(screen.getByText('Navbar')).toBeInTheDocument();
        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('loads and displays users successfully', async () => {
        const users = [
            { id: 1, username: 'bell', name: 'William Bell', email: 'wilbel@example.com', role: { name: 'admin' } }
        ];
        userService.fetchUsers.mockResolvedValue(users);

        render(
            <Router>
                <AdminHomePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Users List')).toBeInTheDocument();
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
    });

    it('displays an error message when the API call fails', async () => {
        const errorMessage = 'Error fetching users';
        userService.fetchUsers.mockRejectedValue(new Error(errorMessage));

        render(
            <Router>
                <AdminHomePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
        expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
    });

    it('renders table with user data correctly', async () => {
        const users = [
            { id: 1, username: 'bell', name: 'William Bell', email: 'wilbel@example.com', role: { name: 'admin' } }
        ];
        userService.fetchUsers.mockResolvedValue(users);

        render(
            <Router>
                <AdminHomePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('William Bell')).toBeInTheDocument();
        });
    });
});
