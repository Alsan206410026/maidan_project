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
      console.error("Failed to fetch bookings:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (venueId, bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await axios.put(
        `http://localhost:5001/api/booking/admin/${venueId}/${bookingId}`,
        { bookingStatus: "Cancelled" },
        { withCredentials: true }
      );

      await fetchBookings();
      alert("Booking cancelled successfully.");
    } catch (error) {
      console.error("Failed to cancel booking:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to cancel booking.");
    }
  };

  const handleDelete = async (venueId, bookingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking record?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/booking/admin/${venueId}/${bookingId}`, {
        withCredentials: true,
      });

      await fetchBookings();
      alert("Booking deleted successfully.");
    } catch (error) {
      console.error("Failed to delete booking:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to delete booking.");
    }
  };

  return (
    <div className="p-6">
      <h3 className="mb-6 text-2xl font-bold text-slate-800">Manage Bookings</h3>

      <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-slate-200 text-sm font-semibold text-slate-600">
              <th className="px-4 py-3">S.N.</th>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Payment Type</th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Txn Status</th>
              <th className="px-4 py-3">Booking Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {loading ? (
              <tr>
                <td colSpan="10" className="py-6 text-center text-slate-500">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking, index) => {
                const bookingStatusVal = booking.bookingStatus || "Pending";
                const bookingStatusLower = bookingStatusVal.toLowerCase();

                const paymentType = booking.paymentMethod || "Cash";
                
                // Secure lookup matching Mongoose Schema population
                const txnId = booking.transaction?._id || booking.transaction || "-";
                const txnStatusVal = booking.transaction?.status || "PENDING";
                const txnStatusLower = txnStatusVal.toLowerCase();

                const dateVal = booking.bookingDate;
                const userName = booking.user?.fullName || booking.user?.name || "N/A";
                const userEmail = booking.user?.email || "N/A";
                const userPhone = booking.user?.phoneNumber || booking.user?.phone || "N/A";
                const venueId = booking.venue?._id || booking.venue;

                return (
                  <tr
                    key={booking._id}
                    className={`border-b border-slate-100 transition-colors ${
                      bookingStatusLower === "cancelled"
                        ? "bg-red-50 hover:bg-red-100"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="px-4 py-4 font-semibold">{index + 1}</td>
                    <td className="px-4 py-4 font-medium">{userName}</td>
                    <td className="px-4 py-4">{userEmail}</td>
                    <td className="px-4 py-4">{userPhone}</td>
                    <td className="px-4 py-4">
                      {dateVal ? new Date(dateVal).toLocaleDateString() : "-"}{" "}
                      (
                      {booking.slot?.startTime
                        ? `${booking.slot.startTime} - ${booking.slot.endTime}`
                        : "-"}
                      )
                    </td>
                    <td className="px-4 py-4 font-medium">{paymentType}</td>
                    <td className="px-4 py-4 font-mono text-xs text-slate-600">
                      {typeof txnId === "string" ? txnId : txnId.toString()}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                          txnStatusLower === "completed" || txnStatusLower === "success"
                            ? "bg-green-600 text-white"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {txnStatusVal}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                          bookingStatusLower === "booked"
                            ? "bg-blue-600 text-white"
                            : bookingStatusLower === "completed"
                            ? "bg-green-700 text-white"
                            : bookingStatusLower === "pending"
                            ? "border border-slate-300 bg-white text-slate-700"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {bookingStatusVal}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/manage/edit/${venueId}/${booking._id}`)}
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100"
                          title="Edit Booking"
                        >
                          <FaEdit />
                        </button>

                        {bookingStatusLower !== "cancelled" && (
                          <button
                            onClick={() => handleCancel(venueId, booking._id)}
                            className="rounded-lg bg-amber-50 p-2 text-amber-600 transition-colors hover:bg-amber-100"
                            title="Cancel Booking"
                          >
                            <FaTimesCircle />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(venueId, booking._id)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
                          title="Delete Booking"
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
                <td colSpan="10" className="py-8 text-center text-slate-500">
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