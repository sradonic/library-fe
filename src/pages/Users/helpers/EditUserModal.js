import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import InputField from '../../../components/InputField';
import SelectField from '../../../components/SelectField';
import Button from '../../../components/Button';
import { updateUserDetails } from '../../../services/userService';
import { Roles } from '../../../utils/role';

/** 
* Modal component for editing user details. Displays username, name, email, and role,
* allowing admin to update given infromation. 
**/
const EditUserModal = ({ show, handleClose, user, setUser  }) => {
    const [formData, setFormData] = useState({ ...user });
    const roleOptions = Object.entries(Roles).map(([key, value]) => ({
        label: value, 
        value: value
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const payload = {
            username: formData.username,
            name: formData.name,
            email: formData.email,
            role: formData.role.name 
        };
        if (JSON.stringify(user) !== JSON.stringify(payload)) {
            try {
                const updatedUser = await updateUserDetails(user.id, payload);
                setUser(updatedUser); 
                handleClose();
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputField 
                    label="Username" 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                />
                <InputField 
                    label="Name" 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                />
                <InputField 
                    label="Email" 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
                <SelectField 
                    label="Role" 
                    name="role" 
                    value={formData.role} 
                    options={roleOptions} 
                    onChange={handleChange} 
                />
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="secondary" 
                    onClick={handleClose}>
                        Cancel
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit} 
                    disabled={JSON.stringify(user) === JSON.stringify(formData)}>
                        Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;
