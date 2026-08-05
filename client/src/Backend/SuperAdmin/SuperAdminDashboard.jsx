import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaUsers, FaFutbol, FaTrophy } from "react-icons/fa";

function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    venues: 0,
    tournaments: 0,
  });

  const [users, setUsers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Helper function to render human-readable relative time
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return `${days} d ago`;
  };

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [userRes, venueRes, tournamentRes] = await Promise.all([
        axios.get("http://localhost:5001/api/auth/users", { withCredentials: true }),
        axios.get("http://localhost:5001/api/venue", { withCredentials: true }),
        axios.get("http://localhost:5001/api/tournament", { withCredentials: true }),
      ]);

      const usersData = Array.isArray(userRes.data) ? userRes.data : [];
      const venuesData = Array.isArray(venueRes.data) ? venueRes.data : [];
      const tournamentsData = Array.isArray(tournamentRes.data) ? tournamentRes.data : [];

      setStats({
        users: usersData.length,
        venues: venuesData.length,
        tournaments: tournamentsData.length,
      });

      // Sort & slice top 3 recent users
      setUsers(
        [...usersData]
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
          .slice(0, 3)
      );

      // Sort & slice top 3 recent tournaments
      setTournaments(
        [...tournamentsData]
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
          .slice(0, 3)
      );

      // Aggregate dynamic Recent Activities from real database models
      const activities = [];

      venuesData.slice(0, 3).forEach((venue) => {
        activities.push({
          id: `venue-${venue._id}`,
          title: "New venue registered",
          subtitle: venue.name || "Unnamed Venue",
          createdAt: venue.createdAt,
        });
      });

      tournamentsData.slice(0, 3).forEach((tournament) => {
        activities.push({
          id: `tournament-${tournament._id}`,
          title: "Tournament created",
          subtitle: tournament.name || tournament.title || "New Tournament",
          createdAt: tournament.createdAt,
        });
      });

      // Sort combined activities by latest creation date
      const sortedActivities = activities
        .filter((act) => act.createdAt)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setRecentActivities(sortedActivities);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { title: "Total Users", value: stats.users, icon: <FaUsers />, color: "bg-green-100 text-green-600" },
    { title: "Total Venues", value: stats.venues, icon: <FaFutbol />, color: "bg-green-100 text-green-600" },
    { title: "Tournaments", value: stats.tournaments, icon: <FaTrophy />, color: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Super Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's an overview of your Sports Booking System.</p>
      </div>

      {/* Statistics Grid (3 Cards) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statsData.map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-800">{loading ? "--" : item.value}</h2>
              </div>
              <div className={`rounded-full p-4 text-3xl ${item.color}`}>{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="py-6 text-center text-sm text-gray-500">Loading activities...</p>
            ) : recentActivities.length > 0 ? (
              recentActivities.map((act) => (
                <div key={act.id} className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100">
                  <div>
                    <p className="font-semibold text-gray-800">{act.title}</p>
                    <p className="text-sm text-gray-500">{act.subtitle}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-400">{formatTimeAgo(act.createdAt)}</span>
                </div>
              ))
            ) : (
              <p className="py-6 text-center text-sm text-gray-500">No recent activity found.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">Quick Actions</h2>
          <div className="space-y-4">
            <NavLink to="/super-admin/venues/add" className="block w-full rounded-xl bg-green-600 py-3 text-center font-semibold text-white transition hover:bg-green-700">
              Add New Venue
            </NavLink>
            <NavLink to="/super-admin/tournaments/add" className="block w-full rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700">
              Create Tournament
            </NavLink>
            <NavLink to="/super-admin/users" className="block w-full rounded-xl bg-yellow-500 py-3 text-center font-semibold text-white transition hover:bg-yellow-600">
              Manage Users
            </NavLink>
            <NavLink to="/super-admin/chat" className="block w-full rounded-xl bg-red-500 py-3 text-center font-semibold text-white transition hover:bg-red-600">
              Chat
            </NavLink>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Latest Users & Latest Tournaments */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Latest Users */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Latest Users</h2>
            <NavLink to="/super-admin/users" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View All
            </NavLink>
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
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-sm text-gray-500">Loading users...</td></tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-800">{user.fullName || user.name || "-"}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{user.email || "-"}</td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                          {user.role || "User"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-sm text-gray-500">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Tournaments */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Latest Tournaments</h2>
            <NavLink to="/super-admin/tournaments" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View All
            </NavLink>
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
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-sm text-gray-500">Loading tournaments...</td></tr>
                ) : tournaments.length > 0 ? (
                  tournaments.map((tournament) => (
                    <tr key={tournament._id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-800">{tournament.name || tournament.title || "-"}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {typeof tournament.venue === "object" ? tournament.venue?.name : tournament.venue || "-"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            tournament.status === "cancelled" || tournament.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : tournament.status === "completed" || tournament.status === "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {tournament.status || "Upcoming"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-sm text-gray-500">No tournaments found.</td></tr>
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