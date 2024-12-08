import React from 'react';
import { Link } from 'react-router-dom';

function MainMenu() {
  return (
    <div className="main-menu-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Main Menu</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/client">
          <button
            style={{
              padding: '10px 20px',
              margin: '10px',
              fontSize: '16px',
              backgroundColor: '#28A745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Maintain Clients
          </button>
        </Link>
        <Link to="/habits">
          <button
            style={{
              padding: '10px 20px',
              margin: '10px',
              fontSize: '16px',
              backgroundColor: '#28A745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Maintain Habits
          </button>
        </Link>
        <br></br>
        <Link to="/user-habits">
          <button
            style={{
              padding: '10px 20px',
              margin: '10px',
              fontSize: '16px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Track User Habits
          </button>
        </Link>


      </div>
    </div>
  );
}

export default MainMenu;
