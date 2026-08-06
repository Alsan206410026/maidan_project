import { useEffect, useState } from "react";
import axios from "axios";

const useGetUsersForSidebar = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          "http://localhost:5001/api/admin-chat/users",
          {
            withCredentials: true,
          }
        );

        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { loading, users };
};

export default useGetUsersForSidebar;