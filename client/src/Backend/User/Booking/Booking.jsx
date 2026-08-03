import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchVenue = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5001/api/venue/${id}`);
        setVenue(res.data);
      } catch (err) {
        console.error(err);
        setVenue(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`http://localhost:5001/api/timeslot/search?venue=${id}`);
        setTimeSlots(res.data || []);
      } catch (err) {
        console.error(err);
        setTimeSlots([]);
      }
    };

    fetchTimeSlots();
  }, [id]);

  const getDayName = (value) => {
    if (!value) return "";
    const dateObj = new Date(value);
    return dateObj.toLocaleDateString("en-US", { weekday: "long" });
  };

  const availableTimeSlots = date
    ? timeSlots.filter((slot) => slot.day === getDayName(date) && slot.status === "Active")
    : timeSlots.filter((slot) => slot.status === "Active");

  const selectedSlot = availableTimeSlots.find((slot) => slot._id === time);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Loading venue...</h1>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">
          No Venue Selected
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 rounded-lg bg-green-600 px-6 py-3 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  const confirmBooking = () => {
    if (!date || !time) {
      alert("Please select date and time.");
      return;
    }

    alert(
      `Booking Confirmed!\n\nVenue: ${venue.name}\nDate: ${date}\nTime: ${selectedSlot ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` : time}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="mx-auto max-w-4xl rounded-xl bg-white shadow-lg overflow-hidden">

        <img
          src={venue.images || venue.image}
          alt={venue.name}
          className="h-72 w-full object-cover"
        />

        <div className="p-8">

          <h1 className="text-3xl font-bold text-gray-800">
            {venue.name}
          </h1>

          <div className="mt-3 flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-2 text-green-600" />
            {venue.location}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">

            <span className="rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
              {venue.category?.name || venue.category}
            </span>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-semibold">
              Rs. {venue.price}/hr
            </span>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 flex items-center font-semibold text-gray-700">
                <FaCalendarAlt className="mr-2 text-green-600" />
                Select Date
              </label>

              <input
                type="date"
                className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setTime("");
                }}
              />

            </div>

            <div>

              <label className="mb-2 flex items-center font-semibold text-gray-700">
                <FaClock className="mr-2 text-green-600" />
                Select Time
              </label>

              <select
                className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={!date}
              >
                <option value="">
                  {date
                    ? availableTimeSlots.length > 0
                      ? "Select admin time"
                      : "No admin time slots available"
                    : "Select a date first"}
                </option>
                {availableTimeSlots.map((slot) => (
                  <option key={slot._id} value={slot._id}>
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </select>

            </div>

          </div>

          <div className="mt-10 rounded-lg bg-gray-50 p-5">

            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Booking Summary
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Venue</span>
                <span className="font-semibold">{venue.name}</span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span>{date || "--"}</span>
              </div>

              <div className="flex justify-between">
                <span>Time</span>
                <span>{selectedSlot ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` : time || "--"}</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center">
                  <FaMoneyBillWave className="mr-2 text-green-600" />
                  Price
                </span>

                <span className="font-bold text-green-600">
                  Rs. {venue.price}
                </span>
              </div>

            </div>

          </div>

          <button
            onClick={confirmBooking}
            className="mt-8 w-full rounded-lg bg-green-600 py-4 text-lg font-bold text-white hover:bg-green-700"
          >
            Confirm Booking
          </button>

        </div>

      </div>

    </div>
  );
}

export default Booking;