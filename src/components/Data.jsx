import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Data = () => {
  // Dummy Data
  const totalRevenue = 1200.75; // Dummy revenue data
  const totalRequests = 342; // Dummy total requests data

  // Most Requested Songs Data
  const mostRequestedSongs = {
    labels: [
    "Don't Stop Believin", 'I Had Some Help', 'Die With A Smile', 'I Wanna Dance With Somebody', 'Dancing Queen', 'Yeah!',
      'Uptown Funk', 'Low', 'Party In The USA', 'Hey Yeah', 'I Gotta Feeling', 'Livin On A Prayer'
    ],
    datasets: [
      {
        label: 'Number of Requests',
        data: [85, 70, 62, 61, 53, 25, 22, 15, 12, 9, 8, 2],
        backgroundColor: '#fbbc09', // Tailwind blue
        borderRadius: 4,
      }
    ]
  };

  // Total Tip Amounts Data
  const tipData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Total Tips ($)',
        data: [50, 100, 75, 150, 200, 300, 125],
        backgroundColor: '#455FBA',
        borderRadius: 4,
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  return (
    <div className="min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 my-8">Data</h1>
        <div className="mx-auto space-y-8">
            {/* Total Revenue and Requests Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Revenue */}
            <div className="p-6 bg-white shadow rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800">Total Revenue</h2>
                <p className="mt-2 text-3xl font-bold text-brandPrimary">${totalRevenue.toFixed(2)}</p>
            </div>
            {/* Total Requests */}
            <div className="p-6 bg-white shadow rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800">Total Requests Received</h2>
                <p className="mt-2 text-3xl font-bold text-brandSecondary">{totalRequests}</p>
            </div>
            </div>

            {/* Most Requested Songs Chart */}
            <section className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Most Requested Songs</h2>
            <Bar data={mostRequestedSongs} options={{ ...options, plugins: { title: { display: false } } }} />
            </section>

            {/* Tip Amounts by Day Chart */}
            <section className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tip Amounts by Day</h2>
            <Bar data={tipData} options={{ ...options, plugins: { title: { display: false } } }} />
            </section>
        </div>
    </div>
  );
};

export default Data;
