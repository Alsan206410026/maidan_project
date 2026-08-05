import React, { useEffect, useState } from "react";
import axios from "axios";

function PendingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/booking", { withCredentials: true })
      .then((res) => {
        const pendingData = (res.data || []).filter(
          (b) =>
            (b.bookingStatus === "Booked" || b.bookingStatus === "Pending") &&
            b.paymentStatus !== "Paid"
        );
        setBookings(pendingData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-8 text-center text-gray-500">Loading...</div>;

  if (bookings.length === 0) {
    return <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">No pending payments.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {bookings.map((item) => (
        <div key={item._id} className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800">{item.venue?.name || "Venue"}</h3>
            <span className="bg-yellow-100 text-yellow-700 px-2.5 py-0.5 rounded text-xs font-bold">
              Pay on Cash / Pending
            </span>
          </div>
          <p className="text-sm text-gray-600">Date: {item.bookingDate}</p>
          <p className="text-sm text-gray-600">Time: {item.slot?.startTime} - {item.slot?.endTime}</p>
          <p className="mt-2 text-sm font-semibold text-gray-800">Amount Due: Rs. {item.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}

export default PendingPage;