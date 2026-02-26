// File: SeekerSteps.jsx
import React from "react";
import { FaSearch, FaFileAlt, FaUserPlus, FaCheckCircle } from "react-icons/fa";

export default function SeekerSteps() {
  return (
    <div className="bg-none md:mx-32 text-white py-12 px-6 text-center">
      <h2 className="text-xl md:text-xl font-bold mb-2">How It Works</h2>
      <p className="text-gray-400 mb-8">Follow Easy 4 Steps</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Step 1 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <div className="mb-4 flex justify-center">
            <FaSearch className="text-4xl text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Search Jobs</h3>
          <p className="text-gray-400">Find jobs that match your skills.</p>
        </div>

        {/* Step 2 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <div className="mb-4 flex justify-center">
            <FaFileAlt className="text-4xl text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">CV/Resume</h3>
          <p className="text-gray-400">Upload or create your professional resume.</p>
        </div>

        {/* Step 3 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <div className="mb-4 flex justify-center">
            <FaUserPlus className="text-4xl text-yellow-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Create Account</h3>
          <p className="text-gray-400">Sign up to track your applications.</p>
        </div>

        {/* Step 4 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <div className="mb-4 flex justify-center">
            <FaCheckCircle className="text-4xl text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Apply Them</h3>
          <p className="text-gray-400">Submit applications with one click.</p>
        </div>
      </div>
    </div>
  );
}
