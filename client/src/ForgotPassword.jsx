import React, { useEffect, useState } from "react";
import Layout from "./FrontendLayout/Layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const [step, setStep] = useState("request");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email") || sessionStorage.getItem("email");
    if (savedEmail) {
      setValue("email", savedEmail);
    }
  }, [setValue]);

  const handleRequestOtp = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/forgot-password",
        { email: data.email }
      );

      setMessage(response?.data?.message || "OTP sent to your email.");
      setStep("reset");
      reset({ email: data.email });
    } catch (error) {
      console.error("Forgot password request failed:", error);
      const errorText =
        error?.response?.data?.message || "Unable to send OTP. Please try again.";
      setMessage(errorText);
    }
  };

  const handleResetPassword = async (data) => {
    const newPassword = data.newPassword;
    const confirmPassword = data.confirmPassword;

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/reset-password",
        {
          email: getValues("email"),
          otp: data.otp,
          newPassword,
        }
      );

      setMessage(response?.data?.message || "Password reset successful.");
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Reset password failed:", error);
      const errorText =
        error?.response?.data?.message || "Unable to reset password. Please try again.";
      setMessage(errorText);
    }
  };

  const onSubmit = step === "request" ? handleRequestOtp : handleResetPassword;

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
        <div className="w-full max-w-xl rounded-2xl bg-white border border-gray-200 shadow-xl p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
            Forgot Password
          </h1>

          <p className="text-center text-sm text-gray-600 mb-8">
            {step === "request"
              ? "Enter your email to receive a reset OTP."
              : "Enter the OTP and your new password to complete the reset."}
          </p>

          {message ? (
            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              {message}
            </div>
          ) : null}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                {...register("email", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                disabled={step === "reset"}
              />
            </div>

            {step === "reset" ? (
              <>
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    OTP
                  </label>

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    {...register("otp", { required: true })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    New Password
                  </label>

                  <input
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
                    {...register("newPassword", { required: true })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
                    {...register("confirmPassword", { required: true })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isSubmitting
                ? step === "request"
                  ? "Sending OTP..."
                  : "Resetting..."
                : step === "request"
                ? "Send OTP"
                : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
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
