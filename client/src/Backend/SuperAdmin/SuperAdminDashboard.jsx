import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaUsers, FaFutbol, FaTrophy, FaCalendarCheck } from "react-icons/fa";

function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    venues: 0,
    tournaments: 0,
    bookings: 0,
  });

  const [users, setUsers] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      // Direct GET requests without passing config/headers
      const [userRes, venueRes, tournamentRes, bookingRes] = await Promise.all([
        axios.get("http://localhost:5001/api/user"),
        axios.get("http://localhost:5001/api/venue"),
        axios.get("http://localhost:5001/api/tournament"),
        axios.get("http://localhost:5001/api/booking"),
      ]);

      setStats({
        users: userRes.data.length,
        venues: venueRes.data.length,
        tournaments: tournamentRes.data.length,
        bookings: bookingRes.data.length,
      });

      setUsers(
        [...userRes.data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
      );

      setTournaments(
        [...tournamentRes.data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { title: "Total Users", value: stats.users, icon: <FaUsers />, color: "bg-green-100 text-green-600" },
    { title: "Total Venues", value: stats.venues, icon: <FaFutbol />, color: "bg-green-100 text-green-600" },
    { title: "Tournaments", value: stats.tournaments, icon: <FaTrophy />, color: "bg-green-100 text-green-600" },
    { title: "Bookings Today", value: stats.bookings, icon: <FaCalendarCheck />, color: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
        <p className="mt-2 text-gray-500">Welcome back! Here's an overview of your Sports Booking System.</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((item) => (
          <div key={item.title} className="rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-800">{loading ? "--" : item.value}</h2>
              </div>
              <div className={`rounded-full p-4 text-3xl ${item.color}`}>{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <button className="text-green-600 hover:text-green-700">View All</button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="font-medium">New venue registered</p>
                <p className="text-sm text-gray-500">Kathmandu Futsal Arena</p>
              </div>
              <span className="text-sm text-gray-400">5 min ago</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="font-medium">Tournament created</p>
                <p className="text-sm text-gray-500">Summer Cup 2026</p>
              </div>
              <span className="text-sm text-gray-400">1 hour ago</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="font-medium">New booking received</p>
                <p className="text-sm text-gray-500">Booking confirmed successfully</p>
              </div>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>
          <div className="space-y-4">
            <NavLink to="/super-admin/venues/add" className="block w-full rounded-lg bg-green-600 py-3 text-center font-medium text-white transition hover:bg-green-700">Add New Venue</NavLink>
            <NavLink to="/super-admin/tournaments/add" className="block w-full rounded-lg bg-blue-600 py-3 text-center font-medium text-white transition hover:bg-blue-700">Create Tournament</NavLink>
            <NavLink to="/super-admin/users" className="block w-full rounded-lg bg-yellow-500 py-3 text-center font-medium text-white transition hover:bg-yellow-600">Manage Users</NavLink>
            <NavLink to="/super-admin/chat" className="block w-full rounded-lg bg-red-500 py-3 text-center font-medium text-white transition hover:bg-red-600">Chat</NavLink>
          </div>
        </div>
      </div>

      {/* Latest Users & Latest Tournaments */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Latest Users */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest Users</h2>
            <NavLink to="/super-admin/users" className="text-sm font-medium text-green-600 hover:text-green-700">View All</NavLink>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-800">{user.fullName}</td>
                      <td className="px-4 py-4 text-gray-600">{user.email}</td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">{user.role}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-gray-500">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Tournaments */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest Tournaments</h2>
            <NavLink to="/super-admin/tournaments" className="text-sm font-medium text-green-600 hover:text-green-700">View All</NavLink>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Venue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
                ) : tournaments.length > 0 ? (
                  tournaments.map((tournament) => (
                    <tr key={tournament._id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-800">{tournament.title || tournament.name || "-"}</td>
                      <td className="px-4 py-4 text-gray-600">{tournament.venue?.name || tournament.venue || "-"}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          tournament.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : tournament.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {tournament.status || "Upcoming"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-gray-500">No tournaments found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;