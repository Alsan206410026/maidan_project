import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    FaFutbol,
    FaMapMarkerAlt,
    FaImage,
    FaArrowLeft,
    FaUserTie,
    FaTags,
} from "react-icons/fa";

function SuperAdminEditVenue() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [venue, setVenue] = useState({});
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetchVenue();
        fetchCategories();
        fetchAdmins();
    }, []);

    const fetchVenue = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/venue/${id}`, {
                withCredentials: true,
            });
            setVenue(response.data);
            reset({
                name: response.data.name,
                slug: response.data.slug,
                description: response.data.description,
                category: response.data.category,
                location: response.data.location,
                price: response.data.price,
                status: response.data.status,
                admin: response.data.admin,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/venuecategory", {
                withCredentials: true,
            });
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAdmins = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/auth/users", {
                withCredentials: true,
            });
            const filteredAdmins = response.data.filter((user) => user.role === "admin");
            setAdmins(filteredAdmins);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        const venueData = new FormData();
        venueData.append("name", data.name);
        venueData.append("slug", data.slug);
        venueData.append("description", data.description);
        venueData.append("category", data.category);
        venueData.append("location", data.location);
        venueData.append("price", data.price);
        venueData.append("status", data.status);
        venueData.append("admin", data.admin);

        if (data.image && data.image[0]) {
            venueData.append("image", data.image[0]);
        }

        try {
            setLoading(true);
            await axios.put(`http://localhost:5001/api/venue/${id}`, venueData, {
                withCredentials: true,
            });
            alert("Venue updated successfully.");
            navigate("/super-admin/venues");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to update venue.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Edit Venue</h1>
                    <p className="mt-1 text-sm text-gray-500">Update venue information.</p>
                </div>
                <NavLink to="/super-admin/venues">
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white">
                        <FaArrowLeft /> Back
                    </button>
                </NavLink>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-5 shadow-md md:p-8">
                {/* Venue Name */}
                <div className="mb-5">
                    <label className="mb-2 block font-semibold text-gray-700">Venue Name</label>
                    <div className="flex items-center rounded-xl border px-4 py-3">
                        <FaFutbol className="text-green-600" />
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="ml-3 w-full outline-none"
                        />
                    </div>
                </div>

                {/* Slug */}
                <div className="mb-5">
                    <label className="mb-2 block font-semibold text-gray-700">Slug</label>
                    <input
                        type="text"
                        {...register("slug", { required: true })}
                        className="w-full rounded-xl border px-4 py-3 outline-none"
                    />
                </div>

                {/* Category & Admin */}
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Category</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaTags className="text-green-600" />
                            <select
                                {...register("category", { required: true })}
                                className="ml-3 w-full bg-transparent outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Venue Admin</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaUserTie className="text-green-600" />
                            <select
                                {...register("admin", { required: true })}
                                className="ml-3 w-full bg-transparent outline-none"
                            >
                                <option value="">Select Admin</option>
                                {admins.map((admin) => (
                                    <option key={admin._id} value={admin._id}>
                                        {admin.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Location & Price */}
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Location</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaMapMarkerAlt className="text-green-600" />
                            <input
                                type="text"
                                {...register("location", { required: true })}
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Price Per Hour</label>
                        <input
                            type="number"
                            {...register("price", { required: true })}
                            className="w-full rounded-xl border px-4 py-3 outline-none"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mt-5">
                    <label className="mb-2 block font-semibold text-gray-700">Description</label>
                    <textarea
                        rows="5"
                        {...register("description", { required: true })}
                        className="w-full resize-none rounded-xl border px-4 py-3 outline-none"
                    />
                </div>

                {/* Current Image */}
                {venue.images && (
                    <div className="mt-5">
                        <label className="mb-2 block font-semibold text-gray-700">Current Image</label>
                        <img
                            src={venue.images}
                            alt={venue.name}
                            className="h-56 w-full rounded-xl border object-cover"
                        />
                    </div>
                )}

                {/* Upload New Image */}
                <div className="mt-5">
                    <label className="mb-2 block font-semibold text-gray-700">Upload New Image (Optional)</label>
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-8 transition hover:bg-green-100">
                        <FaImage className="mb-3 text-3xl text-green-600" />
                        <p className="text-sm text-gray-600">Click to choose another image</p>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register("image")}
                        />
                    </label>
                </div>

                {/* Status */}
                <div className="mt-5">
                    <label className="mb-2 block font-semibold text-gray-700">Status</label>
                    <select
                        {...register("status", { required: true })}
                        className="w-full rounded-xl border px-4 py-3 outline-none"
                    >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Update Venue"}
                    </button>
                    <NavLink to="/super-admin/venues" className="flex-1">
                        <button
                            type="button"
                            className="w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

export default SuperAdminEditVenue;