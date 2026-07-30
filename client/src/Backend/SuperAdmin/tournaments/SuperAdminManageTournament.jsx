import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTrophy, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function SuperAdminTournament() {

    const tournaments = [
        {
            _id: "1",
            name: "Kathmandu Futsal Cup 2026",
            sport: "Futsal",
            venue: "Kathmandu Futsal Arena",
            date: "15 Aug 2026",
            status: "Upcoming",
        },
        {
            _id: "2",
            name: "Pokhara Football League",
            sport: "Football",
            venue: "Pokhara Stadium",
            date: "25 Aug 2026",
            status: "Ongoing",
        },
        {
            _id: "3",
            name: "Lalitpur Badminton Open",
            sport: "Badminton",
            venue: "Lalitpur Sports Center",
            date: "05 Sep 2026",
            status: "Completed",
        },
        {
            _id: "4",
            name: "Nepal Cricket Championship",
            sport: "Cricket",
            venue: "TU Cricket Ground",
            date: "20 Sep 2026",
            status: "Upcoming",
        },
    ];


    const getStatusColor = (status) => {

        if (status === "Upcoming") {
            return "bg-blue-100 text-blue-700";
        }

        if (status === "Ongoing") {
            return "bg-green-100 text-green-700";
        }

        return "bg-gray-200 text-gray-700";

    };


    return (

        <div className="space-y-6 p-4 md:p-6">


            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                        Tournament Management
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage all tournaments from one place.
                    </p>

                </div>


                <NavLink to="/super-admin/tournaments/add">

                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 lg:w-auto">

                        <FaPlus />

                        Add Tournament

                    </button>

                </NavLink>


            </div>



            {/* Search */}

            <div className="flex items-center rounded-xl border bg-white px-4 py-3 shadow-sm">

                <FaSearch className="text-gray-400" />

                <input
                    type="text"
                    placeholder="Search tournaments..."
                    className="ml-3 w-full bg-transparent outline-none"
                />

            </div>
                        {/* Mobile Card View */}

            <div className="space-y-4 lg:hidden">

                {tournaments.map((tournament) => (

                    <div key={tournament._id} className="rounded-2xl border bg-white p-4 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-green-100 p-3">

                                    <FaTrophy className="text-xl text-green-600" />

                                </div>


                                <div>

                                    <h2 className="font-semibold text-gray-800">
                                        {tournament.name}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {tournament.sport}
                                    </p>

                                </div>

                            </div>


                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(tournament.status)}`}>
                                {tournament.status}
                            </span>

                        </div>



                        <div className="mt-4 space-y-2 text-sm text-gray-600">

                            <div className="flex items-center gap-2">

                                <FaMapMarkerAlt className="text-green-600" />

                                {tournament.venue}

                            </div>


                            <div className="flex items-center gap-2">

                                <FaCalendarAlt className="text-green-600" />

                                {tournament.date}

                            </div>

                        </div>



                        <div className="mt-5 flex gap-3">

                            <NavLink to={`/super-admin/tournaments/edit/${tournament._id}`} className="flex-1">

                                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600">

                                    <FaEdit />

                                    Edit

                                </button>

                            </NavLink>


                            <NavLink to={`/super-admin/tournaments/delete/${tournament._id}`} className="flex-1">

                                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600">

                                    <FaTrash />

                                    Delete

                                </button>

                            </NavLink>

                        </div>


                    </div>

                ))}

            </div>




            {/* Desktop Table */}

            <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md lg:block">

                <table className="min-w-full">

                    <thead className="bg-green-600 text-white">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                SN
                            </th>

                            <th className="px-6 py-4 text-left">
                                Tournament
                            </th>

                            <th className="px-6 py-4 text-left">
                                Sport
                            </th>

                            <th className="px-6 py-4 text-left">
                                Venue
                            </th>

                            <th className="px-6 py-4 text-left">
                                Date
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {tournaments.map((tournament, index) => (

                            <tr key={tournament._id} className="border-b transition hover:bg-green-50">

                                <td className="px-6 py-4">
                                    {index + 1}
                                </td>


                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="rounded-lg bg-green-100 p-2">

                                            <FaTrophy className="text-green-600" />

                                        </div>


                                        <div>

                                            <p className="font-semibold text-gray-800">
                                                {tournament.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {tournament.sport}
                                            </p>

                                        </div>

                                    </div>

                                </td>
                                                                <td className="px-6 py-4">
                                    {tournament.sport}
                                </td>


                                <td className="px-6 py-4">
                                    {tournament.venue}
                                </td>


                                <td className="px-6 py-4">
                                    {tournament.date}
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



                                        <NavLink to={`/super-admin/tournaments/delete/${tournament._id}`}>

                                            <button className="rounded-lg bg-red-500 p-2.5 text-white transition hover:bg-red-600">

                                                <FaTrash />

                                            </button>

                                        </NavLink>


                                    </div>

                                </td>


                            </tr>

                        ))}


                    </tbody>


                </table>


            </div>


        </div>

    );

}


export default SuperAdminTournament;