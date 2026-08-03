import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ role }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5002/api/auth/me",
          {
            withCredentials: true,
          }
        );

        if (res.data.user.role === role) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [role]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return authorized ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;