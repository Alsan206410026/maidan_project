import React, { useState } from "react";
import {
  FaUpload,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMoneyBillWave,
  FaSave,
} from "react-icons/fa";

function AdminVenue() {
  const [coverImage, setCoverImage] = useState(null);

  const [galleryImages, setGalleryImages] = useState([]);

  const [venue, setVenue] = useState({
    venueName: "",
    bio: "",
    address: "",
    googleMap: "",
    phone: "",
    email: "",
    openingTime: "",
    closingTime: "",
    pricePerHour: "",

    facilities: {
      parking: false,
      washroom: false,
      changingRoom: false,
      floodLights: false,
      drinkingWater: false,
      cafeteria: false,
      equipmentRental: false,
      firstAid: false,
      cctv: false,
      wifi: false,
    },

    cancellationPolicy: "Free Cancellation",

    bookingRules: "",

    refundPolicy: "",

    termsConditions: "",

    additionalInformation: "",
  });

  const handleChange = (e) => {
    setVenue({
      ...venue,
      [e.target.name]: e.target.value,
    });
  };

  const handleFacility = (e) => {
    setVenue({
      ...venue,
      facilities: {
        ...venue.facilities,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleCoverImage = (e) => {
    if (e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);

    const preview = files.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryImages(preview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(venue);

    alert("Venue Updated Successfully");
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Venue
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your futsal venue information,
          gallery and policies.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Cover Image */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-semibold">
            Cover Image
          </h2>

          <div className="flex flex-col items-center">

            {coverImage ? (

              <img
                src={coverImage}
                alt=""
                className="h-64 w-full rounded-xl object-cover"
              />

            ) : (

              <div className="flex h-64 w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-100">

                <div className="text-center">

                  <FaUpload className="mx-auto text-5xl text-gray-400" />

                  <p className="mt-3 text-gray-500">
                    Upload Cover Image
                  </p>

                </div>

              </div>

            )}

            <label className="mt-5 cursor-pointer rounded-lg bg-green-600 px-5 py-3 text-white transition hover:bg-green-700">

              Change Cover Photo

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleCoverImage}
              />

            </label>

          </div>

        </div>

        {/* Basic Information */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-6 text-xl font-semibold">
            Venue Information
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Venue Name
              </label>

              <input
                type="text"
                name="venueName"
                value={venue.venueName}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Phone Number
              </label>

              <div className="relative">

                <FaPhone className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="phone"
                  value={venue.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border py-3 pl-11 pr-3"
                />

              </div>

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block font-medium">
                Venue Bio
              </label>

              <textarea
                rows="4"
                name="bio"
                value={venue.bio}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />

            </div>
                        {/* Address */}

            <div>

              <label className="mb-2 block font-medium">
                Address
              </label>

              <div className="relative">

                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="address"
                  value={venue.address}
                  onChange={handleChange}
                  placeholder="Enter venue address"
                  className="w-full rounded-lg border py-3 pl-11 pr-3 focus:border-green-500 focus:outline-none"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block font-medium">
                Email
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={venue.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full rounded-lg border py-3 pl-11 pr-3 focus:border-green-500 focus:outline-none"
                />

              </div>

            </div>

            {/* Google Map */}

            

              

              

            

            {/* Opening Time */}

            

            {/* Closing Time */}

            

            {/* Price */}

            <div>

              <label className="mb-2 block font-medium">
                Price Per Hour (Rs.)
              </label>

              <div className="relative">

                <FaMoneyBillWave className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="number"
                  name="pricePerHour"
                  value={venue.pricePerHour}
                  onChange={handleChange}
                  placeholder="1200"
                  className="w-full rounded-lg border py-3 pl-11 pr-3 focus:border-green-500 focus:outline-none"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ================= FACILITIES ================= */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-6 text-xl font-semibold">
            Venue Facilities
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="parking"
                checked={venue.facilities.parking}
                onChange={handleFacility}
              />
              Parking
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="washroom"
                checked={venue.facilities.washroom}
                onChange={handleFacility}
              />
              Washroom
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="changingRoom"
                checked={venue.facilities.changingRoom}
                onChange={handleFacility}
              />
              Changing Room
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="floodLights"
                checked={venue.facilities.floodLights}
                onChange={handleFacility}
              />
              Flood Lights
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="drinkingWater"
                checked={venue.facilities.drinkingWater}
                onChange={handleFacility}
              />
              Drinking Water
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="cafeteria"
                checked={venue.facilities.cafeteria}
                onChange={handleFacility}
              />
              Cafeteria
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="equipmentRental"
                checked={venue.facilities.equipmentRental}
                onChange={handleFacility}
              />
              Equipment Rental
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="firstAid"
                checked={venue.facilities.firstAid}
                onChange={handleFacility}
              />
              First Aid
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="cctv"
                checked={venue.facilities.cctv}
                onChange={handleFacility}
              />
              CCTV
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="wifi"
                checked={venue.facilities.wifi}
                onChange={handleFacility}
              />
              WiFi
            </label>

          </div>

        </div>
                {/* ================= GALLERY ================= */}

        
        {/* ================= POLICIES ================= */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-6 text-xl font-semibold">
            Venue Policies
          </h2>

          <div className="space-y-6">

            {/* Cancellation Policy */}

            <div>

              <label className="mb-2 block font-medium">
                Cancellation Policy
              </label>

              <select
                name="cancellationPolicy"
                value={venue.cancellationPolicy}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 focus:border-green-500 focus:outline-none"
              >
                <option>Free Cancellation</option>
                <option>50% Refund</option>
                <option>No Refund</option>
              </select>

            </div>

            {/* Booking Rules */}

            <div>

              <label className="mb-2 block font-medium">
                Booking Rules
              </label>

              <textarea
                rows="4"
                name="bookingRules"
                value={venue.bookingRules}
                onChange={handleChange}
                placeholder="Enter venue rules..."
                className="w-full rounded-lg border p-3 focus:border-green-500 focus:outline-none"
              />

            </div>

            {/* Refund Policy */}

            <div>

              <label className="mb-2 block font-medium">
                Refund Policy
              </label>

              <textarea
                rows="4"
                name="refundPolicy"
                value={venue.refundPolicy}
                onChange={handleChange}
                placeholder="Describe your refund policy..."
                className="w-full rounded-lg border p-3 focus:border-green-500 focus:outline-none"
              />

            </div>

            {/* Terms & Conditions */}

            <div>

              <label className="mb-2 block font-medium">
                Terms & Conditions
              </label>

              <textarea
                rows="4"
                name="termsConditions"
                value={venue.termsConditions}
                onChange={handleChange}
                placeholder="Enter terms & conditions..."
                className="w-full rounded-lg border p-3 focus:border-green-500 focus:outline-none"
              />

            </div>

            {/* Additional Information */}

            <div>

              <label className="mb-2 block font-medium">
                Additional Information
              </label>

              <textarea
                rows="4"
                name="additionalInformation"
                value={venue.additionalInformation}
                onChange={handleChange}
                placeholder="Any additional information about your venue..."
                className="w-full rounded-lg border p-3 focus:border-green-500 focus:outline-none"
              />

            </div>

          </div>

        </div>
                {/* ================= SAVE BUTTON ================= */}

        <div className="flex justify-end">

          <button
            type="submit"
            className="flex items-center gap-3 rounded-lg bg-green-600 px-8 py-3 text-lg font-semibold text-white shadow transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
          >
            <FaSave />

            Save Venue Details
          </button>

        </div>

      </form>

    </div>
  );
}

export default AdminVenue;