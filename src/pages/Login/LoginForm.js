import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import { InputField, Button, Alert } from 'components';
import { loginUser, fetchUserDetails } from 'services/userService';
import { UserContext } from 'services/UserContext';
import ErrorHandler from 'utils/errorHandler'

/** 
* Handles the login functionality.
* It captures user input, submits login data,
* and displays corresponding alerts.
**/
function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const { setUserData } = useContext(UserContext);
    const { setTokenData } = useContext(UserContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await loginUser(formData);
            setTokenData(data.access_token)
            const userData = await fetchUserDetails()
            setUserData(userData);
            setAlert({ show: true, type: 'success', message: 'Login successful!' });
            navigate('/home');
        } catch (error) {
            ErrorHandler.handleUIError(error, setAlert);
        }
    };
    
    return (
        <>
            {alert.show && <Alert type={alert.type} message={alert.message} />}
            <Form noValidate onSubmit={handleSubmit}>
                <InputField 
                    label="Username" 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                />
                <InputField 
                    label="Password" 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                />
                <Button 
                    variant="primary" 
                    className="login-button" 
                    type="submit">
                        Log In
                </Button>
            </Form>
        </>
    );
}
export default LoginForm;