import React, { useEffect, useState } from "react";
import axios from "axios";

function BookedPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cookie is sent automatically with withCredentials: true
    axios
      .get("http://localhost:5001/api/booking", { withCredentials: true })
      .then((res) => {
        const paidData = (res.data || []).filter(
          (b) => b.bookingStatus === "Paid" || b.paymentStatus === "Paid"
        );
        setBookings(paidData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-8 text-center text-gray-500">Loading...</div>;

  if (bookings.length === 0) {
    return <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">No paid bookings found.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {bookings.map((item) => (
        <div key={item._id} className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800">{item.venue?.name || "Venue"}</h3>
            <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded text-xs font-bold">
              Paid ({item.paymentMethod})
            </span>
          </div>
          <p className="text-sm text-gray-600">Date: {item.bookingDate}</p>
          <p className="text-sm text-gray-600">Time: {item.slot?.startTime} - {item.slot?.endTime}</p>
          <p className="mt-2 text-sm font-semibold text-gray-800">Amount: Rs. {item.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}

export default BookedPage;