import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    FaTrophy,
    FaMapMarkerAlt,
    FaImage,
    FaArrowLeft,
    FaCalendarAlt,
    FaPhone,
    FaMoneyBillWave,
    FaUsers,
} from "react-icons/fa";

function SuperAdminEditTournament() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tournament, setTournament] = useState({});
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetchTournament();
    }, []);

    // Helper function to format ISO date to YYYY-MM-DD for date inputs
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0];
    };

    const fetchTournament = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/tournament/${id}`, {
                withCredentials: true,
            });
            const data = response.data;
            setTournament(data);

            // Populate react-hook-form fields
            reset({
                name: data.name || "",
                sport: data.sport || "",
                venue: data.venue || "",
                location: data.location || "",
                contact: data.contact || "",
                pricePool: data.pricePool || "",
                pricePerTeam: data.pricePerTeam || "",
                startDate: formatDate(data.startDate),
                endDate: formatDate(data.endDate),
                description: data.description || "",
                status: data.status || "upcoming",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        const tournamentData = new FormData();
        tournamentData.append("name", data.name);
        tournamentData.append("sport", data.sport);
        tournamentData.append("venue", data.venue);
        tournamentData.append("location", data.location || "");
        tournamentData.append("contact", data.contact);
        tournamentData.append("pricePool", data.pricePool || 0);
        tournamentData.append("pricePerTeam", data.pricePerTeam || 0);
        tournamentData.append("startDate", data.startDate);
        tournamentData.append("endDate", data.endDate);
        tournamentData.append("description", data.description || "");
        tournamentData.append("status", data.status);

        if (data.image && data.image[0]) {
            tournamentData.append("image", data.image[0]);
        }

        try {
            setLoading(true);
            await axios.put(`http://localhost:5001/api/tournament/${id}`, tournamentData, {
                withCredentials: true,
            });
            alert("Tournament updated successfully.");
            navigate("/super-admin/tournaments");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to update tournament.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Edit Tournament</h1>
                    <p className="mt-1 text-sm text-gray-500">Update tournament details.</p>
                </div>
                <NavLink to="/super-admin/tournaments">
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white">
                        <FaArrowLeft /> Back
                    </button>
                </NavLink>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-5 shadow-md md:p-8">
                {/* Tournament Name & Sport */}
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Tournament Name</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaTrophy className="text-green-600" />
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Sport</label>
                        <input
                            type="text"
                            {...register("sport", { required: true })}
                            className="w-full rounded-xl border px-4 py-3 outline-none"
                        />
                    </div>
                </div>

                {/* Venue & Location */}
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Venue</label>
                        <input
                            type="text"
                            {...register("venue", { required: true })}
                            className="w-full rounded-xl border px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Location</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaMapMarkerAlt className="text-green-600" />
                            <input
                                type="text"
                                {...register("location")}
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact, Prize Pool & Entry Fee */}
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Contact</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaPhone className="text-green-600" />
                            <input
                                type="text"
                                {...register("contact", { required: true })}
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Prize Pool</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaMoneyBillWave className="text-green-600" />
                            <input
                                type="number"
                                {...register("pricePool")}
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Entry Fee (Per Team)</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaUsers className="text-green-600" />
                            <input
                                type="number"
                                {...register("pricePerTeam")}
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Dates */}
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Start Date</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaCalendarAlt className="text-green-600" />
                            <input
                                type="date"
                                {...register("startDate", { required: true })}
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">End Date</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaCalendarAlt className="text-green-600" />
                            <input
                                type="date"
                                {...register("endDate", { required: true })}
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-5">
                    <label className="mb-2 block font-semibold text-gray-700">Description</label>
                    <textarea
                        rows="5"
                        {...register("description")}
                        className="w-full resize-none rounded-xl border px-4 py-3 outline-none"
                    />
                </div>

                {/* Current Image */}
                {tournament.images && (
                    <div className="mt-5">
                        <label className="mb-2 block font-semibold text-gray-700">Current Image</label>
                        <img
                            src={tournament.images}
                            alt={tournament.name}
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
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Update Tournament"}
                    </button>
                    <NavLink to="/super-admin/tournaments" className="flex-1">
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

export default SuperAdminEditTournament;