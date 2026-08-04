import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SuperAdminManageSuperAdmin() {
    const [superAdmins, setSuperAdmins] = useState([]);
    const navigate = useNavigate();

    const fetchSuperAdmins = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5001/api/auth/users",
                {
                    withCredentials: true,
                }
            );

            const filteredSuperAdmins = response.data.filter(
                (user) => user.role === "super_admin"
            );

            setSuperAdmins(filteredSuperAdmins);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSuperAdmins();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this super admin?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5001/api/user/${id}`,
                {
                    withCredentials: true,
                }
            );

            fetchSuperAdmins();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <FaUser className="text-2xl" />
                <h1 className="text-2xl font-bold">Manage Super Admins</h1>
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
                        {superAdmins.map((superAdmin) => (
                            <tr key={superAdmin._id} className="border-t">
                                <td className="p-3">{superAdmin.fullName}</td>
                                <td className="p-3">{superAdmin.email}</td>
                                <td className="p-3">{superAdmin.phoneNumber}</td>
                                <td className="p-3 capitalize">{superAdmin.role}</td>

                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            superAdmin.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : superAdmin.status === "suspended"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {superAdmin.status}
                                    </span>
                                </td>

                                <td className="p-3 flex gap-3">
                                    <button
                                        onClick={() =>
                                            navigate(`/super-admin/users/edit/${superAdmin._id}`)
                                        }
                                        className="text-blue-600"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(superAdmin._id)}
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

export default SuperAdminManageSuperAdmin;