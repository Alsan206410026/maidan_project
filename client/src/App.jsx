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
import RegisterAuthentication from "./RegisterAuthentication";
import ForgotPassword from "./ForgotPassword";

// Admin
import AdminSidebar from "./Backend/Admin/AdminSidebar";
import AdminDashboard from "./Backend/Admin/AdminDashboard";
import AdminVenue from "./Backend/Admin/Venue/AdminVenue";
import AdminManageVenueBooking from "./Backend/Admin/Manage/AdminManageVenueBooking";

import AdminChat from "./Backend/Admin/Chat/AdminChat";
import AdminChatList from "./Backend/Admin/Chat/AdminChatList";
import AdminChatLayout from "./Backend/Admin/Chat/AdminChatLayout";
import AdminChatWindow from "./Backend/Admin/Chat/AdminChatWindow";


// User
import UserSidebar from "./Backend/User/UserSidebar";
import UserDashboard from "./Backend/User/UserDashboard";
import BookVenue from "./Backend/User/BookVenue/BookVenue";

// Super Admin
import SuperAdminSidebar from "./Backend/SuperAdmin/SuperAdminSidebar";
import SuperAdminDashboard from "./Backend/SuperAdmin/SuperAdminDashboard";

// User Management
import SuperAdminManageUser from "./Backend/SuperAdmin/User/SuperAdminManageUser";
import SuperAdminEditUser from "./Backend/SuperAdmin/User/SuperAdminEditUser";
import SuperAdminDeleteUser from "./Backend/SuperAdmin/User/SuperAdminDeleteUser";

// Venue Management
import SuperAdminManageVenue from "./Backend/SuperAdmin/venues/SuperAdminManageVenue";
import SuperAdminAddVenue from "./Backend/SuperAdmin/venues/SuperAdminAddVenue";
import SuperAdminEditVenue from "./Backend/SuperAdmin/venues/SuperAdminEditVenue";
import SuperAdminDeleteVenue from "./Backend/SuperAdmin/venues/SuperAdminDeleteVenue";

// Tournament Management
import SuperAdminManageTournament from "./Backend/SuperAdmin/tournaments/SuperAdminManageTournament";
import SuperAdminAddTournament from "./Backend/SuperAdmin/tournaments/SuperAdminAddTournament";
import SuperAdminEditTournament from "./Backend/SuperAdmin/tournaments/SuperAdminEditTournament";
import SuperAdminDeleteTournament from "./Backend/SuperAdmin/tournaments/SuperAdminDeleteTournament";

// Chat
import ChatLayout from "./Backend/SuperAdmin/chat/ChatLayout";
import SuperAdminChat from "./Backend/SuperAdmin/chat/SuperAdminChat";


function App() {
  return (
    <Routes>

      {/* Frontend */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<RegisterAuthentication />} />
      <Route path="/venues" element={<Venue />} />
      <Route path="/venues/:id" element={<VenueDetails />} />
      <Route path="/tournaments" element={<Tournament />} />
      <Route path="/tournaments/:id" element={<TournamentDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Super Admin */}
      <Route element={<SuperAdminSidebar />}>
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />

        <Route path="/super-admin/users" element={<SuperAdminManageUser />} />
        <Route path="/super-admin/users/edit/:id" element={<SuperAdminEditUser />} />
        <Route path="/super-admin/users/delete/:id" element={<SuperAdminDeleteUser />} />

        <Route path="/super-admin/venues" element={<SuperAdminManageVenue />} />
        <Route path="/super-admin/venues/add" element={<SuperAdminAddVenue />} />
        <Route path="/super-admin/venues/edit/:id" element={<SuperAdminEditVenue />} />
        <Route path="/super-admin/venues/delete/:id" element={<SuperAdminDeleteVenue />} />

        <Route path="/super-admin/tournaments" element={<SuperAdminManageTournament />} />
        <Route path="/super-admin/tournaments/add" element={<SuperAdminAddTournament />} />
        <Route path="/super-admin/tournaments/edit/:id" element={<SuperAdminEditTournament />} />
        <Route path="/super-admin/tournaments/delete/:id" element={<SuperAdminDeleteTournament />} />

        <Route path="/super-admin/chat" element={<ChatLayout />}>
          <Route path=":userId" element={<SuperAdminChat />} />
        </Route>
      </Route>

      {/* User */}
      <Route element={<UserSidebar />}>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user/book-venue" element={<BookVenue />} />
      </Route>

      {/* Admin */}
    <Route element={<AdminSidebar />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/venue" element={<AdminVenue />} />
        <Route path="/admin/manage-bookings" element={<AdminManageVenueBooking />} />

        <Route path="/admin/chat" element={<AdminChatLayout />}>
          <Route index element={<AdminChatList />} />
          <Route path=":userId" element={<AdminChat />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;