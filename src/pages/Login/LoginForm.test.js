/* eslint-disable testing-library/no-wait-for-multiple-assertions */
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
import ErrorHandler from 'utils/errorHandler';

jest.mock('axios');

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

jest.mock('utils/errorHandler', () => {
  return {
    handleUIError: jest.fn((error, setAlert) => {
      setAlert({
        show: true,
        type: 'error',
        message: error.message || 'An unexpected error occurred.'
      });
    }),
    handleServiceError: jest.fn(error => {
      throw new Error(error.response.data.detail);
    })
  };
});


describe('LoginForm', () => {
    const mockSetUserData = jest.fn();
    const mockSetTokenData = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(console, 'error').mockClear();
      axios.post.mockClear();
      axios.get.mockClear();
      ErrorHandler.handleUIError.mockClear();
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
      userEvent.click(getByRole('button', { name:'Log In' }));
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
    const errorResponse = {
      response: {
        data: { detail: errorMessage },
        status: 400,
        statusText: 'Bad Request'
      }
    };
    axios.post.mockRejectedValue(errorResponse);

    render(<LoginForm />, { wrapper });
    await act(async () => {
        userEvent.type(screen.getByLabelText('Username'), 'testuser');
        userEvent.type(screen.getByLabelText('Password'), 'password');
        fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    });

    await waitFor(() => {
      expect(ErrorHandler.handleUIError).toHaveBeenCalledWith(expect.objectContaining({
        response: expect.objectContaining({
          data: expect.objectContaining({
            detail: errorMessage
          }),
          status: 400
        })
      }), expect.any(Function));
    });
  });

  
});
