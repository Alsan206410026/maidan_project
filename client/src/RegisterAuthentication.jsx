import React, { useEffect, useState } from "react";
import Layout from "./FrontendLayout/Layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterAuthentication() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/verify-otp",
        { otp: data.otp },
        { withCredentials: true }
      );

      setMessage(response?.data?.message || "Registration successful.");
      sessionStorage.removeItem("email");
      reset();
      navigate("/login");
    } catch (error) {
      console.error("OTP verification failed:", error);
      setMessage(
        error?.response?.data?.message ||
          "Unable to verify OTP. Please try again."
      );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-xl lg:p-10">
          <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
            Verify OTP
          </h1>

          <p className="mb-8 text-center text-sm text-gray-600">
            {email
              ? `Enter the OTP sent to ${email}.`
              : "Enter the OTP sent to your email address."}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                {...register("otp")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {message ? (
              <p className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700 border border-gray-200">
                {message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterAuthentication