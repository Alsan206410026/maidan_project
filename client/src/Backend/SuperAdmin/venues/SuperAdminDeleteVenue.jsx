import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
    FaTrash,
    FaFutbol,
    FaMapMarkerAlt,
    FaArrowLeft,
    FaExclamationTriangle,
} from "react-icons/fa";

function SuperAdminDeleteVenue() {

    const { id } = useParams();

    const [venue, setVenue] = useState(null);


    useEffect(() => {

        const data = {
            name: "Kathmandu Futsal Arena",
            location: "Baneshwor, Kathmandu",
            sport: "Futsal",
            price: "Rs. 1800/hr",
            status: "Active",
        };

        setVenue(data);

    }, [id]);



    const handleDelete = () => {

        console.log("Delete Venue:", id);

        // DELETE API later

    };



    if (!venue) {

        return (
            <div className="p-6 text-center text-gray-500">
                Loading venue...
            </div>
        );

    }



    return (

        <div className="space-y-6 p-4 md:p-6">


            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                        Delete Venue
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Remove venue permanently from system.
                    </p>

                </div>



                <NavLink to="/super-admin/venues">

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
                        This action cannot be undone. The venue will be permanently removed.
                    </p>

                </div>


            </div>




            {/* Venue Card */}


            <div className="rounded-2xl bg-white p-5 shadow-md md:p-8">


                <div className="flex items-center gap-4 border-b pb-5">


                    <div className="rounded-xl bg-green-100 p-4">

                        <FaFutbol className="text-3xl text-green-600" />

                    </div>



                    <div>

                        <h2 className="text-xl font-bold text-gray-800">
                            {venue.name}
                        </h2>

                        <p className="text-gray-500">
                            {venue.sport}
                        </p>

                    </div>


                </div>





                {/* Venue Details */}


                <div className="mt-6 grid gap-4 md:grid-cols-3">


                    <div className="rounded-xl bg-gray-50 p-4">

                        <div className="flex items-center gap-2 text-gray-600">

                            <FaMapMarkerAlt className="text-green-600" />

                            <span className="font-semibold">
                                Location
                            </span>

                        </div>


                        <p className="mt-2 text-gray-800">
                            {venue.location}
                        </p>


                    </div>




                    <div className="rounded-xl bg-gray-50 p-4">


                        <p className="font-semibold text-gray-600">
                            Price
                        </p>


                        <p className="mt-2 font-semibold text-green-600">
                            {venue.price}
                        </p>


                    </div>




                    <div className="rounded-xl bg-gray-50 p-4">


                        <p className="font-semibold text-gray-600">
                            Status
                        </p>


                        <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                            {venue.status}

                        </span>


                    </div>


                </div>





                {/* Buttons */}


                <div className="mt-8 flex flex-col gap-3 sm:flex-row">


                    <button
                        onClick={handleDelete}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                    >

                        <FaTrash />

                        Delete Venue

                    </button>




                    <NavLink to="/super-admin/venues" className="flex-1">

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

export default SuperAdminDeleteVenue;