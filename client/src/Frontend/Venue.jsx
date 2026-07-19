import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Layout from "../FrontendLayout/Layout";

function Venue() {
  const [searchParams] = useSearchParams();

  const location = searchParams.get("location");
  const sport = searchParams.get("sport");

  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pagesToShow, setPagesToShow] = useState(3);
  const [venuesPerPage, setVenuesPerPage] = useState(4);

  // Calculate current page venues
  const lastVenue = page * venuesPerPage;
  const firstVenue = lastVenue - venuesPerPage;
  const currentVenues = venues.slice(firstVenue, lastVenue);


  // Total pages
  const totalPages = Math.ceil(venues.length / venuesPerPage);

  //scroll to top on page change


  useEffect(() => {
    const updateResponsiveValues = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setPagesToShow(5);
        setVenuesPerPage(12);
      } else if (width >= 768) {
        setPagesToShow(4);
        setVenuesPerPage(8);
      } else if (width >= 640) {
        setPagesToShow(3);
        setVenuesPerPage(6);
      } else {
        setPagesToShow(3);
        setVenuesPerPage(4);
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


  // Sliding Pagination Logic

  const visiblePageCount = Math.max(1, Math.min(pagesToShow, totalPages));
  const halfWindow = Math.floor(visiblePageCount / 2);

  let startPage = Math.max(page - halfWindow, 1);
  const endPage = startPage + visiblePageCount - 1;

  if (endPage > totalPages) {
    startPage = Math.max(totalPages - visiblePageCount + 1, 1);
  }

  const pageNumbers = [];

  for (
    let i = startPage;
    i <= Math.min(startPage + visiblePageCount - 1, totalPages);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        response = await axios.get(
          "http://localhost:5001/api/venue"
        );
      }

      setVenues(response.data);

      // Go back to first page after every search
      setPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold leading-tight sm:text-3xl">
          {location || sport
            ? `Search: ${location || sport}`
            : "All Venues"}
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : venues.length === 0 ? (
          <p>No venues found.</p>
        ) : (
          <>
            {/* Venue Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {currentVenues.map((venue) => (
                <div
                  key={venue._id}
                  className="overflow-hidden rounded-xl border bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5"
                >
                  <img
                    src={venue.images}
                    alt={venue.name}
                    className="aspect-[16/10] w-full rounded-lg object-cover sm:aspect-[4/3]"
                  />

                  <h2 className="mt-3 text-lg font-bold sm:text-xl">
                    {venue.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 sm:text-base">{venue.location}</p>

                  <p className="mt-2 text-sm font-semibold text-gray-900 sm:text-base">
                    Rs. {venue.price}
                  </p>

                  <p className="mt-1 text-sm text-gray-600 sm:text-base">
                    {venue.category?.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex flex-nowrap items-center justify-center gap-1 overflow-x-auto px-1 sm:flex-wrap sm:gap-2 sm:px-0">

              {/* Previous */}
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="min-w-8 rounded border border-gray-300 px-2 py-1.5 text-xs leading-none transition disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-10 sm:px-3 sm:py-2 sm:text-sm"
              >
                &lt;
              </button>

              {/* Page Numbers */}
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

              {/* Show ... and last page */}
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

              {/* Next */}
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

export default Venue;