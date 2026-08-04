import { useEffect, useState } from "react";
import axios from "axios";

const useGetAdminsForSidebar = () => {
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const getAdmins = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          "http://localhost:5001/api/users/getAdmins",
          {
            withCredentials: true,
          }
        );

        setAdmins(res.data.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    getAdmins();
  }, []);

  return { loading, admins };
};

export default useGetAdminsForSidebar;