import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SuperAdminManageUser() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/auth/users", { withCredentials: true });
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5001/api/users/${id}`, { withCredentials: true });
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <FaUser className="text-2xl" />
                <h1 className="text-2xl font-bold">Manage Users</h1>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="p-3">{user.fullName}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.phoneNumber}</td>
                                <td className="p-3 capitalize">{user.role}</td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        user.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : user.status === "suspended"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-3">
                                    <button onClick={() => navigate(`/super-admin/users/edit/${user._id}`)} className="text-blue-600">
                                        <FaEdit />
                                    </button>

                                    <button onClick={() => handleDelete(user._id)} className="text-red-600">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SuperAdminManageUser;