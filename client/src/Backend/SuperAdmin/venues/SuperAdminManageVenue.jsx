import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaMapMarkerAlt,
    FaFutbol,
    FaTags,
} from "react-icons/fa";

function SuperAdminManageVenue() {
    const [venues, setVenues] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5001/api/venue",
                { withCredentials: true }
            );
            console.log(response.data);
            setVenues(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredVenues = venues.filter((venue) => {
        const searchText = search.toLowerCase().trim();
        return (
            venue.name?.toLowerCase().includes(searchText) ||
            venue.location?.toLowerCase().includes(searchText) ||
            venue.category?.name?.toLowerCase().includes(searchText)
        );
    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5001/api/venue/${id}`,
                { withCredentials: true }
            );
            fetchVenues();
        } catch (error) {
            console.log(error);
        }
    };

    const getStatusColor = (status) => {
        if (status === "Open") {
            return "bg-green-100 text-green-700";
        }
        return "bg-red-100 text-red-700";
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Venue Management</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage all sports venues from one place.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <NavLink to="/super-admin/venue-category">
                        <button className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-white transition hover:bg-yellow-600">
                            <FaTags /> Manage Category
                        </button>
                    </NavLink>
                    <NavLink to="/super-admin/venues/add">
                        <button className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700">
                            <FaPlus /> Add Venue
                        </button>
                    </NavLink>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center rounded-xl border bg-white px-4 py-3 shadow-sm">
                <FaSearch className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search venue..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="ml-3 w-full bg-transparent outline-none"
                />
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 lg:hidden">
                {filteredVenues.length > 0 ? (
                    filteredVenues.map((venue) => (
                        <div key={venue._id} className="rounded-2xl border bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-green-100 p-3">
                                        <FaFutbol className="text-xl text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-800">{venue.name}</h2>
                                        <p className="text-sm text-gray-500">{venue.category?.name}</p>
                                    </div>
                                </div>
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(venue.status)}`}>
                                    {venue.status}
                                </span>
                            </div>
                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-green-600" />
                                    {venue.location}
                                </div>
                                <div className="font-semibold text-green-600">
                                    Rs. {venue.price}
                                </div>
                            </div>
                            <div className="mt-5 flex gap-3">
                                <NavLink to={`/super-admin/venues/edit/${venue._id}`} className="flex-1">
                                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600">
                                        <FaEdit /> Edit
                                    </button>
                                </NavLink>
                                <button
                                    onClick={() => handleDelete(venue._id)}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">
                        No venues found.
                    </div>
                )}
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md lg:block">
                <table className="min-w-full">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left">SN</th>
                            <th className="px-6 py-4 text-left">Venue</th>
                            <th className="px-6 py-4 text-left">Category</th>
                            <th className="px-6 py-4 text-left">Location</th>
                            <th className="px-6 py-4 text-left">Price</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVenues.length > 0 ? (
                            filteredVenues.map((venue, index) => (
                                <tr key={venue._id} className="border-b transition hover:bg-green-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-green-100 p-2">
                                                <FaFutbol className="text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{venue.name}</p>
                                                <p className="text-sm text-gray-500">{venue.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{venue.category?.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-green-600" />
                                            {venue.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-green-600">
                                        Rs. {venue.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(venue.status)}`}>
                                            {venue.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3">
                                            <NavLink to={`/super-admin/venues/edit/${venue._id}`}>
                                                <button className="rounded-lg bg-blue-500 p-2.5 text-white transition hover:bg-blue-600">
                                                    <FaEdit />
                                                </button>
                                            </NavLink>
                                            <button
                                                onClick={() => handleDelete(venue._id)}
                                                className="rounded-lg bg-red-500 p-2.5 text-white transition hover:bg-red-600"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-8 text-center text-gray-500">
                                    No venues found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SuperAdminManageVenue;