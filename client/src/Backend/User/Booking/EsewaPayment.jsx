import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EsewaPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingPayload = location.state?.bookingPayload;

  return (
    <div className="mx-auto max-w-md my-12 rounded-xl bg-white p-6 shadow-md border text-center space-y-4">
      <h2 className="text-2xl font-bold text-green-600">eSewa Payment Gateway</h2>
      <p className="text-sm text-gray-500">Redirected from booking form.</p>
      
      {bookingPayload && (
        <div className="bg-gray-50 p-4 rounded-lg text-left text-sm space-y-1 text-gray-700">
          <p><strong>Amount:</strong> Rs. {bookingPayload.totalAmount}</p>
          <p><strong>Date:</strong> {bookingPayload.bookingDate}</p>
        </div>
      )}

      <button
        onClick={() => navigate("/user/my-bookings/pending")}
        className="w-full rounded-lg bg-green-600 py-2.5 font-semibold text-white hover:bg-green-700"
      >
        Simulate Payment & Go to Bookings
      </button>
    </div>
  );
}

export default EsewaPayment;