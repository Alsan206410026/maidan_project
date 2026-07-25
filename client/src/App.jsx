import { Routes, Route } from "react-router-dom";
import Home from "./Frontend/Home";
import Venue from "./Frontend/Venue";
import Register from "./Register";
import Login from "./Login";
import Tournament from "./Frontend/Tournament";
import TournamentDetail from "./Frontend/TournamentDetail";
import About from "./Frontend/About";
import Contact from "./Frontend/Contact";
import VenueDetails from "./Frontend/VenueDetails";
import UserDashboard from "./Backend/UserDashboard";
import AdminDashboard from "./Backend/AdminDashboard";
import SuperAdminDashboard from "./Backend/SuperAdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/venues" element={<Venue />} />
      <Route path="/venues/:id" element={<VenueDetails />} />
      <Route path="/tournaments" element={<Tournament />} />
      <Route path="/tournaments/:id" element={<TournamentDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
    </Routes>
  );
}

export default App;