import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  FaFutbol,
  FaTrophy,
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";

function UserDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    venues: 0,
    tournaments: 0,
    bookings: 0,
  });

  const [tournaments, setTournaments] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Included for cookie-based auth support
      };

      // Fetch Venues, Tournaments, and User Bookings in parallel
      const [venueRes, tournamentRes, bookingRes] = await Promise.all([
        axios.get("http://localhost:5001/api/venue", config).catch(() => ({ data: [] })),
        axios.get("http://localhost:5001/api/tournament", config).catch(() => ({ data: [] })),
        axios.get("http://localhost:5001/api/booking", config).catch(() => ({ data: [] })),
      ]);

      // Normalize response shapes (handles both direct arrays and { data: [...] } formats)
      const venuesList = Array.isArray(venueRes.data)
        ? venueRes.data
        : venueRes.data?.data || [];
      const tournamentsList = Array.isArray(tournamentRes.data)
        ? tournamentRes.data
        : tournamentRes.data?.data || [];
      const bookingsList = Array.isArray(bookingRes.data)
        ? bookingRes.data
        : bookingRes.data?.data || [];

      // Update Statistics Counters
      setStats({
        venues: venuesList.length,
        tournaments: tournamentsList.length,
        bookings: bookingsList.length,
      });

      // Populate Latest Tournaments (Max 5, sorted by latest)
      setTournaments(
        [...tournamentsList]
          .sort((a, b) => new Date(b.createdAt || b.startDate) - new Date(a.createdAt || a.startDate))
          .slice(0, 5)
      );

      // Populate Recent Bookings for the Activity Feed (Max 3, sorted by latest)
      setRecentBookings(
        [...bookingsList]
          .sort((a, b) => new Date(b.createdAt || b.bookingDate) - new Date(a.createdAt || a.bookingDate))
          .slice(0, 3)
      );
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      title: "Available Venues",
      value: stats.venues,
      icon: <FaFutbol />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Available Tournaments",
      value: stats.tournaments,
      icon: <FaTrophy />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "My Bookings",
      value: stats.bookings,
      icon: <FaCalendarCheck />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          User Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back! Book your favourite sports venues, join tournaments,
          and manage your bookings.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statsData.map((item) => (
          <div
            key={item.title}
            className="rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  {loading ? "--" : item.value}
                </h2>
              </div>

              <div className={`rounded-full p-4 text-3xl ${item.color}`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity (Dynamic Real Data) */}
        <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Activity</h2>

            <NavLink
              to="/user/my-bookings"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              View All
            </NavLink>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="py-4 text-center text-gray-500">Loading activity...</p>
            ) : recentBookings.length > 0 ? (
              recentBookings.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <FaClock />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {b.venue?.name ? `Booking at ${b.venue.name}` : "Venue Booking"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date: {b.bookingDate} {b.slot ? `(${b.slot.startTime} - ${b.slot.endTime})` : ""}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      b.bookingStatus === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : b.bookingStatus === "Booked" || b.bookingStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.bookingStatus || "Pending"}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-gray-500">No recent activity found.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col justify-center rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-5 text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="space-y-4">
            <NavLink
              to="/user/book-venue"
              className="block rounded-lg bg-green-600 py-3 text-center font-medium text-white transition hover:bg-green-700"
            >
              Book Venue
            </NavLink>

            <NavLink
              to="/user/my-bookings"
              className="block rounded-lg bg-green-600 py-3 text-center font-medium text-white transition hover:bg-green-700"
            >
              My Bookings
            </NavLink>

            <NavLink
              to="/user/chat"
              className="block rounded-lg bg-purple-600 py-3 text-center font-medium text-white transition hover:bg-purple-700"
            >
              Chat
            </NavLink>
          </div>
        </div>
      </div>

      {/* Latest Tournaments (Dynamic Real Data) */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Latest Tournaments
          </h2>

          <NavLink
            to="/tournaments"
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            View All
          </NavLink>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Tournament
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Venue
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Loading tournaments...
                  </td>
                </tr>
              ) : tournaments.length > 0 ? (
                tournaments.map((tournament) => (
                  <tr
                    key={tournament._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 font-medium text-gray-800">
                      {tournament.title || tournament.name || "-"}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {tournament.venue?.name ||
                        (typeof tournament.venue === "string" ? tournament.venue : "-")}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          tournament.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : tournament.status === "Completed"
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
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No tournaments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;