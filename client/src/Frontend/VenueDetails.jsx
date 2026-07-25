import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../FrontendLayout/Layout";

function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/api/venue/${id}`);
        setVenue(response.data);
      } catch (err) {
        console.log(err);
        setError("Venue not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVenue();
    }
  }, [id]);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          to="/venues"
          className="mb-6 inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800"
        >
          ← Back to venues
        </Link>

        {loading ? (
          <p>Loading venue...</p>
        ) : error || !venue ? (
          <p className="text-red-600">{error || "Venue not found."}</p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {venue.images && (
              <img
                src={venue.images}
                alt={venue.name}
                className="h-72 w-full object-cover sm:h-96"
              />
            )}

            <div className="w-full p-6 sm:p-8">
              <div className="flex flex-col gap-3 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{venue.name}</h1>
                  <p className="mt-2 text-base text-gray-600">
                    {venue.location || "Location not specified"}
                  </p>
                </div>

                <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  Rs. {venue.price ?? "N/A"}
                </div>
              </div>

              <div className="mt-6 w-full rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Description</p>
                <p className="mt-3 text-base leading-8 text-gray-700">
                  {venue.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default VenueDetails;
