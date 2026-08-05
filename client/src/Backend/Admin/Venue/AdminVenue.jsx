import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaUserTie,
  FaFutbol,
} from "react-icons/fa";

function AdminVenue() {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyVenue = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5001/api/venue/my-venue", {
          withCredentials: true,
        });
        // Handles both single object or array response from backend
        const responseData = res.data.data || res.data;
        const venueData = Array.isArray(responseData) ? responseData[0] : responseData;
        setVenue(venueData);
      } catch (err) {
        console.error("Error fetching admin venue:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyVenue();
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Loading venue details...</div>;
  if (!venue)
    return (
      <div className="p-6 text-red-500 font-semibold">
        No venue assigned to your admin account.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{venue.name}</h1>
          <p className="text-xs text-gray-500 mt-1">Venue Admin Overview</p>
        </div>

        <Link
          to={`/admin/venue/edit/${venue._id}`}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm"
        >
          <FaEdit /> Edit Venue
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {venue.images && (
          <div className="relative">
            <img
              src={venue.images}
              alt={venue.name}
              className="w-full h-72 object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 shadow">
              {venue.status || "Active"}
            </div>
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price Info */}
            <div className="flex items-center gap-4 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <div className="p-3 bg-emerald-600 text-white rounded-lg">
                <FaMoneyBillWave className="text-xl" />
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                  Hourly Rate
                </p>
                <p className="text-xl font-bold text-emerald-900">
                  NRs. {venue.price}{" "}
                  <span className="text-xs font-normal text-emerald-700">/ hr</span>
                </p>
              </div>
            </div>

            {/* Location Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-3 bg-red-500 text-white rounded-lg">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Location
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {venue.location}
                </p>
              </div>
            </div>

            {/* Managed By (Populated Admin) */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-3 bg-blue-600 text-white rounded-lg">
                <FaUserTie className="text-xl" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Assigned Admin
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {typeof venue.admin === "object"
                    ? venue.admin?.fullName || venue.admin?.name || "Admin Assigned"
                    : "Admin User"}
                </p>
              </div>
            </div>

            {/* Category Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-3 bg-amber-500 text-white rounded-lg">
                <FaFutbol className="text-xl" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Category
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {typeof venue.category === "object"
                    ? venue.category?.name
                    : venue.category || "General"}
                </p>
              </div>
            </div>
          </div>

          {/* Operational Status Bar */}
          <div className="pt-4 border-t flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FaClock className="text-gray-400" />
              <span>
                Operational Status:{" "}
                <strong
                  className={
                    venue.status === "Active"
                      ? "text-emerald-600 font-semibold"
                      : "text-amber-600 font-semibold"
                  }
                >
                  {venue.status || "Active"}
                </strong>
              </span>
            </div>
            <span className="text-xs text-gray-400">
              Slug: <code className="bg-gray-100 px-2 py-0.5 rounded">{venue.slug}</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminVenue;