import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaImage, FaArrowLeft } from "react-icons/fa";

function SuperAdminEditTournament() {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        sport: "",
        venue: "",
        tournamentDate: "",
        registrationDeadline: "",
        description: "",
        status: "",
    });

    const [image, setImage] = useState(null);


    useEffect(() => {

        const tournament = {
            name: "Kathmandu Futsal Cup 2026",
            sport: "Futsal",
            venue: "Kathmandu Futsal Arena",
            tournamentDate: "2026-08-15",
            registrationDeadline: "2026-08-10",
            description: "National level futsal tournament.",
            status: "Upcoming",
        };

        setFormData(tournament);

    }, [id]);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("Updated Tournament:", formData);

        // API update later

    };


    return (
        <div className="space-y-6 p-4 md:p-6">

            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                        Edit Tournament
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Update tournament information.
                    </p>
                </div>


                <NavLink to="/super-admin/tournaments">

                    <button className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white">
                        <FaArrowLeft />
                        Back
                    </button>

                </NavLink>

            </div>



            {/* Form */}

            <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-md md:p-8">


                {/* Tournament Name */}

                <div className="mb-5">

                    <label className="mb-2 block font-semibold text-gray-700">
                        Tournament Name
                    </label>


                    <div className="flex items-center rounded-xl border px-4 py-3">

                        <FaTrophy className="text-green-600" />

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="ml-3 w-full outline-none"
                        />

                    </div>

                </div>
                {/* Sport and Venue */}

                <div className="grid gap-5 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Sport Type
                        </label>


                        <select
                            name="sport"
                            value={formData.sport}
                            onChange={handleChange}
                            className="w-full rounded-xl border px-4 py-3 outline-none"
                        >

                            <option>Football</option>
                            <option>Futsal</option>
                            <option>Cricket</option>
                            <option>Badminton</option>
                            <option>Basketball</option>

                        </select>

                    </div>



                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Venue
                        </label>


                        <div className="flex items-center rounded-xl border px-4 py-3">

                            <FaMapMarkerAlt className="text-green-600" />

                            <input
                                type="text"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                className="ml-3 w-full outline-none"
                            />

                        </div>

                    </div>

                </div>



                {/* Dates */}

                <div className="mt-5 grid gap-5 md:grid-cols-2">


                    {/* Tournament Date */}

                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Tournament Date
                        </label>


                        <div className="flex items-center rounded-xl border px-4 py-3">

                            <FaCalendarAlt className="text-green-600" />

                            <input
                                type="date"
                                name="tournamentDate"
                                value={formData.tournamentDate}
                                onChange={handleChange}
                                className="ml-3 w-full outline-none"
                            />

                        </div>

                    </div>



                    {/* Registration Deadline */}

                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Registration Deadline
                        </label>


                        <div className="flex items-center rounded-xl border px-4 py-3">

                            <FaCalendarAlt className="text-green-600" />

                            <input
                                type="date"
                                name="registrationDeadline"
                                value={formData.registrationDeadline}
                                onChange={handleChange}
                                className="ml-3 w-full outline-none"
                            />

                        </div>

                    </div>

                </div>




                {/* Description */}

                <div className="mt-5">

                    <label className="mb-2 block font-semibold text-gray-700">
                        Description
                    </label>


                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full resize-none rounded-xl border px-4 py-3 outline-none"
                    />

                </div>
                {/* Image Update */}

                <div className="mt-5">

                    <label className="mb-2 block font-semibold text-gray-700">
                        Update Tournament Image
                    </label>


                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-8 transition hover:bg-green-100">

                        <FaImage className="mb-3 text-3xl text-green-600" />

                        <p className="text-sm text-gray-600">
                            Choose new image (optional)
                        </p>


                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                    </label>


                    {image && (
                        <p className="mt-2 text-sm text-green-600">
                            Selected: {image.name}
                        </p>
                    )}

                </div>




                {/* Status */}

                <div className="mt-5">

                    <label className="mb-2 block font-semibold text-gray-700">
                        Status
                    </label>


                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-xl border px-4 py-3 outline-none"
                    >

                        <option>Upcoming</option>
                        <option>Ongoing</option>
                        <option>Completed</option>
                        <option>Cancelled</option>

                    </select>

                </div>


                {/* Buttons */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                    <button
                        type="submit"
                        className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        Update Tournament
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