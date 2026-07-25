import React, { useState } from "react";
import Layout from "./FrontendLayout/Layout";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const onSubmit = async (data) => {
    const email = getValues("email");

    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    console.log(data);

    // await axios.post("/api/register", data);

    alert("Account created successfully!");
    reset();
    setOtpSent(false);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
        <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-xl lg:p-10">
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  {...register("fullName")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  autoComplete="username"
                  {...register("username")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  {...register("email")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  autoComplete="tel"
                  {...register("phone")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>


            </div>


            {/* Password Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    autoComplete="new-password"
                    {...register("password")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>



            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <div className="flex items-center justify-center gap-2">
              <p>or</p>
            </div>

            {/* oauth google registration */}
            <div className="flex justify-center gap-4 " onClick={() => window.open("http://localhost:5001/auth/google", "_self")}>
              <button
                type="button"
                aria-label="Continue with Google"
                className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white  font-semibold text-gray-700 transition hover:bg-gray-100 px-5 py-5 w-full"
              >
                <div className="flex items-center gap-6">
                  <div><img src="/google.png" alt="Google" className="w-5 h-5" /></div>
                  <div><p>Continue with Google</p></div>
                </div>
              </button>

            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Register;