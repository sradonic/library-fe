/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import RegistrationForm from './RegistrationForm';
import { validateForm } from 'utils/constants/validation';
import { registerUser } from 'services/userService';
import ErrorHandler from 'utils/errorHandler';


jest.mock('services/userService'); 
jest.mock('utils/constants/validation'); 
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useNavigate: jest.fn(), 
}));

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

describe('RegistrationForm', () => {
    let navigateMock;

    beforeEach(() => {
        jest.clearAllMocks();
        navigateMock = jest.fn();
        useNavigate.mockImplementation(() => navigateMock);
    });

    it('renders the registration form with all fields', () => {
        render(
            <MemoryRouter>
                <RegistrationForm />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('ConfirmPassword')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    it('allows entering data into form fields', async () => {
        render(
            <MemoryRouter>
                <RegistrationForm />
            </MemoryRouter>
        );
        await act(async () => {
            userEvent.type(screen.getByLabelText('Username'), 'testuser');
            userEvent.type(screen.getByLabelText('Name'), 'Test User');
            userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
            userEvent.type(screen.getByLabelText('Password'), 'password123');
            userEvent.type(screen.getByLabelText('ConfirmPassword'), 'password123');
        });

        await waitFor(() => {
            expect(screen.getByLabelText('Username').value).toBe('testuser');
            expect(screen.getByLabelText('Name').value).toBe('Test User');
            expect(screen.getByLabelText('Email').value).toBe('test@example.com');
            expect(screen.getByLabelText('Password').value).toBe('password123');
            expect(screen.getByLabelText('ConfirmPassword').value).toBe('password123');
        });
    });

    it('validates the form data and handles form submission successfully', async () => {
        validateForm.mockReturnValue({}); // Mocking form validation to pass
        registerUser.mockResolvedValue({}); // Mocking a successful registration response

        render(
            <MemoryRouter>
                <RegistrationForm />
            </MemoryRouter>
        );
        await act(async () => {
            userEvent.type(screen.getByLabelText('Username'), 'testuser');
            userEvent.type(screen.getByLabelText('Password'), 'password123');
            fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
        });

        await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/login'));
    });

    it('shows validation errors when form data is incomplete', async () => {
        validateForm.mockReturnValue({ username: 'Username is required' });
        
        render(
            <MemoryRouter>
                <RegistrationForm />
            </MemoryRouter>
        );
        fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
        
        expect(await screen.findByText('Username is required')).toBeInTheDocument();
    });

    it('handles server errors during registration', async () => {
        validateForm.mockReturnValue({}); 
        const errorMessage = 'Failed to register. Check data.';
        const errorResponse = {
          response: {
            data: {
              detail: errorMessage
            },
            status: 400,
            statusText: 'Bad Request'
          }
        };
        registerUser.mockRejectedValue(errorResponse);
    
        render(
            <MemoryRouter>
                <RegistrationForm />
            </MemoryRouter>
        );
    
        await act(async () => {
            userEvent.type(screen.getByLabelText('Username'), 'testuser');
            userEvent.type(screen.getByLabelText('Password'), 'password123');
            fireEvent.submit(screen.getByRole('button', { name: 'Register' }));
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
