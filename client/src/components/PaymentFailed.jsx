import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle, FaRedo, FaHome } from "react-icons/fa";

function PaymentFailed() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">

        <FaTimesCircle className="mx-auto mb-4 text-6xl text-red-500" />

        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Payment Failed
        </h1>

        <p className="mb-6 text-gray-600">
          Your payment could not be completed or was cancelled.
          <br />
          No amount has been charged.
        </p>

        <div className="space-y-3">

          <Link
            to="/user/book-venue"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <FaRedo />
            Try Booking Again
          </Link>

          <Link
            to="/user-dashboard"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <FaHome />
            Back to Dashboard
          </Link>

        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;