import React, { useState, useEffect } from "react";
import * as axios from 'axios';
import "./App.css";
import AxiosClient2 from "./AxiosClient2.js";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Clients() {
  const apiClient = AxiosClient2();
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function goToClient(id) {
    console.log("clients: ", id);

    navigate('/client', { state: { id: id} });
  }

  function showClickable(e) {
    e.target.style.cursor = "pointer";
  }

  useEffect(() => {
    apiClient
      .get("/clients")
      .then((response) => {
        setClients(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  return (
    <>
    <div className="content-container">
        <div className="columns">
            <div className="column is-8">
                <div className="section content-title-group">
                    <h2 className="title">Select a Client</h2>
                    <ul>
  {clients.map((client) => (
    <li
      key={client.id}
      onClick={() => goToClient(client.id)}
      onMouseOver={(e) => showClickable(e)}
      className="name-link"
    >
      <div className="card">
        <div className="card-content">
          <div className="content">
            <span className="name">
              {client.firstName} {client.lastName}
            </span>
            <div className="description">{client.emailAddress}</div>
          </div>
        </div>
      </div>
    </li>
  ))}
</ul>

                </div>
                <div className="notification is-info">{ message }
                </div>
            </div>
        </div>
    </div>
    <Link to="/addclient" state={{clients:clients}}>Add Client</Link>
    </>
  );
};

export default Clients;