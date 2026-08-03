import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt, FaStar } from "react-icons/fa";

function BookVenue() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    filterVenues();
  }, [search, location, category, venues]);

  const fetchVenues = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/venue");
      const venueList = Array.isArray(res.data) ? res.data : [];
      setVenues(venueList);
      setFilteredVenues(venueList);
    } catch (err) {
      console.log(err);
      setVenues([]);
      setFilteredVenues([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterVenues = () => {
    let data = [...venues];

    if (search) {
      data = data.filter((venue) =>
        venue.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      data = data.filter(
        (venue) => venue.location?.toLowerCase() === location.toLowerCase()
      );
    }

    if (category) {
      data = data.filter(
        (venue) => venue.category?.name?.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredVenues(data);
  };

  const handleBook = (venue) => {
    alert(`Book ${venue.name}`);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Book Venue
        </h1>

        <p className="mt-2 text-gray-500">
          Search and reserve your favourite sports venue.
        </p>
      </div>

      {/* Filters */}

      <div className="rounded-xl bg-white p-6 shadow-md">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

          {/* Search */}

          <div className="relative">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Venue..."
              className="w-full rounded-lg border py-3 pl-11 pr-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* Location */}

          <select
            className="rounded-lg border p-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Bhaktapur">Bhaktapur</option>
          </select>

          {/* Category */}

          <select
            className="rounded-lg border p-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Futsal">Futsal</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Cricket">Cricket</option>
            <option value="Badminton">Badminton</option>
            <option value="Volleyball">Volleyball</option>
          </select>

          {/* Date */}

          <input
            type="date"
            className="rounded-lg border p-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {/* Time */}

          <input
            type="time"
            className="rounded-lg border p-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

        </div>

      </div>

      {/* Venue Cards */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {isLoading ? (
          <div className="col-span-full rounded-xl bg-white p-12 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Loading venues...
            </h2>

            <p className="mt-2 text-gray-500">
              Please wait while we fetch the latest venues.
            </p>
          </div>
        ) : filteredVenues.length > 0 ? (

          filteredVenues.map((venue) => (

            <div
              key={venue._id}
              className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >

              <img
                src={venue.images || venue.image}
                alt={venue.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-gray-800">
                      {venue.name}
                    </h2>

                    <div className="mt-2 flex items-center text-gray-500">

                      <FaMapMarkerAlt className="mr-2 text-green-600" />

                      {venue.location}

                    </div>

                  </div>

                  <div className="flex items-center rounded-full bg-yellow-100 px-3 py-1">

                    <FaStar className="text-yellow-500" />

                    <span className="ml-1 font-semibold">
                      {venue.rating || "4.8"}
                    </span>

                  </div>

                </div>

                <div className="mt-5 flex flex-wrap gap-2">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {venue.category?.name || venue.category || "Category"}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    Available
                  </span>

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Price
                    </p>

                    <h3 className="text-2xl font-bold text-green-600">
                      Rs. {venue.price}/hr
                    </h3>

                  </div>

                  <button
                    onClick={() => handleBook(venue)}
                    className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    Book Venue
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="col-span-full rounded-xl bg-white p-12 text-center shadow-md">

            <h2 className="text-xl font-semibold text-gray-700">
              No Venue Found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing the search filters.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default BookVenue;