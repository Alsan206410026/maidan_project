import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      bookingDate: today,
      paymentMethod: "Cash",
    },
  });

  useEffect(() => {
    fetchVenueDetailsAndSlots(selectedDate);
  }, [id, selectedDate]);

  const isFutureSlot = (startTime, dateStr) => {
    if (dateStr > today) return true;
    if (dateStr < today) return false;

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const match = startTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);

    if (!match) return true;

    let [, hours, minutes, modifier] = match;

    let slotHours = parseInt(hours, 10);
    const slotMinutes = parseInt(minutes, 10);

    if (modifier) {
      modifier = modifier.toUpperCase();

      if (modifier === "PM" && slotHours < 12) {
        slotHours += 12;
      }

      if (modifier === "AM" && slotHours === 12) {
        slotHours = 0;
      }
    }

    if (slotHours > currentHours) return true;

    if (
      slotHours === currentHours &&
      slotMinutes > currentMinutes
    ) {
      return true;
    }

    return false;
  };

  const fetchVenueDetailsAndSlots = async (date) => {
    try {
      setLoading(true);

      const [venueRes, slotRes] = await Promise.all([
        axios.get(
          `http://localhost:5001/api/venue/${id}`,
          {
            withCredentials: true,
          }
        ),

        axios.get(
          `http://localhost:5001/api/timeslot?venueId=${id}&date=${date}`,
          {
            withCredentials: true,
          }
        ),
      ]);

      setVenue(venueRes.data?.data || venueRes.data);

      const rawSlots =
        slotRes.data?.data || slotRes.data || [];

      const filteredSlots = rawSlots.filter((slot) =>
        isFutureSlot(slot.startTime, date)
      );

      setSlots(filteredSlots);
      setSelectedSlot(null);
    } catch (err) {
      console.error(
        "Failed to load booking details:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;

    setSelectedDate(newDate);

    setValue("bookingDate", newDate);

    fetchVenueDetailsAndSlots(newDate);
  };

  const onSubmit = async (data) => {
    if (!selectedSlot) {
      alert("Please choose an available time slot!");
      return;
    }

    try {
      // ===========================
      // STEP 1: Create Booking
      // ===========================

      const bookingPayload = {
        venueId: id,
        slotId: selectedSlot._id,
        bookingDate: selectedDate,
        paymentMethod: data.paymentMethod,
      };

      const bookingResponse = await axios.post(
        "http://localhost:5001/api/booking",
        bookingPayload,
        {
          withCredentials: true,
        }
      );

      const booking = bookingResponse.data.data;

      // ===========================
      // CASH PAYMENT
      // ===========================

      if (data.paymentMethod === "Cash") {
        alert("Booking created successfully.");

        navigate("/user/my-bookings");

        return;
      }

      // ===========================
      // eSewa PAYMENT
      // ===========================

      const paymentResponse = await axios.post(
        "http://localhost:5001/api/esewa/initiate",
        {
          bookingId: booking._id,
        },
        {
          withCredentials: true,
        }
      );

      const paymentData = paymentResponse.data.payment;

      // ===========================
      // Create HTML Form
      // ===========================

      const form = document.createElement("form");

      form.method = "POST";

      form.action = paymentData.payment_url;

      Object.keys(paymentData).forEach((key) => {
        if (key === "payment_url") return;

        const input = document.createElement("input");

        input.type = "hidden";

        input.name = key;

        input.value = paymentData[key];

        form.appendChild(input);
      });

      document.body.appendChild(form);

      form.submit();
    } catch (err) {
  console.log(err);
  console.log(err.response);
  console.log(err.response?.data);

  alert(
    JSON.stringify(err.response?.data || err.message)
  );
}
  };

  if (loading && !venue) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading booking form...
      </div>
    );
  }
    return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <button
        type="button"
        onClick={() => navigate("/user/book-venue")}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
      >
        <FaArrowLeft />
        Back to Venues
      </button>

      {/* Venue Details */}

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          {venue?.name}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {venue?.location}
        </p>

        <p className="mt-2 text-xl font-bold text-green-600">
          Rs. {venue?.price || venue?.pricePerHour} / hour
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        {/* Booking Date */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaCalendarAlt className="text-green-600" />
            Select Date
          </label>

          <input
            type="date"
            min={today}
            {...register("bookingDate")}
            onChange={handleDateChange}
            className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Time Slots */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaClock className="text-green-600" />
            Choose Available Slot
          </label>

          {slots.length === 0 ? (
            <p className="text-sm text-red-500">
              No upcoming slots available for this date.
            </p>
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

        {/* Payment Method */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaMoneyBillWave className="text-green-600" />
            Payment Method
          </label>

          <div className="flex gap-4">
            <label className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border p-3 font-medium transition [&:has(:checked)]:border-green-600 [&:has(:checked)]:bg-green-50">
              <input
                type="radio"
                value="Cash"
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

        {/* Booking Summary */}

        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="mb-2 flex justify-between">
            <span>Venue</span>

            <span className="font-semibold">
              {venue?.name}
            </span>
          </div>

          <div className="mb-2 flex justify-between">
            <span>Date</span>

            <span className="font-semibold">
              {selectedDate}
            </span>
          </div>

          <div className="mb-2 flex justify-between">
            <span>Selected Slot</span>

            <span className="font-semibold">
              {selectedSlot
                ? `${selectedSlot.startTime} - ${selectedSlot.endTime}`
                : "-"}
            </span>
          </div>

          <div className="mt-3 flex justify-between border-t pt-3 text-lg font-bold text-green-700">
            <span>Total Amount</span>

            <span>
              Rs. {venue?.price || venue?.pricePerHour}
            </span>
          </div>
        </div>

        {/* Submit */}

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