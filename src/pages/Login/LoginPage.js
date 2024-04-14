import React from 'react';
import LoginForm from './LoginForm';
import './LoginPage.scss'; 
import library from '../../assets/pexels-tima-miroshnichenko-6550162.jpg'

function LoginPage() {
    return (
        <div className="container mt-5">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6">
                    <img src={library} alt="Library" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
