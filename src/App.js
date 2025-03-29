import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import UsersList from "./UsersList";
import EditUser from "./EditUser";

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/users" element={<UsersList />} />
    <Route path="/edit-user/:id" element={<EditUser />} />
  </Routes>
);

export default App;
