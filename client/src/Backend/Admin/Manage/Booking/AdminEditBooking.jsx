import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditBooking() {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const { venueId, id } = useParams();

  useEffect(() => {
    fetchBookingById();
  }, [id]);

  const fetchBookingById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/booking/${id}`,
        {
          withCredentials: true,
        }
      );

      const booking = response.data.data || response.data;

      reset({
        bookingDate: booking.bookingDate
          ? new Date(booking.bookingDate)
              .toISOString()
              .split("T")[0]
          : "",

        bookingStatus:
          booking.bookingStatus || "Booked",

        paymentStatus:
          booking.paymentStatus || "Pending",
      });
    } catch (error) {
      console.error(
        "Failed to fetch booking:",
        error.response?.data || error.message
      );

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
          paymentStatus: data.paymentStatus,
        },
        {
          withCredentials: true,
        }
      );

      alert("Booking updated successfully.");

      navigate(-1);
    } catch (error) {
      console.error(
        "Failed to update booking:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update booking."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-100">
      <h3 className="mb-6 text-2xl font-bold text-slate-800">
        Edit Booking
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Booking Date */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Booking Date
          </label>

          <input
            type="date"
            {...register("bookingDate", {
              required: true,
            })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Booking Status */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Booking Status
          </label>

          <select
            {...register("bookingStatus")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Booked">Booked</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
                {/* Payment Status */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Payment Status
          </label>

          <select
            {...register("paymentStatus")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {/* Buttons */}
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