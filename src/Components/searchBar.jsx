import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoLocation } from "react-icons/io5";

const JobSearchBar = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (jobTitle.trim()) params.append('q', jobTitle.trim());
    if (location.trim()) params.append('location', location.trim());
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full flex justify-center px-4">
      <form onSubmit={handleSearch} className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row items-stretch lg:items-center p-2 gap-2">
          
          {/* Job Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 lg:py-2 rounded-xl lg:rounded-none hover:bg-gray-50 transition">
            <FiSearch className="text-purple-500 text-xl flex-shrink-0" />
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job title, keywords"
              className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-base"
            />
          </div>

          {/* Divider - Desktop */}
          <div className="hidden lg:block h-8 w-px bg-gray-200" />
          
          {/* Mobile Divider */}
          <div className="lg:hidden h-px w-full bg-gray-200" />

          {/* Location Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 lg:py-2 rounded-xl lg:rounded-none hover:bg-gray-50 transition">
            <IoLocation className="text-purple-500 text-xl flex-shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or remote"
              className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-base"
            />
          </div>

          {/* Divider - Desktop */}
          <div className="hidden lg:block h-8 w-px bg-gray-200" />
          
          {/* Mobile Divider */}
          <div className="lg:hidden h-px w-full bg-gray-200" />

          {/* Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 lg:py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Find Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobSearchBar;