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
import SuperAdminSidebar from "./Backend/SuperAdminSidebar";
import SuperAdminManageUser from "./Backend/SuperAdminManageUser";
import SuperAdminManageVenue from "./Backend/SuperAdminManageVenue";
import SuperAdminManageTournament from "./Backend/SuperAdminManageTournament";
import SuperAdminChat from "./Backend/SuperAdminChat";

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
      <Route element={<SuperAdminSidebar />}>
      
        <Route
          path="/super-admin-dashboard"
          element={<SuperAdminDashboard />} />
        

        <Route
          path="/super-admin/users"
          element={<SuperAdminManageUser />} />
        

        <Route
          path="/super-admin/venues"
          element={<SuperAdminManageVenue />} />
        
          <Route
          path="/super-admin/tournaments"
          element={<SuperAdminManageTournament />} />

            
          <Route
          path="/super-admin/chat"
          element={<SuperAdminChat />} />
        
        

      </Route>
    </Routes>
  );
}

export default App;