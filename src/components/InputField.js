import React from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ label, type, name, value, onChange, isInvalid, errorMessage }) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      isInvalid={!!isInvalid}
    />
    <Form.Control.Feedback type="invalid">
      {errorMessage}
    </Form.Control.Feedback>
  </Form.Group>
);

export default InputField;
