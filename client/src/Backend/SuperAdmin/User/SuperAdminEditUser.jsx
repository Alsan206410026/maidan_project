import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaUserEdit } from "react-icons/fa";
import axios from "axios";

function SuperAdminEditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5001/api/auth/users",
                    {
                        withCredentials: true,
                    }
                );

                const user = response.data.find(
                    (user) => user._id === id
                );

                if (!user) {
                    alert("User not found");
                    navigate(-1);
                    return;
                }

                reset({
                    fullName: user.fullName,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    status: user.status,
                });

            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [id, reset, navigate]);

    const onSubmit = async (data) => {
        try {
            await axios.put(
                `http://localhost:5001/api/user/${id}`,
                data,
                {
                    withCredentials: true,
                }
            );

            alert("User updated successfully.");

            navigate("/super-admin/users");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update user."
            );
        }
    };

    return (
        <div className="p-6">

            <div className="flex items-center gap-3 mb-6">

                <button
                    onClick={() => navigate(-1)}
                    className="text-xl"
                >
                    <FaArrowLeft />
                </button>

                <FaUserEdit className="text-2xl" />

                <h1 className="text-2xl font-bold">
                    Edit User
                </h1>

            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-lg shadow p-6 space-y-5"
            >

                <div>
                    <label className="block mb-1 font-medium">
                        Full Name
                    </label>

                    <input
                        type="text"
                        {...register("fullName")}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Username
                    </label>

                    <input
                        type="text"
                        {...register("username")}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        {...register("email")}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        {...register("phoneNumber")}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Role
                    </label>

                    <select
                        {...register("role")}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Status
                    </label>

                    <select
                        {...register("status")}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>

                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                        Update User
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
}

export default SuperAdminEditUser;