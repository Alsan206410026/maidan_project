import React, { useEffect, useState } from "react";
import Layout from "./FrontendLayout/Layout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const emailValue = watch("email");

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("email");
    const rememberedPassword = localStorage.getItem("password");
    const rememberedRole = localStorage.getItem("role");
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    if (rememberMe && rememberedEmail && rememberedPassword) {
      setValue("email", rememberedEmail);
      setValue("password", rememberedPassword);
      setValue("rememberMe", true);
    }

    if (!rememberMe && rememberedRole) {
      setValue("email", sessionStorage.getItem("email") || "");
    }
  }, [setValue]);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("email");
    const rememberedPassword = localStorage.getItem("password");
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    if (rememberMe && rememberedEmail && rememberedPassword && emailValue === rememberedEmail) {
      setValue("password", rememberedPassword);
    }
  }, [emailValue, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        data,
        { withCredentials: true }
      );

      const token = response?.data?.token;
      const role = response?.data?.role;
      const rememberMe = Boolean(data.rememberMe);
      const storage = rememberMe ? localStorage : sessionStorage;
      const cleanupStorage = rememberMe ? sessionStorage : localStorage;

      cleanupStorage.removeItem("token");
      cleanupStorage.removeItem("role");
      cleanupStorage.removeItem("email");
      cleanupStorage.removeItem("password");
      cleanupStorage.removeItem("rememberMe");

      storage.setItem("token", token);
      storage.setItem("role", role || "user");
      storage.setItem("email", response?.data?.email || data.email);
      storage.setItem("rememberMe", rememberMe ? "true" : "false");
      if (rememberMe) {
        storage.setItem("password", data.password);
      } else {
        storage.removeItem("password");
      }

      if (role === "super_admin") {
        navigate("/super-admin-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

      reset();
      setShowPassword(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-xl rounded-2xl bg-white border border-gray-200 shadow-xl p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Login
          </h1>

          {errorMessage ? (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="on"
            className="space-y-6"
          >
            {/* email */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                autoComplete="username"
                {...register("email")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  autoComplete="current-password"
                  {...register("password")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Remember Me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
            
           
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;