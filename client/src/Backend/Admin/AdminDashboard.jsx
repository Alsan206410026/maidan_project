import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarCheck,
  FaClock,
  FaMoneyBillWave,
  FaHourglassHalf,
  FaEye,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

function AdminDashboard({ setActiveTab }) {
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
      const response = await axios.get("http://localhost:5001/api/booking", {
        withCredentials: true,
      });
      
      const bookingData = response.data.data || response.data || [];
      setBookings(bookingData);

      const today = new Date().toISOString().split("T")[0];
      const todayBookings = bookingData.filter(
        (booking) => (booking.bookingDate || booking.date)?.substring(0, 10) === today
      );
      
      const pendingBookings = bookingData.filter(
        (booking) => 
          booking.bookingStatus?.toLowerCase() === "pending" || 
          booking.status?.toLowerCase() === "pending"
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
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookingsByDate = (date) => {
    const filtered = bookings.filter(
      (booking) => (booking.bookingDate || booking.date)?.substring(0, 10) === date
    );
    setFilteredBookings(filtered);
  };

  // Stored in a single variable for recent bookings display
  const recentBookingsList = bookings
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.bookingDate) - new Date(a.createdAt || a.bookingDate)
    )
    .slice(0, 3);

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
          Welcome back! This is today's venue overview.
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
                  filteredBookings.map((booking) => {
                    const statusVal = booking.bookingStatus || booking.status || "Booked";
                    return (
                      <tr
                        key={booking._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 font-medium text-gray-800">
                          {booking.user?.name ||
                            booking.user?.fullName ||
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
                            : "1 hr"}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              statusVal === "Completed" || statusVal === "Paid"
                                ? "bg-green-100 text-green-700"
                                : statusVal === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : statusVal === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {statusVal}
                          </span>
                        </td>
                      </tr>
                    );
                  })
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

      {/* ================= RECENT BOOKINGS (Limited to 3 with View All) ================= */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <button
            onClick={() => setActiveTab && setActiveTab("manage-bookings")}
            className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
          >
            <FaEye /> View All Bookings
          </button>
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
              ) : recentBookingsList.length > 0 ? (
                recentBookingsList.map((booking) => {
                  const statusVal = booking.bookingStatus || booking.status || "Booked";
                  const dateVal = booking.bookingDate || booking.date;
                  return (
                    <tr
                      key={booking._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 font-medium text-gray-800">
                        {booking.user?.name ||
                          booking.user?.fullName ||
                          booking.customerName ||
                          "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {booking.user?.phone || booking.phone || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {dateVal
                          ? new Date(dateVal).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {booking.time || booking.startTime || "-"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            statusVal === "Completed" || statusVal === "Paid"
                              ? "bg-green-100 text-green-700"
                              : statusVal === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : statusVal === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {statusVal}
                        </span>
                      </td>
                    </tr>
                  );
                })
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