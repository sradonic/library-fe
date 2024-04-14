import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import './styles/Navbar.scss';
import Button from './Button';

function Navbar({ name }) {
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <BootstrapNavbar bg="light" expand="lg">
            <div className="username px-3" style={{ color: '#888' }}>{name}</div>
            <Nav className="ms-auto px-3"> 
                <Button onClick={onLogout} className="logout-button " variant="outline-secondary">Logout</Button>
            </Nav>
        </BootstrapNavbar>
    );
}

export default Navbar;