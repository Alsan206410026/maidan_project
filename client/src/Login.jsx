import React, { useState } from "react";
import Layout from "./FrontendLayout/Layout";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log(data);

      // Example API
      // await axios.post("/api/login", data);

      alert("Login successful!");

      reset();
      setShowPassword(false);
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-xl rounded-2xl bg-white border border-gray-200 shadow-xl p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Login
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                autoComplete="email"
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

              <a
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </button>
            {/* oauth */}
           <div>
            <p className="flex items-center justify-center gap-2">or continue with</p>
           {/* oauth google login github login font awesome icons */}
                      <div className="flex justify-center gap-4">
                        <button
                          type="button"
                          aria-label="Continue with Google"
                          className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white  font-semibold text-gray-700 transition hover:bg-gray-100 px-5 py-5"
                        >
                         <img src="/google.png" alt="Google" className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          aria-label="Continue with GitHub"
                          className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white  font-semibold text-gray-700 transition hover:bg-gray-100 px-5 py-5"
                        >
                       <img src="/github.png" alt="GitHub" className="w-5 h-5"/>
                        </button>
                      </div>
          

           </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;