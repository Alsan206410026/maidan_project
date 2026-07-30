import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaMapMarkerAlt,
    FaFutbol,
} from "react-icons/fa";


function SuperAdminManageVenue() {


    const venues = [
        {
            _id: "1",
            name: "Kathmandu Futsal Arena",
            location: "Baneshwor, Kathmandu",
            sport: "Futsal",
            price: "Rs. 1800/hr",
            status: "Active",
        },
        {
            _id: "2",
            name: "Pokhara Football Ground",
            location: "Lakeside, Pokhara",
            sport: "Football",
            price: "Rs. 2500/hr",
            status: "Pending",
        },
        {
            _id: "3",
            name: "Lalitpur Badminton Center",
            location: "Jawalakhel, Lalitpur",
            sport: "Badminton",
            price: "Rs. 600/hr",
            status: "Blocked",
        },
        {
            _id: "4",
            name: "Bhaktapur Cricket Ground",
            location: "Bhaktapur",
            sport: "Cricket",
            price: "Rs. 3000/hr",
            status: "Active",
        },
    ];



    const getStatusColor = (status) => {

        if (status === "Active") {
            return "bg-green-100 text-green-700";
        }

        if (status === "Blocked") {
            return "bg-red-100 text-red-700";
        }

        return "bg-yellow-100 text-yellow-700";

    };



    return (

        <div className="space-y-6 p-4 md:p-6">


            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">


                <div>

                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                        Venue Management
                    </h1>


                    <p className="mt-1 text-sm text-gray-500">
                        Manage all sports venues from one place.
                    </p>

                </div>



                <NavLink to="/super-admin/venues/add">

                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 lg:w-auto">

                        <FaPlus />

                        Add Venue

                    </button>

                </NavLink>


            </div>




            {/* Search */}

            <div className="flex items-center rounded-xl border bg-white px-4 py-3 shadow-sm">

                <FaSearch className="text-gray-400" />

                <input
                    type="text"
                    placeholder="Search venues..."
                    className="ml-3 w-full bg-transparent outline-none"
                />

            </div>
                        {/* Mobile Card View */}

            <div className="space-y-4 lg:hidden">

                {venues.map((venue) => (

                    <div key={venue._id} className="rounded-2xl border bg-white p-4 shadow-sm">


                        <div className="flex items-start justify-between">


                            <div className="flex items-center gap-3">


                                <div className="rounded-xl bg-green-100 p-3">

                                    <FaFutbol className="text-xl text-green-600" />

                                </div>


                                <div>

                                    <h2 className="font-semibold text-gray-800">
                                        {venue.name}
                                    </h2>


                                    <p className="text-sm text-gray-500">
                                        {venue.sport}
                                    </p>


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



                            <div className="flex items-center gap-2">

                                <span className="font-semibold text-green-600">
                                    {venue.price}
                                </span>

                            </div>


                        </div>




                        <div className="mt-5 flex gap-3">


                            <NavLink to={`/super-admin/venues/edit/${venue._id}`} className="flex-1">

                                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600">

                                    <FaEdit />

                                    Edit

                                </button>


                            </NavLink>




                            <NavLink to={`/super-admin/venues/delete/${venue._id}`} className="flex-1">


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
                                Venue
                            </th>


                            <th className="px-6 py-4 text-left">
                                Location
                            </th>


                            <th className="px-6 py-4 text-left">
                                Sport
                            </th>


                            <th className="px-6 py-4 text-left">
                                Price
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


                        {venues.map((venue, index) => (

                            <tr key={venue._id} className="border-b transition hover:bg-green-50">


                                <td className="px-6 py-4">

                                    {index + 1}

                                </td>
                                                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">


                                        <div className="rounded-lg bg-green-100 p-2">

                                            <FaFutbol className="text-green-600" />

                                        </div>



                                        <div>

                                            <p className="font-semibold text-gray-800">
                                                {venue.name}
                                            </p>


                                            <p className="text-sm text-gray-500">
                                                {venue.sport}
                                            </p>


                                        </div>


                                    </div>


                                </td>




                                <td className="px-6 py-4">


                                    <div className="flex items-center gap-2">


                                        <FaMapMarkerAlt className="text-green-600" />


                                        {venue.location}


                                    </div>


                                </td>




                                <td className="px-6 py-4">

                                    {venue.sport}

                                </td>




                                <td className="px-6 py-4 font-semibold text-green-600">

                                    {venue.price}

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




                                        <NavLink to={`/super-admin/venues/delete/${venue._id}`}>

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


export default SuperAdminManageVenue;