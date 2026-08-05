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
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      startTime: "06:00 AM",
      endTime: "07:00 AM",
      status: "Active"
    }
  });

  const navigate = useNavigate();

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

  // Fetch venue first, then fetch time slots using the retrieved venueId
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      const currentVenueId = await fetchMyVenue();
      if (currentVenueId) {
        await fetchTimeSlots(currentVenueId);
      }
      setLoading(false);
    };

    initializeData();
  }, []);

  const fetchMyVenue = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/venue/my-venue", {
        withCredentials: true,
      });
      const venueData = response.data.data || response.data;
      const activeVenue = Array.isArray(venueData) ? venueData[0] : venueData;
      
      if (activeVenue && activeVenue._id) {
        setVenueId(activeVenue._id);
        setVenueName(activeVenue.name);
        return activeVenue._id;
      }
    } catch (error) {
      console.error("Failed to fetch venue:", error);
    }
    return null;
  };

  const fetchTimeSlots = async (currentVenueId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/timeslot?venueId=${currentVenueId}`, {
        withCredentials: true,
      });
      setTimeSlots(response.data.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch time slots:", error);
    }
  };

  const handleAddSlot = async (data) => {
    if (!venueId) {
      alert("Venue ID not found. Please ensure your venue is configured.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/timeslot",
        {
          venueId: venueId,
          venue: venueId,
          startTime: data.startTime,
          endTime: data.endTime,
          status: data.status,
        },
        {
          withCredentials: true,
        }
      );
      setShowAddModal(false);
      reset();
      fetchTimeSlots(venueId);
    } catch (error) {
      console.error("Failed to create time slot:", error.response?.data || error.message);
      alert(`Failed to create time slot: ${error.response?.data?.message || error.message}`);
    }
  };

 const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this time slot?")) {
      try {
        // Pass venueId inside the data property of the axios config object
        const response = await axios.delete(`http://localhost:5001/api/timeslot/${id}`, {
          data: { venue: venueId },
          withCredentials: true,
        });
        
        if (response.data.success) {
          setTimeSlots(timeSlots.filter((t) => t._id !== id));
        }
      } catch (error) {
        console.error("Failed to delete time slot:", error.response?.data || error.message);
        alert(`Failed to delete time slot: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div>
      {/* Header section */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-slate-800 text-xl font-bold m-0">Manage Time Slots</h3>
          {venueName && (
            <p className="text-xs text-slate-500 mt-1">
              Venue: <span className="font-semibold text-slate-700">{venueName}</span>
            </p>
          )}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-none px-4 py-2.5 rounded-md cursor-pointer font-medium transition"
        >
          <FaPlus /> Add Time Slot
        </button>
      </div>

      {/* Add Time Slot Form / Modal Box */}
      {showAddModal && (
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-5 shadow-sm">
          <h4 className="mb-4 text-slate-800 font-semibold text-lg">Create New Time Slot</h4>
          <form onSubmit={handleSubmit(handleAddSlot)} className="flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <label className="block mb-1.5 text-sm font-medium text-slate-600">Start Time</label>
              <select
                {...register("startTime")}
                className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timeOptions.map((time, idx) => (
                  <option key={idx} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[180px]">
              <label className="block mb-1.5 text-sm font-medium text-slate-600">End Time</label>
              <select
                {...register("endTime")}
                className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timeOptions.map((time, idx) => (
                  <option key={idx} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="w-[150px]">
              <label className="block mb-1.5 text-sm font-medium text-slate-600">Status</label>
              <select
                {...register("status")}
                className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-md cursor-pointer font-medium transition">Save</button>
              <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 border-none rounded-md cursor-pointer font-medium transition">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Time Slots Table */}
      <div className="overflow-x-auto bg-white p-5 rounded-lg shadow-sm border border-slate-100">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-600 text-sm">
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-5 text-center text-slate-500">Loading time slots...</td>
              </tr>
            ) : timeSlots.length > 0 ? (
              timeSlots.map((slot) => (
                <tr key={slot._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-3 font-medium text-slate-800">
                    {slot.time || slot.slotName || (slot.startTime && slot.endTime ? `${slot.startTime} - ${slot.endTime}` : "-")}
                  </td>
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      {slot.status || "Active"}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`edit/${slot._id}`)}
                      className="bg-blue-50 hover:bg-blue-100 border-none p-2 rounded-md text-blue-600 cursor-pointer mr-2 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="bg-red-50 hover:bg-red-100 border-none p-2 rounded-md text-red-600 cursor-pointer transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-5 text-center text-slate-500">No time slots found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManageTimeSlot;