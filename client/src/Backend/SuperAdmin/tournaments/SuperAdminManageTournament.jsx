import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaTrophy,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaTags,
} from "react-icons/fa";

function SuperAdminManageTournament() {
    const [tournaments, setTournaments] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchTournaments();
    }, []);

    const fetchTournaments = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5001/api/tournament",
                { withCredentials: true }
            );
            console.log(response.data);
            setTournaments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredTournaments = tournaments.filter((tournament) => {
        const searchText = search.toLowerCase().trim();
        return (
            tournament.name?.toLowerCase().includes(searchText) ||
            tournament.location?.toLowerCase().includes(searchText) ||
            tournament.category?.name?.toLowerCase().includes(searchText)
        );
    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tournament?");
        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5001/api/tournament/${id}`,
                { withCredentials: true }
            );
            fetchTournaments();
        } catch (error) {
            console.log(error);
        }
    };

    const getStatusColor = (status) => {
        if (status === "Upcoming") {
            return "bg-green-100 text-green-700";
        }
        
        return "bg-yellow-100 text-red-700";
        
        
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Tournament Management</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage all sports tournaments from one place.</p>
                </div>
                
                   
                   
                    <NavLink to="/super-admin/tournaments/add">
                        <button className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700">
                            <FaPlus /> Add Tournament
                        </button>
                    </NavLink>
                
            </div>

            {/* Search */}
            <div className="flex items-center rounded-xl border bg-white px-4 py-3 shadow-sm">
                <FaSearch className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search tournament..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="ml-3 w-full bg-transparent outline-none"
                />
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 lg:hidden">
                {filteredTournaments.length > 0 ? (
                    filteredTournaments.map((tournament) => (
                        <div key={tournament._id} className="rounded-2xl border bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-green-100 p-3">
                                        <FaTrophy className="text-xl text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-800">{tournament.name}</h2>
                                        <p className="text-sm text-gray-500">{tournament.category?.name}</p>
                                    </div>
                                </div>
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(tournament.status)}`}>
                                    {tournament.status}
                                </span>
                            </div>
                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-green-600" />
                                    {tournament.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-green-600" />
                                    {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : 'N/A'}
                                </div>
                                <div className="font-semibold text-green-600">
                                    Entry Fee: Rs. {tournament.entryFee || tournament.price}
                                </div>
                            </div>
                            <div className="mt-5 flex gap-3">
                                <NavLink to={`/super-admin/tournaments/edit/${tournament._id}`} className="flex-1">
                                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600">
                                        <FaEdit /> Edit
                                    </button>
                                </NavLink>
                                <button
                                    onClick={() => handleDelete(tournament._id)}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">
                        No tournaments found.
                    </div>
                )}
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md lg:block">
                <table className="min-w-full">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left">SN</th>
                            <th className="px-6 py-4 text-left">Tournament</th>
                            <th className="px-6 py-4 text-left">Category</th>
                            <th className="px-6 py-4 text-left">Location</th>
                            <th className="px-6 py-4 text-left">Entry Fee</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTournaments.length > 0 ? (
                            filteredTournaments.map((tournament, index) => (
                                <tr key={tournament._id} className="border-b transition hover:bg-green-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-green-100 p-2">
                                                <FaTrophy className="text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{tournament.name}</p>
                                                <p className="text-sm text-gray-500">{tournament.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{tournament.category?.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-green-600" />
                                            {tournament.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-green-600">
                                        Rs. {tournament.entryFee || tournament.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(tournament.status)}`}>
                                            {tournament.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3">
                                            <NavLink to={`/super-admin/tournaments/edit/${tournament._id}`}>
                                                <button className="rounded-lg bg-blue-500 p-2.5 text-white transition hover:bg-blue-600">
                                                    <FaEdit />
                                                </button>
                                            </NavLink>
                                            <button
                                                onClick={() => handleDelete(tournament._id)}
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
                                    No tournaments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SuperAdminManageTournament;