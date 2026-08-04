import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SuperAdminManageAdmins() {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    const fetchAdmins = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5001/api/auth/users",
                {
                    withCredentials: true,
                }
            );

            const filteredAdmins = response.data.filter(
                (user) => user.role === "admin"
            );

            setAdmins(filteredAdmins);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this admin?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5001/api/user/${id}`,
                {
                    withCredentials: true,
                }
            );

            fetchAdmins();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <FaUser className="text-2xl" />
                <h1 className="text-2xl font-bold">Manage Admins</h1>
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
                        {admins.map((admin) => (
                            <tr key={admin._id} className="border-t">
                                <td className="p-3">{admin.fullName}</td>
                                <td className="p-3">{admin.email}</td>
                                <td className="p-3">{admin.phoneNumber}</td>
                                <td className="p-3 capitalize">{admin.role}</td>

                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            admin.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : admin.status === "suspended"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {admin.status}
                                    </span>
                                </td>

                                <td className="p-3 flex gap-3">
                                    <button
                                        onClick={() =>
                                            navigate(`/super-admin/users/edit/${admin._id}`)
                                        }
                                        className="text-blue-600"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(admin._id)}
                                        className="text-red-600"
                                    >
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

export default SuperAdminManageAdmins;