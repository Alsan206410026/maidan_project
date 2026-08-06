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
      const response = await axios.get(
        "http://localhost:5001/api/booking",
        {
          withCredentials: true,
        }
      );

      setBookings(response.data.data || response.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch bookings:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (venueId, bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking? This will free up the time slot."
    );

    if (!confirmCancel) return;

    try {
      await axios.put(
        `http://localhost:5001/api/booking/admin/${venueId}/${bookingId}`,
        {
          bookingStatus: "Cancelled",
        },
        {
          withCredentials: true,
        }
      );

      await fetchBookings();

      alert("Booking cancelled successfully.");
    } catch (error) {
      console.error(
        "Failed to cancel booking:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to cancel booking."
      );
    }
  };

  const handleDelete = async (venueId, bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking record?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/booking/admin/${venueId}/${bookingId}`,
        {
          withCredentials: true,
        }
      );

      await fetchBookings();

      alert("Booking deleted successfully.");
    } catch (error) {
      console.error(
        "Failed to delete booking:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete booking."
      );
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6 text-slate-800">
        Manage Bookings
      </h3>

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
                <td
                  colSpan="9"
                  className="py-6 text-center text-slate-500"
                >
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking, index) => {
                const statusVal =
                  booking.bookingStatus ||
                  booking.status ||
                  "Booked";

                const status =
                  statusVal.toLowerCase();

                const paymentStatusVal =
                  booking.paymentStatus || "Pending";

                const paymentStatus =
                  paymentStatusVal.toLowerCase();

                const paymentType =
                  booking.paymentMethod || "Cash";

                const dateVal =
                  booking.bookingDate ||
                  booking.date;

                const userName =
                  booking.user?.name ||
                  booking.user?.fullName ||
                  "N/A";

                const userEmail =
                  booking.user?.email ||
                  "N/A";

                // ✅ Fixed phone number
                const userPhone =
                  booking.user?.phone ||
                  booking.user?.phoneNumber ||
                  "N/A";

                const venueId =
                  booking.venue?._id ||
                  booking.venue;

                return (
                  <tr
                    key={booking._id}
                    className={`border-b border-slate-100 transition-colors ${
                      status === "cancelled"
                        ? "bg-red-100 hover:bg-red-200"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="py-4 px-4 font-semibold">
                      {index + 1}
                    </td>

                    <td className="py-4 px-4 font-medium">
                      {userName}
                    </td>

                    <td className="py-4 px-4">
                      {userEmail}
                    </td>

                    <td className="py-4 px-4">
                      {userPhone}
                    </td>

                    <td className="py-4 px-4">
                      {dateVal
                        ? new Date(
                            dateVal
                          ).toLocaleDateString()
                        : "-"}{" "}
                      (
                      {booking.slot?.startTime
                        ? `${booking.slot.startTime} - ${booking.slot.endTime}`
                        : booking.time || "-"}
                      )
                    </td>
                                        <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                          paymentStatus === "paid"
                            ? "bg-green-600 text-white"
                            : paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : paymentStatus === "failed"
                            ? "bg-red-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {paymentStatusVal}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-medium">
                      {paymentType}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                          status === "paid"
                            ? "bg-green-600 text-white"
                            : status === "booked"
                            ? "bg-yellow-400 text-black"
                            : status === "pending"
                            ? "bg-white border border-slate-300 text-slate-700"
                            : status === "cancelled"
                            ? "bg-red-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {statusVal}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/manage/edit/${venueId}/${booking._id}`
                            )
                          }
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="Edit Booking"
                        >
                          <FaEdit />
                        </button>

                        {status !== "cancelled" && (
                          <button
                            onClick={() =>
                              handleCancel(
                                venueId,
                                booking._id
                              )
                            }
                            className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                            title="Cancel Booking"
                          >
                            <FaTimesCircle />
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleDelete(
                              venueId,
                              booking._id
                            )
                          }
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
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
                <td
                  colSpan="9"
                  className="py-8 text-center text-slate-500"
                >
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