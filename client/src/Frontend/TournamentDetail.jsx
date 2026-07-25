import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../FrontendLayout/Layout";

function TournamentDetail() {
  const { id } = useParams();

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5001/api/tournament/${id}`
        );

        setTournament(response.data);
      } catch (err) {
        console.log(err);
        setError("Tournament not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTournament();
    }
  }, [id]);

  const formatDate = (value) => {
    if (!value) return "N/A";

    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          to="/tournaments"
          className="mb-6 inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800"
        >
          ← Back to tournaments
        </Link>

        {loading ? (
          <p>Loading tournament...</p>
        ) : error || !tournament ? (
          <p className="text-red-600">{error || "Tournament not found."}</p>
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              {tournament.images && (
                <img
                  src={tournament.images}
                  alt={tournament.name}
                  className="h-72 w-full object-cover sm:h-96"
                />
              )}

              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold sm:text-3xl">
                      {tournament.name}
                    </h1>

                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      {tournament.sport || "Sport not specified"}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {tournament.status || "Upcoming"}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-500">
                      Location
                    </p>
                    <p className="mt-1 text-base text-gray-900">
                      {tournament.location || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-500">
                      Venue
                    </p>
                    <p className="mt-1 text-base text-gray-900">
                      {tournament.venue || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-500">
                      Prize Pool
                    </p>
                    <p className="mt-1 text-base text-gray-900">
                      Rs. {tournament.pricePool ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-500">
                      Entry Fee Per Team
                    </p>
                    <p className="mt-1 text-base text-gray-900">
                      Rs. {tournament.pricePerTeam ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-500">
                      Start Date
                    </p>
                    <p className="mt-1 text-base text-gray-900">
                      {formatDate(tournament.startDate)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-500">
                      End Date
                    </p>
                    <p className="mt-1 text-base text-gray-900">
                      {formatDate(tournament.endDate)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4 md:col-span-2">
                    <p className="text-sm font-semibold text-gray-500">
                      Contact
                    </p>
                    <p className="mt-1 text-base text-gray-900">
                      {tournament.contact || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Description
              </h2>

              <p className="mt-3 leading-7 text-gray-700">
                {tournament.description || "No description provided."}
              </p>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}

export default TournamentDetail;