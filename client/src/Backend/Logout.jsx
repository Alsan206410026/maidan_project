import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Logging out...");

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post(
          "http://localhost:5001/api/auth/logout",
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        localStorage.clear();
        sessionStorage.clear();
        setMessage("Logged out successfully. Redirecting...");
        navigate("/", { replace: true });
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xl">
        <h1 className="mb-3 text-2xl font-bold text-gray-800">Logout</h1>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default Logout;
