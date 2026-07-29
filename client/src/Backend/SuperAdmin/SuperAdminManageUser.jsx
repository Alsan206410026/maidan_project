import React from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

function SuperAdminManageUser() {
  const users = [
    {
      _id: "68a7c3f4a1b9e2d8f7c12345",
      name: "John Doe",
      email: "john@example.com",
      phone: "+977 9812345678",
      role: "User",
      status: "Active",
    },
    {
      _id: "68a7c4b8a1b9e2d8f7c12346",
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "+977 9800000000",
      role: "Venue Owner",
      status: "Blocked",
    },
    {
      _id: "68a7c5d2a1b9e2d8f7c12347",
      name: "Michael Johnson",
      email: "michael@example.com",
      phone: "+977 9841234567",
      role: "Admin",
      status: "Active",
    },
    {
      _id: "68a7c6e5a1b9e2d8f7c12348",
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+977 9865432109",
      role: "User",
      status: "Pending",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Users
          </h1>
          <p className="mt-1 text-gray-500">
            Manage all registered users in the system.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700">
          <FaPlus />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search users..."
          className="ml-3 w-full outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-md">
        <table className="min-w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">SN</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b transition hover:bg-gray-50"
              >
                {/* Serial Number */}
                <td className="px-6 py-4 font-medium">
                  {index + 1}
                </td>

                {/* Name */}
                <td className="px-6 py-4 font-medium">
                  {user.name}
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  {user.email}
                </td>

                {/* Phone */}
                <td className="px-6 py-4">
                  {user.phone}
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  {user.role}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : user.status === "Blocked"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                      title="Edit User"
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                      title="Delete User"
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

export default SuperAdminManageUser;