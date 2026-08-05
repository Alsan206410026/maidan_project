import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTimesCircle } from "react-icons/fa";

function AdminManageBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/booking", {
        withCredentials: true,
      });
      setBookings(response.data.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking? This will free up the time slot.")) {
      try {
        const response = await axios.put(
          `http://localhost:5001/api/booking/${id}`,
          { bookingStatus: "Cancelled" },
          { withCredentials: true }
        );

        if (response.data) {
          setBookings(
            bookings.map((b) => (b._id === id ? { ...b, bookingStatus: "Cancelled" } : b))
          );
        }
      } catch (error) {
        console.error("Failed to cancel booking:", error.response?.data || error.message);
        alert(`Failed to cancel booking: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking record?")) {
      try {
        await axios.delete(`http://localhost:5001/api/booking/${id}`, {
          withCredentials: true,
        });
        setBookings(bookings.filter((b) => b._id !== id));
      } catch (error) {
        console.error("Failed to delete booking:", error.response?.data || error.message);
        alert(`Failed to delete booking: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6 text-slate-800">Manage Bookings</h3>
      <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-600 text-sm font-semibold">
              <th className="py-3 px-4">S.N.</th>
              <th className="py-3 px-4">User Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Payment Status</th>
              <th className="py-3 px-4">Payment Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {loading ? (
              <tr>
                <td colSpan="9" className="py-6 text-center text-slate-500">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking, index) => {
                const statusVal = booking.bookingStatus || booking.status || "Booked";
                const isCancelled = statusVal.toLowerCase() === "cancelled";
                const paymentStatusVal = booking.paymentStatus || "Paid";
                const paymentType = booking.paymentMethod || (statusVal.toLowerCase() === "booked" || statusVal.toLowerCase() === "pending" ? "Cash" : "Online");
                const dateVal = booking.bookingDate || booking.date;

                // Extracting populated user name, email, and phone directly from the controller's .populate("user", "name email phone") response
                const userName = booking.user?.name || booking.user?.fullName || "N/A";
                const userEmail = booking.user?.email || "N/A";
                const userPhone = booking.user?.phone || "N/A";

                return (
                  <tr 
                    key={booking._id} 
                    className={`border-b border-slate-100 transition-colors ${
                      isCancelled ? "bg-red-100 hover:bg-red-200" : "hover:bg-slate-50"
                    }`}
                  >
                    <td className={`py-4 px-4 font-semibold ${isCancelled ? "text-red-900" : "text-slate-600"}`}>
                      {index + 1}
                    </td>
                    <td className={`py-4 px-4 font-medium ${isCancelled ? "text-red-900" : "text-slate-800"}`}>
                      {userName}
                    </td>
                    <td className={`py-4 px-4 ${isCancelled ? "text-red-900" : "text-slate-600"}`}>
                      {userEmail}
                    </td>
                    <td className={`py-4 px-4 ${isCancelled ? "text-red-900" : "text-slate-600"}`}>
                      {userPhone}
                    </td>
                    <td className={`py-4 px-4 ${isCancelled ? "text-red-900" : "text-slate-600"}`}>
                      {dateVal ? new Date(dateVal).toLocaleDateString() : "-"} ({booking.slot?.startTime ? `${booking.slot.startTime} - ${booking.slot.endTime}` : (booking.time || "-")})
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                        paymentStatusVal.toLowerCase() === "paid" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {paymentStatusVal}
                      </span>
                    </td>
                    <td className={`py-4 px-4 font-medium ${isCancelled ? "text-red-900" : "text-slate-600"}`}>
                      {paymentType}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                        isCancelled ? "bg-red-600 text-white" : "bg-amber-100 text-amber-700"
                      }`}>
                        {statusVal}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`edit/${booking._id}`)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="Edit Booking"
                        >
                          <FaEdit />
                        </button>
                        {!isCancelled && (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                            title="Cancel Booking & Free Slot"
                          >
                            <FaTimesCircle />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete Booking Record"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="py-8 text-center text-slate-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManageBooking;