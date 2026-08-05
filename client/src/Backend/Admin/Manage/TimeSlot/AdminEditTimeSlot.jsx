import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditTimeSlot() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [startTime, setStartTime] = useState("06:00 AM");
  const [endTime, setEndTime] = useState("07:00 AM");
  const navigate = useNavigate();
  const { id } = useParams();

  // Generate 24-hour time options in AM/PM format incremented by 30 mins
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        let h = hour % 12 === 0 ? 12 : hour % 12;
        let m = min < 10 ? "0" + min : min;
        let ampm = hour < 12 ? "AM" : "PM";
        options.push(`${h}:${m} ${ampm}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    fetchTimeSlotById();
  }, [id]);

  const fetchTimeSlotById = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/timeslot/${id}`, {
        withCredentials: true,
      });
      const s = response.data.data || response.data;
      
      // If backend already has individual startTime / endTime, use them; otherwise split the 'time' string
      if (s.startTime && s.endTime) {
        setStartTime(s.startTime);
        setEndTime(s.endTime);
      } else if (s.time && s.time.includes("-")) {
        const parts = s.time.split("-").map((t) => t.trim());
        if (parts[0]) setStartTime(parts[0]);
        if (parts[1]) setEndTime(parts[1]);
      }

      reset({
        status: s.status || "Available",
      });
    } catch (error) {
      console.error("Failed to fetch time slot details from database:", error);
    }
  };

  const onSubmit = async (data) => {
    const formattedTime = `${startTime} - ${endTime}`;
    const payload = {
      ...data,
      time: formattedTime,
      startTime: startTime,
      endTime: endTime,
    };

    try {
      await axios.put(`http://localhost:5001/api/timeslot/${id}`, payload, {
        withCredentials: true,
      });
      alert("Time slot updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to update time slot:", error);
      alert("Failed to update time slot.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-100">
      <h3 className="mb-5 text-xl font-bold text-slate-800">Edit Time Slot</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Start Time Dropdown */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-slate-600">Start Time</label>
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeOptions.map((time, idx) => (
              <option key={idx} value={time}>{time}</option>
            ))}
          </select>
        </div>

        {/* End Time Dropdown */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-slate-600">End Time</label>
          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeOptions.map((time, idx) => (
              <option key={idx} value={time}>{time}</option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-slate-600">Status</label>
          <select 
            {...register("status")} 
            className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Action Buttons */}
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
            Update Time Slot
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminEditTimeSlot;