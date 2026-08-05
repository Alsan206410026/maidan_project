import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaArrowLeft } from "react-icons/fa";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchVenueDetailsAndSlots(today);
  }, [id]);

  const fetchVenueDetailsAndSlots = async (date) => {
    try {
      setLoading(true);
      const [venueRes, slotRes] = await Promise.all([
        axios.get(`http://localhost:5001/api/venue/${id}`, { withCredentials: true }),
        axios.get(`http://localhost:5001/api/timeslot?venueId=${id}&date=${date}`, {
          withCredentials: true,
        }),
      ]);

      setVenue(venueRes.data?.data || venueRes.data);
      setSlots(slotRes.data?.data || slotRes.data || []);
      setSelectedSlot(null);
    } catch (err) {
      console.error("Failed to load booking details:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedSlot) {
      alert("Please choose an available time slot!");
      return;
    }

  
    const payload = {
      venue: id,
      slot: selectedSlot._id,
      bookingDate: data.bookingDate || today,
      paymentMethod: data.paymentMethod || "Cash",
    };

    if (payload.paymentMethod === "Cash") {
      try {
        await axios.post("http://localhost:5001/api/booking", payload, {
          withCredentials: true,
        });
        alert("Booking submitted successfully!");
        navigate("/user/my-bookings/pending");
      } catch (err) {
        alert(err.response?.data?.message || "Booking failed");
      }
    } else {
      // For online payment redirect (eSewa), pass venue ID to calculate server-side signature
      navigate("/user/esewa-payment", {
        state: { bookingPayload: payload, venue },
      });
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-gray-500">Loading booking form...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <button
        type="button"
        onClick={() => navigate("/user/book-venue")}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
      >
        <FaArrowLeft /> Back to Venues
      </button>

      {/* Selected Venue Overview Header (Information fetched from Backend for display) */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">{venue?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">{venue?.location}</p>
        <p className="mt-2 text-xl font-bold text-green-600">Rs. {venue?.price} / hour</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {/* Date Selector */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaCalendarAlt className="text-green-600" /> Select Date
          </label>
          <input
            type="date"
            defaultValue={today}
            min={today}
            {...register("bookingDate")}
            onChange={(e) => fetchVenueDetailsAndSlots(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Slot Options */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaClock className="text-green-600" /> Choose Available Slot
          </label>
          {slots.length === 0 ? (
            <p className="text-sm text-red-500">No slots available for this date.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {slots.map((slot) => (
                <button
                  key={slot._id}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-lg border p-3 text-sm font-medium transition ${
                    selectedSlot?._id === slot._id
                      ? "border-green-600 bg-green-100 text-green-800 font-bold"
                      : "border-gray-200 hover:border-green-600"
                  }`}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Payment Radio Options */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaMoneyBillWave className="text-green-600" /> Payment Type
          </label>
          <div className="flex gap-4">
            <label className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-3 font-medium transition [&:has(:checked)]:border-green-600 [&:has(:checked)]:bg-green-50">
              <input
                type="radio"
                value="Cash"
                defaultChecked
                {...register("paymentMethod")}
                className="mr-2"
              />
              Cash (Pay at Venue)
            </label>

            <label className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-3 font-medium transition [&:has(:checked)]:border-green-600 [&:has(:checked)]:bg-green-50">
              <input
                type="radio"
                value="eSewa"
                {...register("paymentMethod")}
                className="mr-2"
              />
              eSewa (Online)
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 py-3 font-bold text-white transition hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;