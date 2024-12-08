import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Clients from './Clients.jsx';
import Client from './Client.jsx';
import AddClient from './AddClient.jsx';
import Habits from './habits.jsx';
import AddHabit from './AddHabit.jsx';
import MainMenu from './MainMenu.jsx';
import UserHabits from "./UserHabits"; // Import UserHabits
import NoPage from './NoPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/client" element={<Client />} />
      <Route path="/addclient" element={<AddClient />} />
      <Route path="/habits" element={<Habits />} />
      <Route path="/add-habit" element={<AddHabit />} />
      <Route path="/user-habits" element={<UserHabits />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
