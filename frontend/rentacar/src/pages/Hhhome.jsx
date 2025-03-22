import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="py-12">
      <div className="bg-green-50 rounded-xl shadow-md overflow-hidden mb-16">
        <div className="py-16 px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Find Your Perfect Ride
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Choose from our wide selection of premium vehicles
          </p>
          <div className="mt-8">
            <Link
              to="/cars"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Browse Cars
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900">Wide Selection</h3>
          <p className="mt-2 text-gray-500">
            From economy to luxury, we have the perfect car for your needs
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900">Flexible Rental</h3>
          <p className="mt-2 text-gray-500">
            Daily, weekly, and monthly rental options available
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900">24/7 Support</h3>
          <p className="mt-2 text-gray-500">
            Our customer service team is always ready to assist you
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
