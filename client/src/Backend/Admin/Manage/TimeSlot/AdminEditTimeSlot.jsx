import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditTimeSlot() {
  const { register, handleSubmit, reset } = useForm();
  const [startTime, setStartTime] = useState("06:00 AM");
  const [endTime, setEndTime] = useState("07:00 AM");

  const navigate = useNavigate();
  const { venueId, id } = useParams();

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

  useEffect(() => { fetchTimeSlotById(); }, [id]);

  const fetchTimeSlotById = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/timeslot/${id}`, { withCredentials: true });
      const slot = response.data.data || response.data;

      setStartTime(slot.startTime || "06:00 AM");
      setEndTime(slot.endTime || "07:00 AM");
      reset({ status: slot.status || "Active" });
    } catch (error) {
      console.error("Failed to fetch time slot:", error.response?.data || error.message);
      alert("Failed to load time slot details.");
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:5001/api/timeslot/admin/${venueId}/${id}`,
        { startTime, endTime, status: data.status },
        { withCredentials: true }
      );

      alert("Time slot updated successfully.");
      navigate(-1);
    } catch (error) {
      console.error("Failed to update time slot:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update time slot.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-100">
      <h3 className="mb-6 text-2xl font-bold text-slate-800">Edit Time Slot</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">Start Time</label>
          <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5">
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">End Time</label>
          <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5">
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">Status</label>
          <select {...register("status")} className="w-full rounded-lg border border-slate-300 px-3 py-2.5">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => navigate(-1)} className="rounded-lg bg-slate-200 px-5 py-2.5 font-medium text-slate-700">Cancel</button>
          <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white">Update Time Slot</button>
        </div>
      </form>
    </div>
  );
}

export default AdminEditTimeSlot;