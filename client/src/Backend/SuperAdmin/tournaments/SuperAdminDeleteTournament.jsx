import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaTrash, FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

function SuperAdminDeleteTournament() {

    const { id } = useParams();

    const [tournament, setTournament] = useState(null);


    useEffect(() => {

        const data = {
            name: "Kathmandu Futsal Cup 2026",
            sport: "Futsal",
            venue: "Kathmandu Futsal Arena",
            date: "15 Aug 2026",
            status: "Upcoming",
        };

        setTournament(data);

    }, [id]);



    const handleDelete = () => {

        console.log("Delete tournament:", id);

        // DELETE API later

    };



    if (!tournament) {

        return (
            <div className="p-6 text-center text-gray-500">
                Loading tournament...
            </div>
        );

    }



    return (

        <div className="min-h-screen space-y-6 p-4 md:p-6">


            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                <div>

                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                        Delete Tournament
                    </h1>


                    <p className="mt-1 text-sm text-gray-500">
                        Remove tournament permanently from system.
                    </p>

                </div>



                <NavLink to="/super-admin/tournaments">

                    <button className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white">

                        <FaArrowLeft />

                        Back

                    </button>

                </NavLink>


            </div>
                        {/* Warning */}

            <div className="flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-5">

                <FaExclamationTriangle className="mt-1 text-2xl text-red-600" />


                <div>

                    <h2 className="font-bold text-red-700">
                        Warning!
                    </h2>


                    <p className="mt-1 text-sm text-red-600">
                        This action cannot be undone. The tournament will be permanently removed.
                    </p>

                </div>

            </div>




            {/* Tournament Card */}

            <div className="rounded-2xl bg-white p-5 shadow-md md:p-8">


                <div className="flex items-center gap-4 border-b pb-5">


                    <div className="rounded-xl bg-green-100 p-4">

                        <FaTrophy className="text-3xl text-green-600" />

                    </div>



                    <div>

                        <h2 className="text-xl font-bold text-gray-800">
                            {tournament.name}
                        </h2>


                        <p className="text-gray-500">
                            {tournament.sport}
                        </p>

                    </div>


                </div>





                {/* Tournament Details */}

                <div className="mt-6 grid gap-4 md:grid-cols-3">


                    {/* Venue */}

                    <div className="rounded-xl bg-gray-50 p-4">


                        <div className="flex items-center gap-2 text-gray-600">

                            <FaMapMarkerAlt className="text-green-600" />

                            <span className="font-semibold">
                                Venue
                            </span>

                        </div>


                        <p className="mt-2 text-gray-800">
                            {tournament.venue}
                        </p>


                    </div>





                    {/* Date */}

                    <div className="rounded-xl bg-gray-50 p-4">


                        <div className="flex items-center gap-2 text-gray-600">

                            <FaCalendarAlt className="text-green-600" />

                            <span className="font-semibold">
                                Date
                            </span>

                        </div>


                        <p className="mt-2 text-gray-800">
                            {tournament.date}
                        </p>


                    </div>





                    {/* Status */}

                    <div className="rounded-xl bg-gray-50 p-4">


                        <p className="font-semibold text-gray-600">
                            Status
                        </p>


                        <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                            {tournament.status}
                        </span>


                    </div>


                </div>
                                {/* Action Buttons */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">


                    <button
                        onClick={handleDelete}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                    >

                        <FaTrash />

                        Delete Tournament

                    </button>




                    <NavLink to="/super-admin/tournaments" className="flex-1">

                        <button
                            className="w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                        >

                            Cancel

                        </button>

                    </NavLink>


                </div>


            </div>


        </div>

    );

}


export default SuperAdminDeleteTournament;