import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditBooking() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      bookingDate: "",
      bookingStatus: "Pending",
      transactionStatus: "PENDING",
    },
  });
  
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const { venueId, id } = useParams();

  useEffect(() => {
    fetchBookingById();
  }, [id]);

  const fetchBookingById = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/booking/${id}`, {
        withCredentials: true,
      });

      const booking = response.data.data || response.data;

      const formattedDate = booking.bookingDate
        ? new Date(booking.bookingDate).toLocaleDateString("en-CA")
        : "";

      const resolvedTxnId = booking.transaction?._id || booking.transaction || "-";
      setTransactionId(resolvedTxnId);

      const resolvedTxnStatus = booking.transaction?.status || "PENDING";

      reset({
        bookingDate: formattedDate,
        bookingStatus: booking.bookingStatus || "Pending",
        transactionStatus: resolvedTxnStatus,
      });
    } catch (error) {
      console.error("Failed to fetch booking:", error.response?.data || error.message);
      alert("Failed to load booking details.");
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:5001/api/booking/admin/${venueId}/${id}`,
        {
          bookingDate: data.bookingDate,
          bookingStatus: data.bookingStatus,
          transactionStatus: data.transactionStatus,
        },
        { withCredentials: true }
      );

      alert("Booking updated successfully.");
      navigate("/admin/manage/bookings");
    } catch (error) {
      console.error("Failed to update booking:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update booking.");
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-slate-100 bg-white p-8 shadow-sm">
      <h3 className="mb-6 text-2xl font-bold text-slate-800">Edit Booking</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Booking Date</label>
          <input
            type="date"
            {...register("bookingDate", { required: true })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Transaction ID</label>
          <input
            type="text"
            value={transactionId}
            readOnly
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm text-slate-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Transaction Status</label>
          <select
            {...register("transactionStatus")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="FAILED">FAILED</option>
            <option value="REFUNDED">REFUNDED</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Booking Status</label>
          <select
            {...register("bookingStatus")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Booked">Booked</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg bg-slate-200 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Update Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminEditBooking;