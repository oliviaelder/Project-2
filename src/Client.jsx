import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosClient2 from "./AxiosClient2.js";

function Client() {
  const apiClient = AxiosClient2();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedClientDetails, setSelectedClientDetails] = useState(null);

  // Individual fields for editing client details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    // Fetch clients from the API
    apiClient
      .get("/clients")
      .then((response) => {
        console.log("Fetched Clients:", response.data); // Log fetched data
        setClients(response.data); // Directly set fetched clients
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);
  
  

  const handleClientSelection = (event) => {
    const clientId = Number(event.target.value); // Convert the dropdown value to a number
    setSelectedClientId(clientId);
  
    if (clientId) {
      apiClient
        .get(`/clients/${clientId}`)
        .then((response) => {
          console.log("Fetched Client Details:", response.data); // Log fetched client details
          const clientData = response.data;
          setSelectedClientDetails(clientData);
          setFirstName(clientData.firstName || "");
          setLastName(clientData.lastName || "");
          setPhoneNumber(clientData.phoneNumber || "");
          setEmailAddress(clientData.emailAddress || "");
        })
        .catch((error) => {
          console.error("Error fetching client details:", error);
        });
    } else {
      setSelectedClientDetails(null);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmailAddress("");
    }
  };
  

  const saveClient = (event) => {
    event.preventDefault();
  
    if (!selectedClientId) {
      alert("Please select a client to save changes.");
      return;
    }
  
    const updatedClient = {
      id: selectedClientId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber.trim(),
      emailAddress: emailAddress.trim(),
    };
  
    console.log("Payload being sent:", updatedClient);
  
    apiClient
      .put(`/clients/${selectedClientId}`, updatedClient, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Server response:", response.data);
        alert("Client updated successfully!");
  
        // Refetch clients after saving
        return apiClient.get("/clients");
      })
      .then((response) => {
        console.log("Refetched Clients:", response.data); // Log the refetched clients
        setClients(response.data); // Update the state with the latest clients
        setSelectedClientId(""); // Clear the selected client id
        setSelectedClientDetails(null); // Clear client details
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setEmailAddress("");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
          alert(`Failed to update the client: ${error.response.data.message || error.response.data}`);
        } else if (error.request) {
          console.error("Error request:", error.request);
          alert("Failed to update the client. No response from the server.");
        } else {
          console.error("Error message:", error.message);
          alert(`An unexpected error occurred: ${error.message}`);
        }
      });
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <header className="card-header has-background-primary-light">
         <h2>Edit Clients</h2>
        </header>
        <div className="card-content">
          <div className="content">
            {/* Client Selection Dropdown */}
            <div className="field">
    
              <div className="control">
                <div className="select">
                  <select value={selectedClientId} onChange={handleClientSelection}>
                    <option value="">-- Choose a Client --</option>
                    {clients.map((client) => (
                     <option key={client.id} value={String(client.id)}>
                     {client.firstName} {client.lastName}
                     </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <br></br>
            {/* Form for Editing Client Details */}
            <form>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}                
                  />
                </div>
              </div>
              <br></br>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}                
                  />
                </div>
              </div>
              <br></br>
              <div className="field">
                <label className="label">Phone Number</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}         
                  />
                </div>
              </div>
              <br></br>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}              
                  />
                </div>
              </div>
              <br></br>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-success is-light" onClick={saveClient}>
                    <span className="icon">
                      <i className="fas fa-save"></i>
                    </span>
                    <span>Save Changes</span>
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={() => navigate("/AddClient")}
                    className="button is-primary"
                  >
                    Add New Client
                  </button>
                </div>
                <br></br>
                <div className="control">
                  <Link to="/" className="button is-link is-light">
                   Return to Main Menu
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;
