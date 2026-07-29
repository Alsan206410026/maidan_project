import React from 'react';
import {
  FaUsers,
  FaFutbol,
  FaTrophy,
  FaCalendarCheck,
} from 'react-icons/fa';

function SuperAdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,245',
      icon: <FaUsers />,
    },
    {
      title: 'Total Venues',
      value: '58',
      icon: <FaFutbol />,
    },
    {
      title: 'Tournaments',
      value: '23',
      icon: <FaTrophy />,
    },
    {
      title: 'Bookings Today',
      value: '187',
      icon: <FaCalendarCheck />,
    },
  ];

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-800'>
          Super Admin Dashboard
        </h1>

        <p className='mt-2 text-gray-500'>
          Welcome back! Here's an overview of your Sports Booking System.
        </p>
      </div>

      {/* Statistics */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map((item) => (
          <div
            key={item.title}
            className='rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>{item.title}</p>

                <h2 className='mt-2 text-3xl font-bold text-gray-800'>
                  {item.value}
                </h2>
              </div>

              <div className='rounded-full bg-green-100 p-4 text-3xl text-green-600'>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Recent Activity */}
        <div className='rounded-xl bg-white p-6 shadow-md lg:col-span-2'>
          <h2 className='mb-5 text-xl font-semibold'>Recent Activity</h2>

          <div className='space-y-4'>
            <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
              <div>
                <p className='font-medium'>New venue registered</p>
                <p className='text-sm text-gray-500'>
                  Kathmandu Futsal Arena
                </p>
              </div>

              <span className='text-sm text-gray-400'>5 min ago</span>
            </div>

            <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
              <div>
                <p className='font-medium'>Tournament created</p>
                <p className='text-sm text-gray-500'>Summer Cup 2026</p>
              </div>

              <span className='text-sm text-gray-400'>1 hour ago</span>
            </div>

            <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
              <div>
                <p className='font-medium'>New user registered</p>
                <p className='text-sm text-gray-500'>
                  15 new users joined today
                </p>
              </div>

              <span className='text-sm text-gray-400'>2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='rounded-xl bg-white p-6 shadow-md'>
          <h2 className='mb-5 text-xl font-semibold'>Quick Actions</h2>

          <div className='space-y-4'>
            <button className='w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700'>
              Add New Venue
            </button>

            <button className='w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700'>
              Create Tournament
            </button>

            <button className='w-full rounded-lg bg-yellow-500 py-3 font-medium text-white transition hover:bg-yellow-600'>
              Manage Users
            </button>

            <button className='w-full rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600'>
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;