import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarCheck,
  FaClock,
  FaMoneyBillWave,
  FaHourglassHalf,
} from "react-icons/fa";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayBookings: 0,
    revenue: 0,
    pendingBookings: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    filterBookingsByDate(selectedDate);
  }, [selectedDate, bookings]);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/booking");
      const bookingData = response.data;
      setBookings(bookingData);

      const today = new Date().toISOString().split("T")[0];
      const todayBookings = bookingData.filter(
        (booking) => booking.date && booking.date.substring(0, 10) === today
      );
      const pendingBookings = bookingData.filter(
        (booking) => booking.status?.toLowerCase() === "pending"
      );
      const revenue = bookingData.reduce(
        (sum, booking) =>
          sum +
          Number(
            booking.totalAmount || booking.amount || booking.price || 0
          ),
        0
      );

      setStats({
        totalBookings: bookingData.length,
        todayBookings: todayBookings.length,
        revenue,
        pendingBookings: pendingBookings.length,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookingsByDate = (date) => {
    const filtered = bookings.filter(
      (booking) => booking.date && booking.date.substring(0, 10) === date
    );
    setFilteredBookings(filtered);
  };

  const statsData = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <FaCalendarCheck />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Today's Bookings",
      value: stats.todayBookings,
      icon: <FaClock />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Revenue",
      value: `Rs. ${stats.revenue}`,
      icon: <FaMoneyBillWave />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Pending",
      value: stats.pendingBookings,
      icon: <FaHourglassHalf />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Welcome back! Here's today's venue overview.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((card) => (
          <div
            key={card.title}
            className="rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  {loading ? "--" : card.value}
                </h2>
              </div>
              <div
                className={`rounded-full p-4 text-3xl ${card.color}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Calendar & Booking Details ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-5 text-xl font-semibold">Booking Calendar</h2>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-600"
          />

          <div className="mt-6 rounded-lg bg-green-50 p-4">
            <h3 className="font-semibold text-green-700">Booking Summary</h3>
            <p className="mt-3 text-sm text-gray-500">Selected Date</p>
            <p className="text-lg font-bold text-gray-800">{selectedDate}</p>
            <p className="mt-4 text-sm text-gray-500">Total Bookings</p>
            <p className="text-2xl font-bold text-green-700">
              {filteredBookings.length}
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Bookings on Selected Date
            </h2>
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {selectedDate}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Duration
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
                      colSpan="5"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      Loading bookings...
                    </td>
                  </tr>
                ) : filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 font-medium text-gray-800">
                        {booking.user?.fullName ||
                          booking.customerName ||
                          "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {booking.user?.phone || booking.phone || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {booking.time || booking.startTime || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {booking.duration
                          ? `${booking.duration} hr`
                          : booking.hours
                          ? `${booking.hours} hr`
                          : "-"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : booking.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No bookings found for this date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= RECENT BOOKINGS ================= */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Latest {bookings.slice(0, 5).length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Time
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
                    colSpan="5"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Loading recent bookings...
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt) - new Date(a.createdAt)
                  )
                  .slice(0, 5)
                  .map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 font-medium text-gray-800">
                        {booking.user?.fullName ||
                          booking.customerName ||
                          "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {booking.user?.phone || booking.phone || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {booking.date
                          ? new Date(booking.date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {booking.time || booking.startTime || "-"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : booking.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No recent bookings available.
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

export default AdminDashboard;