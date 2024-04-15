/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { UserContext } from '../../services/UserContext';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('HomePage', () => {
    const mockUser = { name: 'Test User' };

    const wrapper = ({ children }) => (
        <UserContext.Provider value={{ user: mockUser }}>
            <MemoryRouter>{children}</MemoryRouter>
        </UserContext.Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
        console.error = jest.fn();
    });

    it('displays loading when user is null', () => {
        render(<HomePage />, { wrapper: ({ children }) => <UserContext.Provider value={{ user: null }}>{children}</UserContext.Provider> });
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('fetches books and displays them when user is logged in', async () => {
        const books = [{ id: 1, book: { title: 'Lord of the Rings', author: 'JRR Tolkien', description: 'The one ring', returned_date: '2024-05-20', borrowed_date: '2024-04-20' } }];
        axios.get.mockResolvedValue({ data: books });

        render(<HomePage />, { wrapper });

        await waitFor(() => {
            expect(screen.getByText('Lord of the Rings')).toBeInTheDocument();
            expect(screen.getByText('JRR Tolkien')).toBeInTheDocument();
            expect(screen.getByText('The one ring')).toBeInTheDocument();
        });
    });

    it('shows an error message when the API call fails', async () => {
        axios.get.mockRejectedValue(new Error('Error fetching books'));

        render(<HomePage />, { wrapper });

        await waitFor(() => {
            expect(screen.getByText('Error fetching books')).toBeInTheDocument();
        });
        expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
    });

    it('renders books correctly when data is fetched', async () => {
        const books = [
            { id: 1, book: { title: 'Harry Potter', author: 'JK Rowling', description: 'Boy Wizard', returned_date: '2024-05-20', borrowed_date: '2024-04-20' } }
        ];
        axios.get.mockResolvedValue({ data: books });

        render(<HomePage />, { wrapper });

        await waitFor(() => {
            expect(screen.getAllByText('Harry Potter')).toHaveLength(1);
            expect(screen.getAllByText('JK Rowling')).toHaveLength(1);
            expect(screen.getAllByText('Boy Wizard')).toHaveLength(1);
        });
    });
});
