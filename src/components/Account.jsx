import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Account = () => {
  // Form State
  const [bandName, setBandName] = useState('');
  const [bandSocialMedia, setBandSocialMedia] = useState('');
  const [bandWebsite, setBandWebsite] = useState('');
  const [bandPhoto, setBandPhoto] = useState(null); // File input

  const [photoURL, setPhotoURL] = useState(''); // For storing uploaded image URL
  const [loading, setLoading] = useState(false); // To manage submission state

  // Handle File Upload to Firebase Storage
  const handleFileUpload = async (file) => {
    const storageRef = ref(storage, `band_photos/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedPhotoURL = '';
      if (bandPhoto) {
        uploadedPhotoURL = await handleFileUpload(bandPhoto);
        setPhotoURL(uploadedPhotoURL);
      }

      // Save Band Information to Firestore
      await setDoc(doc(db, 'bands', 'band_id'), {
        bandName,
        bandSocialMedia,
        bandWebsite,
        bandPhoto: uploadedPhotoURL || photoURL, // Store the new photo URL if uploaded
      });

      alert('Band information updated successfully!');
    } catch (error) {
      console.error('Error updating band info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white md:shadow-lg md:rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-800 my-8">Account Settings</h1>

        {/* Band Information */}
        <section className="mb-8">
          <h2 className="text-start text-2xl font-semibold text-gray-700 mb-4">Band Information</h2>
          <form onSubmit={handleSubmit}>
            {/* Band Name */}
            <div className="mb-6">
              <label className="text-start block text-sm text-gray-500 dark:text-gray-300">Band Name</label>
              <input
                type="text"
                value={bandName}
                onChange={(e) => setBandName(e.target.value)}
                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                placeholder="Enter your band name"
                required
              />
            </div>

            {/* Band Social Media */}
            <div className="mb-6">
              <label className="text-start block text-sm text-gray-500 dark:text-gray-300">Band Social Media</label>
              <input
                type="text"
                value={bandSocialMedia}
                onChange={(e) => setBandSocialMedia(e.target.value)}
                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                placeholder="Social Media URL"
                required
              />
            </div>

            {/* Band Website */}
            <div className="mb-6">
              <label className="text-start block text-sm text-gray-500 dark:text-gray-300">Band Website</label>
              <input
                type="url"
                value={bandWebsite}
                onChange={(e) => setBandWebsite(e.target.value)}
                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                placeholder="https://yourbandwebsite.com"
              />
            </div>

            {/* Band Photo */}
            <div className="mb-6">
              <label className="text-start block text-sm text-gray-500 dark:text-gray-300">Band Photo</label>
              <input
                type="file"
                onChange={(e) => setBandPhoto(e.target.files[0])}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              />
              {photoURL && (
                <img src={photoURL} alt="Band Photo" className="mt-4 w-32 h-32 object-cover rounded-lg" />
              )}
            </div>

            {/* Save Button */}
            <div className="mt-6 text-start">
              <button
                type="submit"
                className={`bg-brandPrimary text-white px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brandPrimary-dark'}`}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Band Information'}
              </button>
            </div>
          </form>
        </section>

        {/* Change Password Section */}
        <section className="mb-8">
            <h2 className="text-start text-2xl font-semibold text-gray-700 mb-4">Change Password</h2>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Password */}
                <div>
                    <label className="text-start block text-sm text-gray-500 dark:text-gray-300">Current Password</label>
                    <input
                    type="password"
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder="Enter current password"
                    required
                    />
                </div>
                {/* New Password */}
                <div>
                    <label className="text-start block text-sm text-gray-500 dark:text-gray-300">New Password</label>
                    <input
                    type="password"
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder="Enter new password"
                    required
                    />
                </div>
                </div>
                {/* Confirm New Password */}
                <div className="mt-6 text-start">
                <label className="text-start block text-sm text-gray-500 dark:text-gray-300">Confirm New Password</label>
                <input
                    type="password"
                    className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder="Confirm new password"
                    required
                />
                </div>
                <div className="mt-6 text-start">
                <button
                    type="submit"
                    className="bg-brandPrimary text-white px-4 py-2 rounded-md hover:bg-brandPrimary-dark"
                >
                    Update Password
                </button>
                </div>
            </form>
        </section>

        {/* Notification Preferences Section */}
        <section className="mb-8">
            <h2 className="text-start text-2xl font-semibold text-gray-700 mb-4">Notification Preferences</h2>
            <form>
                <div className="space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    id="email-notifications"
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="email-notifications" className="ml-2 text-gray-500">
                    Receive email notifications
                    </label>
                </div>
                {/* SMS Notifications */}
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    id="sms-notifications"
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="sms-notifications" className="ml-2 text-gray-500">
                    Receive SMS notifications
                    </label>
                </div>
                {/* Marketing Emails */}
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    id="marketing-emails"
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="marketing-emails" className="ml-2 text-gray-500">
                    Subscribe to marketing emails
                    </label>
                </div>
                </div>
                <div className="mt-6 text-start">
                <button
                    type="submit"
                    className="bg-brandPrimary text-white px-4 py-2 rounded-md hover:bg-brandPrimary-dark"
                >
                    Save Preferences
                </button>
                </div>
            </form>
        </section>


        {/* Billing Information Section */}
        <section className="mb-8">
            <h2 className="text-start text-2xl font-semibold text-gray-700 mb-4">Billing Information</h2>
            <form>
                {/* Payment Method */}
                <div className="mb-6">
                <label className="text-start block text-sm text-gray-500 dark:text-gray-300">Credit Card Number</label>
                <input
                    type="text"
                    className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder="Enter your credit card number"
                    required
                />
                </div>
                {/* Billing Address */}
                <div className="mb-6">
                <label className="text-start block text-sm text-gray-500 dark:text-gray-300">Billing Address</label>
                <input
                    type="text"
                    className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    placeholder="Enter your billing address"
                    required
                />
                </div>
                <div className="mt-6 text-start">
                <button
                    type="submit"
                    className="bg-brandPrimary text-white px-4 py-2 rounded-md hover:bg-brandPrimary-dark"
                >
                    Save Billing Information
                </button>
                </div>
            </form>
        </section>

        {/* Additional Security Section */}
        <section className="mb-8">
            <h2 className="text-start text-2xl font-semibold text-gray-700 mb-4">Additional Security</h2>
            <form>
                <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    id="two-factor-auth"
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="two-factor-auth" className="ml-2 text-gray-500">
                    Enable Two-Factor Authentication
                </label>
                </div>
                <div className="mt-6 text-start">
                <button
                    type="submit"
                    className="bg-brandPrimary text-white px-4 py-2 rounded-md hover:bg-brandPrimary-dark"
                >
                    Update Security Settings
                </button>
                </div>
            </form>
        </section>
      </div>
    </div>
  );
};

export default Account;
