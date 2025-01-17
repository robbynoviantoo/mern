// frontend/src/routes/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import UserList from "../components/User/UserList";
import EditUser from "../components/User/EditUser";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
    <Route
      path="/users/edit/:id"
      element={<ProtectedRoute>{<EditUser />}</ProtectedRoute>}
    />
    </Routes>
  </Router>
);

export default AppRoutes;
