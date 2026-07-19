import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Layout from "../FrontendLayout/Layout";

function Venue() {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const sport = searchParams.get("sport");

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, [location, sport]);

  const fetchVenues = async () => {
    try {
      setLoading(true);

      let response;

      if (location && sport) {
        response = await axios.get(
          `http://localhost:5001/api/venue/search?location=${location}&sport=${sport}`
        );
      } else if (location) {
        response = await axios.get(
          `http://localhost:5001/api/venue/search?location=${location}`
        );
      } else if (sport) {
        response = await axios.get(
          `http://localhost:5001/api/venue/search?sport=${sport}`
        );
      } else {
        response = await axios.get("http://localhost:5001/api/venue");
      }
      setVenues(response.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">
          {location || sport ? `Search: ${location || sport}` : "All Venues"}
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : venues.length === 0 ? (
          <p>No venues found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <div
                key={venue._id}
                className="border rounded-lg p-4 shadow"
              >
                <img
                  src={venue.images}
                  alt={venue.name}
                  className="w-full h-48 object-cover rounded"
                />

                <h2 className="text-xl font-bold mt-3">{venue.name}</h2>

                <p>{venue.location}</p>

                <p>Rs. {venue.price}</p>

                <p>{venue.category?.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Venue;