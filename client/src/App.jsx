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
import ResetPassword from "./ResetPassword";
import Logout from "./Backend/Logout";

// Protected Route
import ProtectedRoute from "./Backend/ProtectedRoute";

// ================= SUPER ADMIN =================
import SuperAdminSidebar from "./Backend/SuperAdmin/SuperAdminSidebar";
import SuperAdminDashboard from "./Backend/SuperAdmin/SuperAdminDashboard";

import SuperAdminUserLayout from "./Backend/SuperAdmin/User/SuperAdminUserLayout";
import SuperAdminManageUser from "./Backend/SuperAdmin/User/SuperAdminManageUser";
import SuperAdminManageAdmins from "./Backend/SuperAdmin/User/SuperAdminManageAdmins";
import SuperAdminManageSuperAdmin from "./Backend/SuperAdmin/User/SuperAdminManageSuperAdmin";
import SuperAdminEditUser from "./Backend/SuperAdmin/User/SuperAdminEditUser";

import SuperAdminManageVenue from "./Backend/SuperAdmin/venues/SuperAdminManageVenue";
import SuperAdminAddVenue from "./Backend/SuperAdmin/venues/SuperAdminAddVenue";
import SuperAdminEditVenue from "./Backend/SuperAdmin/venues/SuperAdminEditVenue";

import SuperAdminManageCategory from "./Backend/SuperAdmin/category/SuperAdminManageCategory";
import SuperAdminAddCategory from "./Backend/SuperAdmin/category/SuperAdminAddCategory";
import SuperAdminEditCategory from "./Backend/SuperAdmin/category/SuperAdminEditCategory";

import SuperAdminManageTournament from "./Backend/SuperAdmin/tournaments/SuperAdminManageTournament";
import SuperAdminAddTournament from "./Backend/SuperAdmin/tournaments/SuperAdminAddTournament";
import SuperAdminEditTournament from "./Backend/SuperAdmin/tournaments/SuperAdminEditTournament";
import SuperAdminDeleteTournament from "./Backend/SuperAdmin/tournaments/SuperAdminDeleteTournament";

import ChatLayout from "./Backend/SuperAdmin/chat/ChatLayout";
import SuperAdminChat from "./Backend/SuperAdmin/chat/SuperAdminChat";

// ================= ADMIN =================
import AdminSidebar from "./Backend/Admin/AdminSidebar";
import AdminDashboard from "./Backend/Admin/AdminDashboard";
import AdminVenue from "./Backend/Admin/Venue/AdminVenue";
import AdminManageVenueBooking from "./Backend/Admin/Manage/AdminManageVenueBooking";
import AdminChatLayout from "./Backend/Admin/Chat/AdminChatLayout";
import AdminChatList from "./Backend/Admin/Chat/AdminChatList";
import AdminChat from "./Backend/Admin/Chat/AdminChat";

// ================= USER =================
import UserSidebar from "./Backend/User/UserSidebar";
import UserDashboard from "./Backend/User/UserDashboard";
import BookVenue from "./Backend/User/BookVenue/BookVenue";
import Booking from "./Backend/User/Booking/Booking";
import UsersChatLayout from "./Backend/User/Chat/UsersChatLayout";
import UsersChat from "./Backend/User/Chat/UsersChat";

function App() {
  return (
    <Routes>

      {/* ================= Frontend ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<RegisterAuthentication />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/venues" element={<Venue />} />
      <Route path="/venues/:id" element={<VenueDetails />} />
      <Route path="/tournaments" element={<Tournament />} />
      <Route path="/tournaments/:id" element={<TournamentDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* ================= Super Admin ================= */}
      <Route element={<ProtectedRoute role="super_admin" />}>
        <Route element={<SuperAdminSidebar />}>

          <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />

          {/* User Management */}
          <Route path="/super-admin/users" element={<SuperAdminUserLayout />}>
            <Route index element={<SuperAdminManageUser />} />
            <Route path="admins" element={<SuperAdminManageAdmins />} />
            <Route path="super-admins" element={<SuperAdminManageSuperAdmin />} />
            <Route path="edit/:id" element={<SuperAdminEditUser />} />
          </Route>

          {/* Venue Management */}
          <Route path="/super-admin/venues" element={<SuperAdminManageVenue />} />
          <Route path="/super-admin/venues/add" element={<SuperAdminAddVenue />} />
          <Route path="/super-admin/venues/edit/:id" element={<SuperAdminEditVenue />} />

          {/* Venue Category Management */}
          <Route path="/super-admin/venue-category" element={<SuperAdminManageCategory />} />
          <Route path="/super-admin/venue-category/add" element={<SuperAdminAddCategory />} />
          <Route path="/super-admin/venue-category/edit/:id" element={<SuperAdminEditCategory />} />

          {/* Tournament Management */}
          <Route path="/super-admin/tournaments" element={<SuperAdminManageTournament />} />
          <Route path="/super-admin/tournaments/add" element={<SuperAdminAddTournament />} />
          <Route path="/super-admin/tournaments/edit/:id" element={<SuperAdminEditTournament />} />
          <Route path="/super-admin/tournaments/delete/:id" element={<SuperAdminDeleteTournament />} />

          {/* Chat */}
          <Route path="/super-admin/chat" element={<ChatLayout />}>
            <Route path=":userId" element={<SuperAdminChat />} />
          </Route>

        </Route>
      </Route>

      {/* ================= Admin ================= */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<AdminSidebar />}>

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/venue" element={<AdminVenue />} />
          <Route path="/admin/manage-bookings" element={<AdminManageVenueBooking />} />

          <Route path="/admin/chat" element={<AdminChatLayout />}>
            <Route index element={<AdminChatList />} />
            <Route path=":userId" element={<AdminChat />} />
          </Route>

        </Route>
      </Route>

      {/* ================= User ================= */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route element={<UserSidebar />}>

          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user/book-venue" element={<BookVenue />} />
          <Route path="/booking/:id" element={<Booking />} />

          <Route path="/user/chat" element={<UsersChatLayout />}>
            <Route path=":ownerId" element={<UsersChat />} />
          </Route>

          <Route path="/users/chat" element={<UsersChatLayout />}>
            <Route path=":ownerId" element={<UsersChat />} />
          </Route>

        </Route>
      </Route>

    </Routes>
  );
}

export default App;