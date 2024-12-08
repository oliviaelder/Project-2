import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosClient2 from "./AxiosClient2"; // Adjust import based on your setup

function UserHabits() {
  const apiClient = AxiosClient2();
  const navigate = useNavigate();

  // State variables for users, habits, and form fields
  const [clients, setClients] = useState([]);
  const [habits, setHabits] = useState([]);
  const [userHabits, setUserHabits] = useState([]); // Added state for user habits
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedHabitId, setSelectedHabitId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({}); // State for validation errors

  // Fetch clients and habits when the component loads
  useEffect(() => {
    // Fetch clients
    apiClient
      .get("/clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });

    // Fetch habits
    apiClient
      .get("/habits")
      .then((response) => {
        setHabits(response.data);
        console.log("Fetched habits:", response.data); // Log habits to verify they are being fetched
      })
      .catch((error) => {
        console.error("Error fetching habits:", error);
      });

    // Fetch user habits for the current user
    if (selectedClientId) {
      apiClient
        .get(`/user-habits?clientId=${selectedClientId}`)
        .then((response) => {
          setUserHabits(response.data); // Update the list of user habits
        })
        .catch((error) => {
          console.error("Error fetching user habits:", error);
        });
    }
  }, [selectedClientId]); // This effect depends on `selectedClientId`

  // Handle changes in client selection
  const handleClientSelection = (event) => {
    setSelectedClientId(event.target.value);
  };

  // Handle changes in habit selection
  const handleHabitSelection = (event) => {
    setSelectedHabitId(event.target.value);
  };

  // Handle changes in quantity input
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  // Handle changes in date input
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Save the habit record
  const saveRecord = async (event) => {
    event.preventDefault();
  
    // Ensure all required fields are filled
    if (!selectedClientId || !selectedHabitId || !quantity || !date) {
      alert("Please fill in all the fields.");
      return;
    }
  
    try {
      // Fetch existing user habit records
      const response = await apiClient.get("/user-habits");
  
      const existingHabits = response.data;
  
      // Find the highest existing ID and increment by 1
      const highestId = existingHabits.reduce(
        (max, habit) => (Number(habit.id) > max ? Number(habit.id) : max),
        0
      );
      const newId = highestId + 1; // Increment by 1
  
      // Create the new habit record object with the generated ID
      const newRecord = {
        id: newId,
        clientId: selectedClientId,
        habitId: selectedHabitId,
        quantity: quantity,
        date: date,
      };
  
      // Post the new habit record
      const postResponse = await apiClient.post("/user-habits", JSON.stringify(newRecord), {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is set to JSON
        },
      });
  
      // Show success message
      setSuccessMessage("Habit record saved successfully!");
  
      // Fetch the updated user habits list
      apiClient
        .get(`/user-habits?clientId=${selectedClientId}`)
        .then((response) => {
          setUserHabits(response.data); // Update user habits list after saving
        })
        .catch((error) => {
          console.error("Error fetching user habits after saving:", error);
        });
  
      // Clear the form after saving
      setSelectedClientId("");
      setSelectedHabitId("");
      setQuantity("");
      setDate("");
  
      // Clear the success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Failed to save the record.");
    }
  };

  // Function to get the habit name by habitId
  const getHabitName = (habitId) => {
    console.log("Looking for habit with ID:", habitId); // Log habitId to ensure it's correct
    const habit = habits.find((habit) => habit.id === habitId);
    console.log("Found habit:", habit); // Log the found habit to verify the lookup
    return habit ? habit.name : "Unknown Habit";
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <header className="card-header has-background-primary-light">
          <h2 className="card-header-title">Add Habit Record</h2>
        </header>
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveRecord}>
              {/* Client Selection */}
              <div className="field">
                <div className="control">
                  <select
                    className="select"
                    value={selectedClientId}
                    onChange={handleClientSelection}
                  >
                    <option value="">-- Select Client --</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.firstName} {client.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />

              {/* Habit Selection */}
              <div className="field">
                <label className="label">Select Habit</label>
                <div className="control">
                  <select
                    className="select"
                    value={selectedHabitId}
                    onChange={handleHabitSelection}
                  >
                    <option value="">-- Select Habit --</option>
                    {habits.map((habit) => (
                      <option key={habit.id} value={habit.id}>
                        {habit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />

              {/* Quantity Input */}
              <div className="field">
                <label className="label">Units</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
              </div>
              <br />

              {/* Date Input */}
              <div className="field">
                <label className="label">Date</label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
              <br />

              {/* Submit Button */}
              <div className="field is-grouped">
                <div className="control">
                  <button type="submit" className="button is-primary">
                    Save Record
                  </button>
                </div>
              </div>
              {successMessage && (
                <p className="has-text-success ml-4">{successMessage}</p>
              )}
            </form>

            {/* Display List of Entered User Habits */}
            {userHabits.length > 0 && (
              <div className="mt-5">
                <h3 className="title is-4">Entered Habit Records</h3>
                <table className="table is-fullwidth">
                  <thead>
                    <tr>
                      <th>Habit</th>
                      <th>Quantity</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userHabits.map((record) => (
                      <tr key={record.id}>
                        <td>{getHabitName(record.habitId)}</td>
                        <td>{record.quantity}</td>
                        <td>{record.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="control">
              <Link to="/" className="button is-link is-light">
                Return to Main Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHabits;
