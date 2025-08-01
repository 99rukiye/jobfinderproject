import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AdminFilterPage from "./pages/AdminFilterPage"; 
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/filter" element={<AdminFilterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
