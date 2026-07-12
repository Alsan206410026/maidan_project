import React from "react";
import Layout from "../FrontendLayout/Layout";

function Home() {
  return (
    <Layout>
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gray-950">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&h=900&fit=crop&auto=format"
          alt="Futsal"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/90 to-green-950/60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              ⚡ Nepal's Smart Futsal Booking Platform
            </span>

            {/* Heading */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-black text-white uppercase leading-none mb-6 tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BOOK YOUR
              <br />
              <span className="text-primary">PERFECT</span> FUTSAL.
              <br />
              PLAY ANYTIME.
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-10 max-w-xl leading-relaxed">
              Find and book the best futsal courts across Nepal in seconds.
              Compare venues, check availability, and reserve your preferred
              time instantly.
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Location */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    📍
                  </span>

                  <input
                    type="text"
                    placeholder="City or Area"
                    className="w-full pl-9 pr-3 py-3 bg-gray-50 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                {/* Sports */}
                <div className="relative">
                  <select className="w-full px-3 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 border border-gray-100 appearance-none focus:outline-none">
                    <option>Futsal</option>
                    <option disabled>Football (Coming Soon)</option>
                    <option disabled>Cricket (Coming Soon)</option>
                    <option disabled>Badminton (Coming Soon)</option>
                    <option disabled>Basketball (Coming Soon)</option>
                    <option disabled>Tennis (Coming Soon)</option>
                  </select>

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    ▼
                  </span>
                </div>

                {/* Search Button */}
                <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-green-700 transition-all shadow-md">
                  🔍 Search
                </button>
              </div>
            </div>

            {/* Stats */}
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

      {/* Browse by Sport */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    {/* Section Header */}
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

    {/* Sports Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

      {/* Futsal */}
      <button className="flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 bg-green-50 border-green-200 text-green-700 hover:scale-105 transition-all duration-200">
        <span className="text-4xl">⚽</span>
        <span className="font-bold text-sm">Futsal</span>
        <span className="text-xs opacity-70">Available Now</span>
      </button>

      {/* Football */}
      <button
        disabled
        className="flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
      >
        <span className="text-4xl">🥅</span>
        <span className="font-bold text-sm">Football</span>
        <span className="text-xs">Coming Soon</span>
      </button>

      {/* Cricket */}
      <button
        disabled
        className="flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
      >
        <span className="text-4xl">🏏</span>
        <span className="font-bold text-sm">Cricket</span>
        <span className="text-xs">Coming Soon</span>
      </button>

      {/* Badminton */}
      <button
        disabled
        className="flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
      >
        <span className="text-4xl">🏸</span>
        <span className="font-bold text-sm">Badminton</span>
        <span className="text-xs">Coming Soon</span>
      </button>

      {/* Basketball */}
      <button
        disabled
        className="flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
      >
        <span className="text-4xl">🏀</span>
        <span className="font-bold text-sm">Basketball</span>
        <span className="text-xs">Coming Soon</span>
      </button>

      {/* Tennis */}
      <button
        disabled
        className="flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
      >
        <span className="text-4xl">🎾</span>
        <span className="font-bold text-sm">Tennis</span>
        <span className="text-xs">Coming Soon</span>
      </button>

    </div>
  </div>
</section>


    </Layout>
  );
}

export default Home;