import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    FaTrophy,
    FaMapMarkerAlt,
    FaImage,
    FaArrowLeft,
    FaCalendarAlt,
    FaPhoneAlt,
    FaDollarSign,
    FaFutbol,
} from "react-icons/fa";

function SuperAdminAddTournament() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const tournamentData = new FormData();
        tournamentData.append("name", data.name);
        tournamentData.append("sport", data.sport);
        tournamentData.append("venue", data.venue);
        tournamentData.append("location", data.location);
        tournamentData.append("contact", data.contact);
        tournamentData.append("pricePool", data.pricePool);
        tournamentData.append("pricePerTeam", data.pricePerTeam);
        tournamentData.append("startDate", data.startDate);
        tournamentData.append("endDate", data.endDate);
        tournamentData.append("description", data.description);
        tournamentData.append("status", data.status);

        if (data.image && data.image[0]) {
            tournamentData.append("image", data.image[0]);
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            await axios.post("http://localhost:5001/api/tournament", tournamentData, {
                withCredentials: true,
            });
            alert("Tournament created successfully.");
            navigate("/super-admin/tournaments");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to create tournament.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Add Tournament</h1>
                    <p className="mt-1 text-sm text-gray-500">Create a new sports tournament.</p>
                </div>
                <NavLink to="/super-admin/tournaments">
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white">
                        <FaArrowLeft /> Back
                    </button>
                </NavLink>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-5 shadow-md md:p-8">
                {/* Tournament Name */}
                <div className="mb-5">
                    <label className="mb-2 block font-semibold text-gray-700">Tournament Name</label>
                    <div className="flex items-center rounded-xl border px-4 py-3">
                        <FaTrophy className="text-green-600" />
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Enter tournament name"
                            className="ml-3 w-full outline-none"
                        />
                    </div>
                </div>

                {/* Sport & Venue */}
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Sport Type</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaFutbol className="text-green-600" />
                            <input
                                type="text"
                                 {...register("sport", { required: true })}
                                className="ml-3 w-full bg-transparent outline-none"
                             
                             />
                            {/* <select
                                {...register("sport", { required: true })}
                                className="ml-3 w-full bg-transparent outline-none"
                            >
                                <option value="">Select Sport</option>
                                <option value="Football">Football</option>
                                <option value="Futsal">Futsal</option>
                                <option value="Cricket">Cricket</option>
                                <option value="Badminton">Badminton</option>
                                <option value="Basketball">Basketball</option>
                            </select> */}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Venue</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaMapMarkerAlt className="text-green-600" />
                            <input
                                type="text"
                                {...register("venue", { required: true })}
                                placeholder="Enter venue name"
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Location & Contact */}
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Location</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaMapMarkerAlt className="text-green-600" />
                            <input
                                type="text"
                                {...register("location", { required: true })}
                                placeholder="City/Address"
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Contact Details</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <FaPhoneAlt className="text-green-600" />
                            <input
                                type="text"
                                {...register("contact", { required: true })}
                                placeholder="Phone or Email"
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Price Pool & Price Per Team */}
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Prize Pool (RS.)</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <span className="text-green-600 font-bold" >Rs.</span>
                            <input
                                type="number"
                                {...register("pricePool")}
                                placeholder="Total prize pool"
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">Price Per Team (Rs. )</label>
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <span className="text-green-600 font-bold" >Rs.</span>
                            <input
                                type="number"
                                {...register("pricePerTeam")}
                                placeholder="Registration fee per team"
                                className="ml-3 w-full outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Start Date & End Date */}
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
                        placeholder="Enter tournament description..."
                        className="w-full resize-none rounded-xl border px-4 py-3 outline-none"
                    />
                </div>

                {/* Image */}
                <div className="mt-5">
                    <label className="mb-2 block font-semibold text-gray-700">Tournament Image</label>
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-8 transition hover:bg-green-100">
                        <FaImage className="mb-3 text-3xl text-green-600" />
                        <p className="text-sm text-gray-600">Click to upload tournament image</p>
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
                        <option value="">Select Status</option>
                        <option value="upcoming">upcoming</option>
                        <option value="ongoing">ongoing</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Create Tournament"}
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

export default SuperAdminAddTournament;