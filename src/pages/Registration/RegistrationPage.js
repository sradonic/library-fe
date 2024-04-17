import React from 'react';
import RegistrationForm from './RegistrationForm'; 
import './RegistrationPage.scss'; 
import library from 'assets/pexels-tima-miroshnichenko-6550162.jpg'

/** 
* RegistrationPage  renders a registration form for users to sign up for the application.
* Displays image of library from assets.
*/
function RegistrationPage() {
    return (
        <div className="container mt-5">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6">
                    <img src={library} alt="Library" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
