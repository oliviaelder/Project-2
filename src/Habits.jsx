import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AxiosClient2 from "./AxiosClient2.js";

function Habits() {
  const apiClient = AxiosClient2();
  const location = useLocation();
  const navigate = useNavigate();

  const [habits, setHabits] = useState([]);
  const [selectedHabitId, setSelectedHabitId] = useState("");
  const [habitName, setHabitName] = useState("");
  const [habitDesc, setHabitDesc] = useState("");
  const [habitQuantity, setHabitQuantity] = useState("");
  const [errors, setErrors] = useState({}); // Validation errors state
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch habits from the API
    apiClient
      .get("/habits")
      .then((response) => {
        console.log("Fetched Habits:", response.data); // Log fetched data
        setHabits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching habits:", error);
      });
  }, []);

  function handleHabitSelection(event) {
    const habitId = event.target.value;
    setSelectedHabitId(habitId);

    if (habitId) {
      const selectedHabit = habits.find((h) => h.id === habitId);
      if (selectedHabit) {
        setHabitName(selectedHabit.name || "");
        setHabitDesc(selectedHabit.desc || "");
        setHabitQuantity(selectedHabit.quantity || "");
      } else {
        clearFields();
      }
    } else {
      clearFields();
    }
  }

  function clearFields() {
    setSelectedHabitId("");
    setHabitName("");
    setHabitDesc("");
    setHabitQuantity("");
    setErrors({});
  }

  const validateForm = () => {
    const newErrors = {};
    if (!habitName.trim()) newErrors.habitName = "Habit name is required.";
    if (!habitDesc.trim()) newErrors.habitDesc = "Habit description is required.";
    if (!habitQuantity || habitQuantity <= 0)
      newErrors.habitQuantity = "Daily recommended units must be a positive number.";
    return newErrors;
  };

  function saveHabit(event) {
    event.preventDefault();

    // Validate the form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set validation errors
      return; // Stop submission if there are errors
    }

    if (!selectedHabitId) {
      alert("Please select a habit to save.");
      return;
    }

    const updatedHabit = {
      id: selectedHabitId,
      name: habitName,
      desc: habitDesc,
      quantity: habitQuantity,
    };

    apiClient
      .put(`/habits/${selectedHabitId}`, JSON.stringify(updatedHabit), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setHabits((prevHabits) =>
          prevHabits.map((habit) =>
            habit.id === selectedHabitId ? response.data : habit
          )
        );
        setSuccessMessage("Habit updated successfully!");
        clearFields();
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error updating habit:", error);
        alert("Failed to save the habit. Please try again.");
      });
  }

  function handleHabitNameChange(e) {
    setHabitName(e.target.value);
  }

  function handleHabitDescChange(e) {
    setHabitDesc(e.target.value);
  }

  function handleHabitQuantityChange(e) {
    setHabitQuantity(e.target.value);
  }

  return (
    <div className="container">
      <div className="card mt-4">
        <header className="card-header has-background-primary-light">
          <h2>Edit Habits</h2>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="field">
              <div className="control">
                <div className="select">
                  <select value={selectedHabitId} onChange={handleHabitSelection}>
                    <option value="">-- Choose a Habit --</option>
                    {habits.map((habit) => (
                      <option key={habit.id} value={habit.id}>
                        {habit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <br />
            <form>
              <div className="field">
                <label className="label">Habit Name</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={habitName}
                    onChange={handleHabitNameChange}
                  />
                </div>
                {errors.habitName && <p className="error-message">{errors.habitName}</p>}
              </div>
              <br />
              <div className="field">
                <label className="label">Habit Description</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={habitDesc}
                    onChange={handleHabitDescChange}
                  />
                </div>
                {errors.habitDesc && <p className="error-message">{errors.habitDesc}</p>}
              </div>
              <br />
              <div className="field">
                <label className="label">Daily Recommended Units</label>
                <div className="control">
                  <input
                    className  ="input is-primary"
                    type="number"
                    value={habitQuantity}
                    onChange={handleHabitQuantityChange}
                  />
                </div>
                {errors.habitQuantity && (
                  <p className="error-message">{errors.habitQuantity}</p>
                )}
              </div>
              <br />
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-success" onClick={saveHabit}>
                    Save Changes
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={() => navigate("/add-habit")}
                    className="button is-primary"
                  >
                    Add New Habit
                  </button>
                </div>
                <div className="control">
                  <Link to="/" className="button is-link is-light">
                    Return to Main Menu
                  </Link>
                </div>
              </div>
            </form>
            {successMessage && (
              <p className="help is-success">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Habits;
