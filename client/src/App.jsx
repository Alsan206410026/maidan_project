import { Routes, Route } from "react-router-dom";

// Frontend
import Home from "./Frontend/Home";
import Venue from "./Frontend/Venue";
import VenueDetails from "./Frontend/VenueDetails";
import Tournament from "./Frontend/Tournament";
import TournamentDetail from "./Frontend/TournamentDetail";
import About from "./Frontend/About";
import Contact from "./Frontend/Contact";

// Auth
import Register from "./Register";
import Login from "./Login";

// Dashboards
import UserDashboard from "./Backend/User/UserDashboard";
import AdminDashboard from "./Backend/Admin/AdminDashboard";

// Super Admin
import SuperAdminDashboard from "./Backend/SuperAdmin/SuperAdminDashboard";
import SuperAdminSidebar from "./Backend/SuperAdmin/SuperAdminSidebar";

// User
import SuperAdminManageUser from "./Backend/SuperAdmin/User/SuperAdminManageUser";
import SuperAdminEditUser from "./Backend/SuperAdmin/User/SuperAdminEditUser";
import SuperAdminDeleteUser from "./Backend/SuperAdmin/User/SuperAdminDeleteUser";

// Venue
import SuperAdminManageVenue from "./Backend/SuperAdmin/venues/SuperAdminManageVenue";
import SuperAdminAddVenue from "./Backend/SuperAdmin/venues/SuperAdminAddVenue";
import SuperAdminEditVenue from "./Backend/SuperAdmin/venues/SuperAdminEditVenue";
import SuperAdminDeleteVenue from "./Backend/SuperAdmin/venues/SuperAdminDeleteVenue";

// Tournament
import SuperAdminManageTournament from "./Backend/SuperAdmin/tournaments/SuperAdminManageTournament";
import SuperAdminAddTournament from "./Backend/SuperAdmin/tournaments/SuperAdminAddTournament";
import SuperAdminEditTournament from "./Backend/SuperAdmin/tournaments/SuperAdminEditTournament";
import SuperAdminDeleteTournament from "./Backend/SuperAdmin/tournaments/SuperAdminDeleteTournament";

// Chat
import ChatList from "./Backend/SuperAdmin/chat/ChatList";
import SuperAdminChat from "./Backend/SuperAdmin/chat/SuperAdminChat";


function App() {
    return (
        <Routes>

            {/* Frontend */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/venues" element={<Venue />} />
            <Route path="/venues/:id" element={<VenueDetails />} />

            <Route path="/tournaments" element={<Tournament />} />
            <Route path="/tournaments/:id" element={<TournamentDetail />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />


            {/* Dashboard */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />


            {/* Super Admin */}
            <Route element={<SuperAdminSidebar />}>

                <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />


                {/* User */}
                <Route path="/super-admin/users" element={<SuperAdminManageUser />} />
                <Route path="/super-admin/users/edit/:id" element={<SuperAdminEditUser />} />
                <Route path="/super-admin/users/delete/:id" element={<SuperAdminDeleteUser />} />


                {/* Venue */}
                <Route path="/super-admin/venues" element={<SuperAdminManageVenue />} />
                <Route path="/super-admin/venues/add" element={<SuperAdminAddVenue />} />
                <Route path="/super-admin/venues/edit/:id" element={<SuperAdminEditVenue />} />
                <Route path="/super-admin/venues/delete/:id" element={<SuperAdminDeleteVenue />} />


                {/* Tournament */}
                <Route path="/super-admin/tournaments" element={<SuperAdminManageTournament />} />
                <Route path="/super-admin/tournaments/add" element={<SuperAdminAddTournament />} />
                <Route path="/super-admin/tournaments/edit/:id" element={<SuperAdminEditTournament />} />
                <Route path="/super-admin/tournaments/delete/:id" element={<SuperAdminDeleteTournament />} />


                {/* Chat */}
                <Route path="/super-admin/chat" element={<ChatList />} />
                <Route path="/super-admin/chat/:userId" element={<SuperAdminChat />} />

            </Route>

        </Routes>
    );
}

export default App;