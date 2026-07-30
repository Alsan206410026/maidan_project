import React from "react";

function AdminDashboard() {
  const stats = [
    { label: "Venues Available", value: "24", icon: "🏟️" },
    { label: "Today Bookings", value: "18", icon: "📅" },
    { label: "Pending Approvals", value: "7", icon: "⏳" },
    { label: "Active Chats", value: "13", icon: "💬" },
  ];

  const features = [
    {
      title: "View Venues",
      description: "Check venue details, availability, and booking status.",
      icon: "🏟️",
    },
    {
      title: "Manage Bookings",
      description: "Review, update, and track all venue bookings.",
      icon: "📋",
    },
    {
      title: "Create Booking Time",
      description: "Add available time slots and booking schedules.",
      icon: "🕒",
    },
    {
      title: "Chat with Users",
      description: "Respond to user questions and booking-related messages.",
      icon: "💬",
    },
    {
      title: "Chat with Super Admin",
      description: "Coordinate booking changes and system updates.",
      icon: "👤",
    },
    {
      title: "Booking Overview",
      description: "Monitor upcoming bookings and venue occupancy.",
      icon: "📊",
    },
  ];

  const recentBookings = [
    {
      venue: "Green Valley Stadium",
      time: "Today, 4:00 PM",
      status: "Confirmed",
    },
    {
      venue: "City Sports Arena",
      time: "Today, 6:30 PM",
      status: "Pending",
    },
    {
      venue: "Grand Turf Ground",
      time: "Tomorrow, 9:00 AM",
      status: "Approved",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-100 px-4 py-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
          <div className="grid gap-8 bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 px-8 py-10 text-white md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                Admin Panel
              </p>
              <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                Admin Dashboard
              </h1>
              <p className="mt-4 max-w-xl text-white/90">
                Manage venues, bookings, booking times, and chat with users or
                super admin from one clean dashboard.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50">
                  View Venues
                </button>
                <button className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Manage Bookings
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-2xl">{item.icon}</p>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90">
                      Live
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/80">{item.label}</p>
                  <p className="mt-1 text-3xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-800">
                Admin Features
              </h2>
              <p className="mt-2 text-slate-600">
                Only admin actions are shown here. No sidebar is used.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5">
            <h3 className="text-xl font-bold text-slate-800">
              Recent Bookings
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Quick view of booking activity.
            </p>

            <div className="mt-6 space-y-4">
              {recentBookings.map((item) => (
                <div
                  key={item.venue}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-800">{item.venue}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.time}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">
                Booking Control
              </p>
              <p className="mt-1 text-sm text-emerald-700">
                Admin can create booking time slots and coordinate updates with
                super admin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
