export const validateForm = (formData) => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters long';
    if (!/[0-9]/.test(formData.password)) errors.password = 'Password must contain at least one number';
    if (!/[A-Z]/.test(formData.password)) errors.password = 'Password must contain at least one uppercase letter';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is not valid';
    return errors;
  };
  