import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../FrontendLayout/Layout";
import { Link } from "react-router-dom";

function Tournament() {
  const [tournaments, setTournaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pagesToShow, setPagesToShow] = useState(3);
  const [tournamentsPerPage, setTournamentsPerPage] = useState(4);

  const lastTournament = page * tournamentsPerPage;
  const firstTournament = lastTournament - tournamentsPerPage;
  const currentTournaments = tournaments.slice(firstTournament, lastTournament);
  const totalPages = Math.ceil(tournaments.length / tournamentsPerPage);

  useEffect(() => {
    const updateResponsiveValues = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setPagesToShow(5);
        setTournamentsPerPage(12);
      } else if (width >= 768) {
        setPagesToShow(4);
        setTournamentsPerPage(8);
      } else if (width >= 640) {
        setPagesToShow(3);
        setTournamentsPerPage(6);
      } else {
        setPagesToShow(3);
        setTournamentsPerPage(4);
      }
    };

    updateResponsiveValues();
    window.addEventListener("resize", updateResponsiveValues);

    return () => window.removeEventListener("resize", updateResponsiveValues);
  }, []);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTournaments(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchTournaments = async (query = "") => {
    try {
      setLoading(true);

      const url = query
        ? `http://localhost:5001/api/tournament/search?query=${encodeURIComponent(query)}`
        : "http://localhost:5001/api/tournament";

      const response = await axios.get(url);
      setTournaments(response.data);
      setPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const visiblePageCount = Math.max(1, Math.min(pagesToShow, totalPages));
  const halfWindow = Math.floor(visiblePageCount / 2);

  let startPage = Math.max(page - halfWindow, 1);
  const endPage = startPage + visiblePageCount - 1;

  if (endPage > totalPages) {
    startPage = Math.max(totalPages - visiblePageCount + 1, 1);
  }

  const pageNumbers = [];

  for (let i = startPage; i <= Math.min(startPage + visiblePageCount - 1, totalPages); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              {searchTerm ? `Search: ${searchTerm}` : "All Tournaments"}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Search by tournament name, location, or sport.
            </p>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tournaments..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 sm:w-80"
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : tournaments.length === 0 ? (
          <p>No tournaments found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {currentTournaments.map((tournament) => (
                <Link
                  key={tournament._id}
                  to={`/tournaments/${tournament._id}`}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:border-green-500 hover:shadow-xl sm:p-5"
                >
                  <img
                    src={tournament.images}
                    alt={tournament.name}
                    className="aspect-[16/10] w-full rounded-lg object-cover sm:aspect-[4/3]"
                  />

                  <div className="mt-3 flex items-start justify-between gap-2">
                    <h2 className="text-lg font-bold sm:text-xl">{tournament.name}</h2>
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {tournament.status || "upcoming"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    {tournament.sport || "Sport not specified"}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base">
                    {tournament.location || "Location not specified"}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base">
                    Venue: {tournament.venue || "N/A"}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base">
                    Prize Pool: Rs. {tournament.pricePool ?? "N/A"}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base">
                    Per Team: Rs. {tournament.pricePerTeam ?? "N/A"}
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-800">
                    {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-nowrap items-center justify-center gap-1 overflow-x-auto px-1 sm:flex-wrap sm:gap-2 sm:px-0">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="min-w-8 rounded border border-gray-300 px-2 py-1.5 text-xs leading-none transition disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-10 sm:px-3 sm:py-2 sm:text-sm"
              >
                &lt;
              </button>

              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`min-w-8 rounded px-2 py-1.5 text-xs leading-none transition sm:min-w-10 sm:px-3 sm:py-2 sm:text-sm ${
                    page === number
                      ? "bg-green-600 text-white"
                      : "border border-gray-300 bg-white"
                  }`}
                >
                  {number}
                </button>
              ))}

              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                  <span className="px-0.5 text-xs text-gray-500 sm:px-2 sm:text-sm">...</span>

                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`min-w-8 rounded px-2 py-1.5 text-xs leading-none transition sm:min-w-10 sm:px-3 sm:py-2 sm:text-sm ${
                      page === totalPages
                        ? "bg-green-600 text-white"
                        : "border border-gray-300 bg-white"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="min-w-8 rounded border border-gray-300 px-2 py-1.5 text-xs leading-none transition disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-10 sm:px-3 sm:py-2 sm:text-sm"
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}

export default Tournament;