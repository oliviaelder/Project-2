import React, { useState } from 'react';
import AxiosClient2 from './AxiosClient2.js';
import { Link, useNavigate } from "react-router-dom";

function AddHabit() {
  const apiClient = AxiosClient2();
  const navigate = useNavigate();

  // State to hold new habit information
  const [habitName, setHabitName] = useState('');
  const [habitDesc, setHabitDesc] = useState('');
  const [habitQuantity, setHabitQuantity] = useState('');
  const [errors, setErrors] = useState({}); // State for validation errors
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Handle changes to input fields
  const handleNameChange = (e) => setHabitName(e.target.value);
  const handleDescChange = (e) => setHabitDesc(e.target.value);
  const handleQuantityChange = (e) => setHabitQuantity(e.target.value);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!habitName.trim()) newErrors.habitName = 'Habit name is required.';
    if (!habitDesc.trim()) newErrors.habitDesc = 'Habit description is required.';
    if (!habitQuantity || habitQuantity <= 0)
      newErrors.habitQuantity = 'Daily recommended units must be a positive number.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set validation errors
      return; // Stop submission if there are errors
    }
  
    // Proceed if validation passes
    try {
      const response = await apiClient.get('/habits');
      const existingHabits = response.data;
  
      // Ensure IDs are treated as numbers and find the highest ID
      const highestId = existingHabits.reduce(
        (max, habit) => (Number(habit.id) > max ? Number(habit.id) : max),
        0
      );
      console.log("hightest id" + highestId);
      
      const newId = highestId + 1;
      console.log("newId id" + newId);
      // Create the new habit object
      const newHabit = {
        id: newId,
        name: habitName,
        desc: habitDesc,
        quantity: habitQuantity,
      };
  
      // Save the new habit to the database
      const postResponse = await apiClient.post('/habits', JSON.stringify(newHabit), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Habit added successfully:', postResponse.data);
  
      // Show success message
      setSuccessMessage("New habit added successfully!");
  
      // Redirect to the habits list after 3 seconds
      setTimeout(() => {
        navigate('/habits');
      }, 3000);
    } catch (error) {
      console.error('Error adding habit:', error.response || error.message);
    }
  };

  return (
    <div className="container">
      <h2>Add a New Habit</h2>
      <form onSubmit={handleSubmit}>
        {/* Habit Name Input */}
        <div className="field">
          <label className="label">Habit Name</label>
          <div className="control">
            <input
              className="input is-primary"
              type="text"
              value={habitName}
              onChange={handleNameChange}
            />
          </div>
          {/* Validation Message for Habit Name */}
          {errors.habitName && <p className="error-message">{errors.habitName}</p>}
        </div>
  
        <br />
  
        {/* Habit Description Input */}
        <div className="field">
          <label className="label">Habit Description</label>
          <div className="control">
            <input
              className="input is-primary"
              type="text"
              value={habitDesc}
              onChange={handleDescChange}
            />
          </div>
          {/* Validation Message for Habit Description */}
          {errors.habitDesc && <p className="error-message">{errors.habitDesc}</p>}
        </div>
  
        <br />
  
        {/* Habit Quantity Input */}
        <div className="field">
          <label className="label">Daily Recommended Units</label>
          <div className="control">
            <input
              className="input is-primary"
              type="number"
              value={habitQuantity}
              onChange={handleQuantityChange}
            />
          </div>
          {/* Validation Message for Habit Quantity */}
          {errors.habitQuantity && (
            <p className="error-message">{errors.habitQuantity}</p>
          )}
        </div>
  
        <br />
  
        {/* Submit Button */}
        <button type="submit" className="button is-primary">
          Save Habit
        </button>

        <br />
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

export default AddHabit;
