import React from 'react';
import { Form } from 'react-bootstrap';

const SelectField = ({ label, name, value, options, onChange, isInvalid, errorMessage }) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control as="select" name={name} value={value} onChange={onChange} isInvalid={!!isInvalid}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Control>
    <Form.Control.Feedback type="invalid">
      {errorMessage}
    </Form.Control.Feedback>
  </Form.Group>
);

export default SelectField;
