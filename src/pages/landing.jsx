import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
// import heroImage from '../images/hero-image.jpg';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50">
          {/* Navbar */}
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-blue-600">MyBrand</h1>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                  <a href="#" className="text-gray-500 hover:text-blue-600">
                    Home
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600">
                    Features
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600">
                    Pricing
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600">
                    Contact
                  </a>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-brandPrimary-dark"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </header>
    
          {/* Hero Section */}
          <section className="relative bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-5xl font-bold text-gray-900">
                Landing Page
              </h1>
              <p className="mt-4 text-lg text-gray-500">
                Discover how our product can make a difference in your life. Join us
                today and take the first step towards a brighter future.
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  className="bg-blue-600 text-white px-8 py-3 rounded-md shadow hover:bg-brandPrimary-dark"
                >
                  Get Started
                </a>
                <a
                  href="#"
                  className="ml-4 text-blue-600 hover:text-blue-500 underline"
                >
                  Learn More
                </a>
              </div>
            </div>
          </section>
    
          {/* Features Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center text-gray-900">
                Amazing Features
              </h2>
              <p className="mt-2 text-center text-lg text-gray-500">
                Explore the features that make our product stand out.
              </p>
    
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white shadow-md rounded-lg">
                  <div className="text-blue-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mx-auto"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 001 1h2a1 1 0 100-2h-1V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Fast Setup</h3>
                  <p className="mt-4 text-gray-500">
                    Set up your account quickly with our simple onboarding process.
                  </p>
                </div>
                <div className="text-center p-6 bg-white shadow-md rounded-lg">
                  <div className="text-blue-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mx-auto"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4.293 9.293a1 1 0 011.414 0L10 13.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Seamless Integration
                  </h3>
                  <p className="mt-4 text-gray-500">
                    Easily integrate with other tools and services you use.
                  </p>
                </div>
                <div className="text-center p-6 bg-white shadow-md rounded-lg">
                  <div className="text-blue-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mx-auto"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 001 1h2a1 1 0 100-2h-1V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    24/7 Support
                  </h3>
                  <p className="mt-4 text-gray-500">
                    Our support team is available around the clock to assist you.
                  </p>
                </div>
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-500">© 2024 MyBrand. All rights reserved.</p>
            </div>
          </footer>
        </div>
      );
    };

export default Landing;
