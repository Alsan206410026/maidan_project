import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";

function BookVenue() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/venue", {
        withCredentials: true,
      });
      setVenues(response.data?.data || response.data || []);
    } catch (err) {
      console.error("Failed to fetch venues:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-gray-500">Loading venues...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Venues</h1>
        <p className="text-sm text-gray-500">Choose a venue to check available time slots and place your booking.</p>
      </div>

      {venues.length === 0 ? (
        <p className="text-gray-500">No venues available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <div
              key={venue._id}
              className="flex flex-col justify-between rounded-xl bg-white border border-gray-100 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Image directly rendered from backend response */}
                <div className="h-48 w-full rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={venue.images}
                    alt={venue.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-800">{venue.name}</h2>
                <p className="text-xs text-gray-500">{venue.description}</p>
                <p className="flex items-center gap-1.5 text-sm text-gray-500">
                  <FaMapMarkerAlt className="text-red-500" /> {venue.location}
                </p>
                <p className="text-lg font-bold text-green-600">
                  Rs. {venue.price} <span className="text-xs font-normal text-gray-500">/ hour</span>
                </p>
              </div>

              <button
                onClick={() => navigate(`/booking/${venue._id}`)}
                className="mt-5 w-full rounded-lg bg-green-600 py-2.5 font-semibold text-white transition hover:bg-green-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookVenue;