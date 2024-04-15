/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { UserContext } from '../../services/UserContext';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('LoginForm', () => {
    const mockSetUserData = jest.fn();
    const mockSetTokenData = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      axios.post.mockClear();
      axios.get.mockClear();
    });
  
    const wrapper = ({ children }) => (
      <UserContext.Provider value={{ setUserData: mockSetUserData, setTokenData: mockSetTokenData }}>
        <MemoryRouter>{children}</MemoryRouter>
      </UserContext.Provider>
    );


  it('renders the login form', () => {
    render(<LoginForm />, { wrapper });
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  it('allows entering credentials', async () => {
    const { getByLabelText, getByRole } = render(<LoginForm />, { wrapper });
  
    await act(async () => {
       userEvent.type(getByLabelText('Username'), 'testuser');
       userEvent.type(getByLabelText('Password'), 'password');
    });
  
    expect(getByLabelText('Username').value).toBe('testuser');
    expect(getByLabelText('Password').value).toBe('password');
    
    await act(async () => {
      userEvent.click(getByRole('button', { name: /Log In/i }));
    });
  
  });

  it('submits the form, logs in successfully, and fetches user details', async () => {
    axios.post.mockResolvedValue({ data: { access_token: '12345' } });
    axios.get.mockResolvedValue({ data: { name: 'John Doe', role: 'admin' } });

    render(<LoginForm />, { wrapper });
    await act(async () => {
        userEvent.type(screen.getByLabelText('Username'), 'testuser');
        userEvent.type(screen.getByLabelText('Password'), 'password');
        fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    });

    await waitFor(() => {
      expect(mockSetTokenData).toHaveBeenCalledWith("12345");
    });
  });


  it('handles login failure', async () => {
    const errorMessage = 'Failed to login. Check data.';
    axios.post.mockRejectedValue({
      response: { data: { detail: errorMessage } }
    });

    render(<LoginForm />, { wrapper });
    await act(async () => {
        userEvent.type(screen.getByLabelText('Username'), 'testuser');
        userEvent.type(screen.getByLabelText('Password'), 'password');
        fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    });

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
  
});
