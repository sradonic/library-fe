import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import './styles/Button.scss'

const Button = ({ type, variant, children, onClick, className }) => (
    <BootstrapButton 
        type={type} 
        variant={variant || 'primary'} 
        className={className} 
        onClick={onClick}>
         {children}
    </BootstrapButton>
);
export default Button;
