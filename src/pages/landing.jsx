import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import logo from '../assets/logo.png';
// import heroImage from '../images/hero-image.jpg';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50">
          {/* Navbar */}
          <header className="bg-white">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              	<div className="flex justify-between items-center py-2">
			  	<a href="/" className="flex items-center mb-4">
					<img className="w-8 md:w-16 h-8 md:h-16 mr-2" src={logo} alt="logo" />
					<h1 className="text-lg md:text-3xl font-regular">MelodyCue</h1>
				</a>
                <div className="hidden md:flex items-center space-x-8">
                  <a href="#" className="text-gray-500 hover:text-brandPrimary-dark">
                    Home
                  </a>
                  <a href="#" className="text-gray-500 hover:text-brandPrimary-dark">
                    Features
                  </a>
                  <a href="#" className="text-gray-500 hover:text-brandPrimary-dark">
                    Pricing
                  </a>
                  <a href="#" className="text-gray-500 hover:text-brandPrimary-dark">
                    Contact
                  </a>
                  <a href="#" className="bg-brandPrimary text-white px-4 py-2 rounded-md hover:bg-brandPrimary-dark">Get Started</a>
                </div>
              </div>
            </div>
          </header>
    
			{/* Hero Section */}
			<section className="relative bg-white py-16">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
					<h1 className="text-3xl md:text-5xl font-bold text-gray-900">Automate your Requests, Amplify your Reach.</h1>
					<p className="mt-4 text-lg text-gray-500">
						MelodyCue makes managing tips and song requests easy for live bands, offering insights and tools to grow your audience.
					</p>
					<div className="mt-8">
						<a
						href="#"
						className="bg-brandPrimary text-white px-8 py-3 rounded-md shadow hover:bg-brandPrimary-dark inline-block"
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
          <section className="py-4 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900">
                Features
              </h2>
              <p className="mt-2 text-center text-lg text-gray-500">
			  	Allow your fans to seamlessly send song requests, show appreciation with tips, and connect with your band—all in one place.
              </p>
    
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white shadow-md rounded-lg">
					<div className="text-brandPrimary mb-4">
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
					<div className="text-brandPrimary mb-4">
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
						Valuable Insights
					</h3>
					<p className="mt-4 text-gray-500">
						Get valuable data on your performances and fan preferences.
					</p>
                </div>
                <div className="text-center p-6 bg-white shadow-md rounded-lg">
					<div className="text-brandPrimary mb-4">
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
						Super Affordable
					</h3>
					<p className="mt-4 text-gray-500">
						Enjoy our premium features at a fraction of the cost.
					</p>
                </div>
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="bg-white py-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
              <p className="text-gray-500">© 2024 MelodyCue. All rights reserved.</p>
            </div>
          </footer>
        </div>
      );
    };

export default Landing;

// With MelodyCue, managing song requests and tips during live performances has never been easier. Our app allows your fans to seamlessly send song requests, show appreciation with tips, and connect with your band—all in one place. But we don’t stop there. MelodyCue provides valuable data on your performances, insights into fan preferences, and helps promote your band to a wider audience.

// Whether you're playing in a local bar or at a major venue, MelodyCue simplifies interactions with your fans and gives you the tools to thrive. It's your all-in-one platform for requests, tips, and promotion, helping you focus on what matters most: the music.
