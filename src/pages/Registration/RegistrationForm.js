import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { InputField, Button, Alert } from 'components';
import { validateForm } from 'utils/constants/validation';
import { registerUser } from 'services/userService';
import ErrorHandler from 'utils/errorHandler'

/**
* Handles the registration functionality.
* It captures user input, validates the form,
* submits registration data, and displays corresponding alerts.
**/
function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length === 0) {
            const { confirmPassword, ...dataToSend } = formData;
            try {
                await registerUser(dataToSend);
                setAlert({ show: true, type: 'success', message: 'Registration successful!' });
                navigate('/login');
            } catch (error) {
                ErrorHandler.handleUIError(error, setAlert);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <>
            {alert.show && <Alert type={alert.type} message={alert.message} />}
            <Form noValidate onSubmit={handleSubmit}>
                {Object.entries(formData).map(([key, value]) => (
                    <InputField
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        type={(key === 'password' || key === 'confirmPassword') ? 'password' : key === 'email' ? 'email' : 'text'}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        isInvalid={!!errors[key]}
                        errorMessage={errors[key]}
                    />
                ))}
                <Button 
                    className="register-button" 
                    type="submit">
                        Register
                </Button>
            </Form>
        </>
    );
}

export default RegistrationForm;
