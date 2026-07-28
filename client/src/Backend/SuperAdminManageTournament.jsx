import React from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTrophy,
} from "react-icons/fa";

function SuperAdminManageTournament() {
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Tournaments
          </h1>
          <p className="mt-1 text-gray-500">
            View, manage and organize all tournaments.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700">
          <FaPlus />
          Add Tournament
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search tournaments..."
          className="ml-3 w-full outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-md">
        <table className="min-w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">SN</th>
              <th className="px-6 py-4 text-left">Tournament</th>
              <th className="px-6 py-4 text-left">Sport</th>
              <th className="px-6 py-4 text-left">Venue</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tournaments.map((tournament, index) => (
              <tr
                key={tournament._id}
                className="border-b transition hover:bg-gray-50"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-500" />
                    <span className="font-medium">{tournament.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4">{tournament.sport}</td>

                <td className="px-6 py-4">{tournament.venue}</td>

                <td className="px-6 py-4">{tournament.date}</td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      tournament.status === "Upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : tournament.status === "Ongoing"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {tournament.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                      title="Edit Tournament"
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                      title="Delete Tournament"
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

export default SuperAdminManageTournament;