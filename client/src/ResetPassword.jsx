import React, { useEffect } from "react";
import Layout from "./FrontendLayout/Layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    const email = sessionStorage.getItem("resetEmail");

    if (!email) {
      navigate("/forgot-password");
      return;
    }

    setValue("email", email);
  }, [navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/reset-password",
        {
          email: getValues("email"),
          otp: data.otp,
          newPassword: data.newPassword,
        }
      );

      alert(response.data.message);

      sessionStorage.removeItem("resetEmail");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to reset password."
      );
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
            Reset Password
          </h1>

          <p className="mb-8 text-center text-gray-600">
            Enter the OTP sent to your email and create a new password.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Email */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                readOnly
                {...register("email")}
                className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
              />
            </div>

            {/* OTP */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                OTP
              </label>

              <input
                type="text"
                placeholder="Enter OTP"
                {...register("otp", {
                  required: true,
                })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                New Password
              </label>

              <input
                type="password"
                placeholder="********"
                autoComplete="new-password"
                {...register("newPassword", {
                  required: true,
                })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Reset Password"
              )}
            </button>

            {/* Back to Login */}
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("resetEmail");
                navigate("/login");
              }}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ResetPassword;