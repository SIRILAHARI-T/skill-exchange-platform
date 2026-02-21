import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { getSkills } from "./api";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Discover from "./Pages/Discover";
import Profile from "./Pages/Profile";
import AddSkill from "./Pages/AddSkill";
import MyRequestsPage from "./Pages/MyRequestsPage";
import Layout from "./Layout";

import FeedPage from "./Pages/FeedPage"; // Updated import
import "./App.css";

function App() {
  /* ---------------- AUTH ---------------- */
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const isLoggedIn = !!user;

  /* ---------------- SKILLS ---------------- */
  const [skills, setSkills] = useState([]);

  const loadSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(Array.isArray(data) ? data : []);
    } catch {
      setSkills([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) loadSkills();
  }, [isLoggedIn]);

  /* ---------------- ROUTES ---------------- */
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!isLoggedIn ? <Login setUser={setUser} /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!isLoggedIn ? <Register setUser={setUser} /> : <Navigate to="/" />}
      />

      {/* Protected routes with layout */}
      <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<FeedPage skills={skills} />} />
        <Route path="discover" element={<Discover skills={skills} />} />
        <Route path="add" element={<AddSkill loadSkills={loadSkills} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-requests" element={<MyRequestsPage />} />
      </Route>
    </Routes>
  );
}

export default App;







