import React from "react";
import Layout from "../FrontendLayout/Layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Home() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      location: "",
      sport: "",
    },
  });


  const onSubmit = ({ location, sport }) => {
  const params = new URLSearchParams();

  if (location) params.set("location", location);
  if (sport) params.set("sport", sport);

  navigate(`/venues?${params.toString()}`);
};

  return (
    <Layout>
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gray-950">
        <img
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&h=900&fit=crop&auto=format"
          alt="Futsal"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/90 to-green-950/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              Nepal's Smart Sports Venue Booking Platform
            </span>

            <h1
              className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase leading-none mb-6 tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BOOK YOUR
              <br />
              <span className="text-primary">PERFECT</span> Sports Venue.
              <br />
              PLAY ANYTIME.
            </h1>

            <p className="text-gray-300 text-lg mb-10 max-w-xl leading-relaxed">
              Find and book the best futsal courts across Nepal in seconds.
              Compare venues, check availability, and reserve your preferred
              time instantly.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      📍
                    </span>

                    <select
                      {...register("location")}
                      className="w-full pl-10 pr-8 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 border border-gray-100 appearance-none focus:outline-none"
                    >
                      <option value="">Select Location</option>
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Bhaktapur">Bhaktapur</option>
                      <option value="Lalitpur">Lalitpur</option>
                    </select>

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      ▼
                    </span>
                  </div>

                  <div className="relative">
                    <select
                      {...register("sport")}
                      className="w-full px-3 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 border border-gray-100 appearance-none focus:outline-none"
                    >
                       <option value="">Select Category</option>
                      <option value="Futsal">Futsal</option>
                      <option value="Football" disabled>
                        Football (Coming Soon)
                      </option>
                      <option value="Cricket" disabled>
                        Cricket (Coming Soon)
                      </option>
                      <option value="Badminton" disabled>
                        Badminton (Coming Soon)
                      </option>
                      <option value="Basketball" disabled>
                        Basketball (Coming Soon)
                      </option>
                      <option value="Tennis" disabled>
                        Tennis (Coming Soon)
                      </option>
                    </select>

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      ▼
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-green-700 transition-all shadow-md"
                  >
                    🔍 Search
                  </button>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-xl font-black">50+</span>
                <span>Futsal Courts</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-white text-xl font-black">5,000+</span>
                <span>Players</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-white text-xl font-black">15,000+</span>
                <span>Bookings</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-white text-xl font-black">4.9★</span>
                <span>Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
              Browse by Sport
            </span>

            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Pick Your Sport
            </h2>

            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Start with futsal today. More sports will be available soon.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              type="button"
              onClick={() => navigate("/venues?search=futsal")}
              className="flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 bg-green-50 border-green-200 text-green-700 hover:scale-105 transition-all duration-200"
            >
              <span className="text-4xl">⚽</span>
              <span className="font-bold text-sm">Futsal</span>
              <span className="text-xs opacity-70">Available Now</span>
            </button>

            {["Football", "Cricket", "Badminton", "Basketball", "Tennis"].map(
              (sport) => (
                <button
                  key={sport}
                  type="button"
                  disabled
                  className="flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                >
                  <span className="text-4xl">🏟️</span>
                  <span className="font-bold text-sm">{sport}</span>
                  <span className="text-xs">Coming Soon</span>
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;