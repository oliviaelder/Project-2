import React, { useState } from 'react';
import AxiosClient2 from './AxiosClient2.js';
import { Link, useNavigate } from "react-router-dom";

function AddClient() {
  const apiClient = AxiosClient2();
  const navigate = useNavigate();

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle changes to input fields
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmailAddress(e.target.value);
  const handlePhoneChange = (e) => setPhoneNumber(e.target.value);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!emailAddress.trim()) newErrors.emailAddress = 'A valid email address is required.';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'A valid 10-digit phone number is required.';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    // Proceed if validation passes
    try {
      // Fetch existing clients
      const response = await apiClient.get('/clients');
      const existingClients = response.data;

      // Find the highest client ID
      const highestId = existingClients.reduce(
        (max, client) => (Number(client.id) > max ? Number(client.id) : max),
        0
      );

      const newId = highestId + 1;

      // Create the new client object
      const newClient = {
        id: String(newId), // Convert to string
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
      };

      // Save the new client to the database
      const postResponse = await apiClient.post('/clients', JSON.stringify(newClient), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Client added successfully:', postResponse.data);

      // Show success message
      setSuccessMessage('New client added successfully!');

      // Clear form fields
      setFirstName('');
      setLastName('');
      setEmailAddress('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error adding client:', error.response || error.message);
    }
  };

  return (
    <div className="container">
      <h2>Add a New Client</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name Input */}
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              className="input is-primary"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        {/* Last Name Input */}
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className="input is-primary"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        {/* Email Address Input */}
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              className="input is-primary"
              type="email"
              value={emailAddress}
              onChange={handleEmailChange}
            />
          </div>
          {errors.emailAddress && <p className="error-message">{errors.emailAddress}</p>}
        </div>

        {/* Phone Number Input */}
        <div className="field">
          <label className="label">Phone Number</label>
          <div className="control">
            <input
              className="input is-primary"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="button is-primary">
          Add Client
        </button>

        {/* Success Message */}
        {successMessage && <p className="help is-success">{successMessage}</p>}

        <div className="control">
          <Link to="/" className="button is-link is-light">
           Return to Main Menu
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddClient;
