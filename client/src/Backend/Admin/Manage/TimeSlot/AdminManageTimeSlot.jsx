import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function AdminManageTimeSlot() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [venueId, setVenueId] = useState("");
  const [venueName, setVenueName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { startTime: "06:00 AM", endTime: "07:00 AM", status: "Active" },
  });

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

  useEffect(() => { initializeData(); }, []);

  const initializeData = async () => {
    setLoading(true);
    const id = await fetchMyVenue();
    if (id) {
      await fetchTimeSlots(id);
    }
    setLoading(false);
  };

  const fetchMyVenue = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/venue/my-venue", { withCredentials: true });
      const venueData = response.data.data || response.data;
      const venue = Array.isArray(venueData) ? venueData[0] : venueData;

      if (venue?._id) {
        setVenueId(venue._id);
        setVenueName(venue.name);
        return venue._id;
      }
    } catch (error) {
      console.error("Failed to fetch venue:", error.response?.data || error.message);
    }
    return null;
  };

  const fetchTimeSlots = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/timeslot?venueId=${id}`, { withCredentials: true });
      setTimeSlots(response.data.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch time slots:", error.response?.data || error.message);
    }
  };

  const handleAddSlot = async (data) => {
    try {
      await axios.post(
        `http://localhost:5001/api/timeslot/admin/${venueId}`,
        {
          venueId: venueId,
          startTime: data.startTime,
          endTime: data.endTime,
          status: data.status,
        },
        { withCredentials: true }
      );
      setShowAddModal(false);
      reset();
      await fetchTimeSlots(venueId);
      alert("Time slot created successfully.");
    } catch (error) {
      console.error("Failed to create time slot:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to create time slot.");
    }
  };

  const handleDelete = async (slotVenueId, slotId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this time slot?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/timeslot/admin/${slotVenueId}/${slotId}`, { withCredentials: true });
      setTimeSlots((prev) => prev.filter((slot) => slot._id !== slotId));
      alert("Time slot deleted successfully.");
    } catch (error) {
      console.error("Failed to delete time slot:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to delete time slot.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Manage Time Slots</h3>
          {venueName && <p className="text-sm text-slate-500 mt-1">Venue: <span className="font-semibold text-slate-700 ml-1">{venueName}</span></p>}
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg"><FaPlus /> Add Time Slot</button>
      </div>

      {showAddModal && (
        <div className="bg-white p-6 rounded-xl shadow border mb-6">
          <h4 className="text-lg font-bold mb-5">Create Time Slot</h4>
          <form onSubmit={handleSubmit(handleAddSlot)} className="flex gap-4 flex-wrap items-end">
            <div>
              <label className="block text-sm mb-2">Start Time</label>
              <select {...register("startTime")} className="border rounded-lg p-2.5">
                {timeOptions.map((time, index) => (
                  <option key={index}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">End Time</label>
              <select {...register("endTime")} className="border rounded-lg p-2.5">
                {timeOptions.map((time, index) => (
                  <option key={index}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Status</label>
              <select {...register("status")} className="border rounded-lg p-2.5">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg">Save</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="bg-slate-200 px-5 py-2.5 rounded-lg">Cancel</button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-white p-6 rounded-xl shadow border">
        <table className="w-full">
          <thead>
            <tr className="border-b text-slate-600">
              <th className="p-3 text-left">S.N.</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center p-6">Loading time slots...</td></tr>
            ) : timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => {
                const slotVenueId = slot.venue?._id || slot.venue || venueId;

                return (
                  <tr key={slot._id} className="border-b hover:bg-slate-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{slot.startTime && slot.endTime ? `${slot.startTime} - ${slot.endTime}` : "-"}</td>
                    <td className="p-3"><span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">{slot.status || "Active"}</span></td>
                    <td className="p-3 text-center">
                      <button onClick={() => navigate(`/admin/manage/timeslots/edit/${slotVenueId}/${slot._id}`)} className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-2"><FaEdit /></button>
                      <button onClick={() => handleDelete(slotVenueId, slot._id)} className="p-2 bg-red-50 text-red-600 rounded-lg"><FaTrash /></button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="4" className="text-center p-6">No time slots found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManageTimeSlot;