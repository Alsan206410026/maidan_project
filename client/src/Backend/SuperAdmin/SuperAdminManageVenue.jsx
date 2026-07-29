import React from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Venues
          </h1>
          <p className="mt-1 text-gray-500">
            View, edit and manage all sports venues.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700">
          <FaPlus />
          Add Venue
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search venues..."
          className="ml-3 w-full outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-md">
        <table className="min-w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">SN</th>
              <th className="px-6 py-4 text-left">Venue Name</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Sport</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {venues.map((venue, index) => (
              <tr
                key={venue._id}
                className="border-b transition hover:bg-gray-50"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4 font-medium">
                  {venue.name}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    {venue.location}
                  </div>
                </td>

                <td className="px-6 py-4">{venue.sport}</td>

                <td className="px-6 py-4 font-semibold text-green-600">
                  {venue.price}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      venue.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : venue.status === "Blocked"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {venue.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                      title="Edit Venue"
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                      title="Delete Venue"
                    >
                      <FaTrash />
                    </button>
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