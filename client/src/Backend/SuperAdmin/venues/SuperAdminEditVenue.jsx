import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
    FaFutbol,
    FaMapMarkerAlt,
    FaImage,
    FaArrowLeft,
} from "react-icons/fa";


function SuperAdminEditVenue() {


    const { id } = useParams();


    const [formData, setFormData] = useState({

        name: "",
        location: "",
        sport: "",
        price: "",
        description: "",
        status: "",

    });



    const [image, setImage] = useState(null);




    // Dummy fetch (replace with API)

    useEffect(() => {


        const venue = {

            name: "Kathmandu Futsal Arena",

            location: "Baneshwor, Kathmandu",

            sport: "Futsal",

            price: "Rs. 1800/hr",

            description: "Premium futsal ground with modern facilities.",

            status: "Active",

        };


        setFormData(venue);


    }, [id]);





    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });


    };





    const handleSubmit = (e) => {


        e.preventDefault();


        console.log("Updated Venue:", formData);


        // API update later


    };





    return (

        <div className="space-y-6 p-4 md:p-6">


            {/* Header */}


            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                <div>


                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                        Edit Venue
                    </h1>


                    <p className="mt-1 text-sm text-gray-500">
                        Update venue information.
                    </p>


                </div>





                <NavLink to="/super-admin/venues">


                    <button className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white">


                        <FaArrowLeft />


                        Back


                    </button>


                </NavLink>


            </div>
                        {/* Form */}


            <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-md md:p-8">


                {/* Venue Name */}


                <div className="mb-5">


                    <label className="mb-2 block font-semibold text-gray-700">
                        Venue Name
                    </label>



                    <div className="flex items-center rounded-xl border px-4 py-3">


                        <FaFutbol className="text-green-600" />


                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="ml-3 w-full outline-none"
                        />


                    </div>


                </div>





                {/* Location + Sport */}


                <div className="grid gap-5 md:grid-cols-2">


                    {/* Location */}


                    <div>


                        <label className="mb-2 block font-semibold text-gray-700">
                            Location
                        </label>



                        <div className="flex items-center rounded-xl border px-4 py-3">


                            <FaMapMarkerAlt className="text-green-600" />


                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="ml-3 w-full outline-none"
                            />


                        </div>


                    </div>





                    {/* Sport */}


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


                            <option>
                                Football
                            </option>


                            <option>
                                Futsal
                            </option>


                            <option>
                                Cricket
                            </option>


                            <option>
                                Badminton
                            </option>


                            <option>
                                Basketball
                            </option>


                        </select>


                    </div>


                </div>





                {/* Price */}


                <div className="mt-5">


                    <label className="mb-2 block font-semibold text-gray-700">
                        Price Per Hour
                    </label>



                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full rounded-xl border px-4 py-3 outline-none"
                    />


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
                        Update Venue Image
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


                        <option>
                            Active
                        </option>


                        <option>
                            Pending
                        </option>


                        <option>
                            Blocked
                        </option>


                    </select>


                </div>





                {/* Buttons */}


                <div className="mt-8 flex flex-col gap-3 sm:flex-row">


                    <button
                        type="submit"
                        className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                    >

                        Update Venue

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