import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

function HistoryPage() {
  const [historyBookings, setHistoryBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings from backend using session cookie
    axios
      .get("http://localhost:5001/api/booking", { withCredentials: true })
      .then((res) => {
        // Simple fallback if response is wrapped or direct array
        const data = res.data.data || res.data || [];
        setHistoryBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading history:", err);
        setLoading(false);
      });
  }, []);

  // Delete a single item from state
  const handleDelete = (id) => {
    setHistoryBookings(historyBookings.filter((b) => b._id !== id));
  };

  // Clear all history from state
  const handleClearAll = () => {
    setHistoryBookings([]);
  };

  if (loading) return <p className="p-4 text-gray-500">Loading history...</p>;

  return (
    <div className="space-y-4">
      {/* Top Header & Clear All Button */}
      <div className="flex justify-between items-center pb-2">
        <span className="text-sm text-gray-500">
          Total History: {historyBookings.length}
        </span>

        {historyBookings.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded text-sm hover:bg-red-200"
          >
            <FaTrashAlt /> Clear All
          </button>
        )}
      </div>

      {/* History List */}
      {historyBookings.length === 0 ? (
        <p className="p-8 text-center text-gray-500 bg-white border rounded">
          No history found.
        </p>
      ) : (
        historyBookings.map((b) => (
          <div
            key={b._id}
            className="flex justify-between items-center p-4 bg-white border rounded shadow-sm"
          >
            {/* Details */}
            <div>
              <h3 className="font-bold text-gray-800">
                {b.venue?.name || "Venue Booking"}
              </h3>
              <p className="text-sm text-gray-500">Date: {b.bookingDate}</p>
              <p className="text-xs text-gray-400">
                Payment: {b.paymentMethod || "N/A"}
              </p>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
                  {b.bookingStatus || "Completed"}
                </span>
                <p className="font-bold text-sm mt-1">NRs. {b.totalAmount}</p>
              </div>

              {/* Simple Delete Button */}
              <button
                onClick={() => handleDelete(b._id)}
                className="text-gray-400 hover:text-red-600 p-2"
                title="Remove"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryPage;