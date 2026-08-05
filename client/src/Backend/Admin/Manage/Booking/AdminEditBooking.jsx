import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditBooking() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBookingById();
  }, [id]);

  const fetchBookingById = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/booking/${id}`, {
        withCredentials: true,
      });
      const b = response.data.data || response.data;
      
      reset({
        customerName: b.user?.name || b.customerName || "",
        phone: b.user?.phone || b.phone || "",
        bookingDate: b.bookingDate ? b.bookingDate.substring(0, 10) : "",
        time: b.time || b.startTime || "",
        status: b.bookingStatus || b.status || "Booked",
      });
    } catch (error) {
      console.error("Failed to fetch booking details from database:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5001/api/booking/${id}`, data, {
        withCredentials: true,
      });
      alert("Booking updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to update booking:", error);
      alert("Failed to update booking.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-100">
      <h3 className="mb-5 text-xl font-bold text-slate-800">Edit Booking</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Customer Name */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-slate-600">Customer Name</label>
          <input 
            type="text" 
            {...register("customerName")} 
            className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-slate-600">Phone Number</label>
          <input 
            type="text" 
            {...register("phone")} 
            className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        {/* Booking Date */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-slate-600">Booking Date</label>
          <input 
            type="date" 
            {...register("bookingDate")} 
            className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        {/* Time */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-slate-600">Time</label>
          <input 
            type="text" 
            {...register("time")} 
            className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-slate-600">Status</label>
          <select 
            {...register("status")} 
            className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Booked">Booked</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 border-none rounded-md cursor-pointer font-medium transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-md cursor-pointer font-medium transition"
          >
            Update Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminEditBooking;