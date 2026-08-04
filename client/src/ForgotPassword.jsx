import React from "react";
import Layout from "./FrontendLayout/Layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/forgot-password",
        {
          email: data.email,
        }
      );

      // Save email only for reset password page
      sessionStorage.setItem("resetEmail", data.email);

      alert(res.data.message);

      navigate("/reset-password");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
            Forgot Password
          </h1>

          <p className="mb-8 text-center text-gray-600">
            Enter your registered email address to receive a password reset OTP.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Email */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Send OTP"
              )}
            </button>

            {/* Back */}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPassword;