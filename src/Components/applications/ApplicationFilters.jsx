// components/applications/ApplicationFilters.jsx
import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const ApplicationFilters = ({ onFilterChange, onSearchChange }) => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const statuses = [
    { id: 'all', label: 'All', color: 'gray', bgClass: 'bg-gray-600', hoverClass: 'hover:bg-gray-700' },
    { id: 'pending', label: 'Pending', color: 'yellow', bgClass: 'bg-yellow-600', hoverClass: 'hover:bg-yellow-700' },
    { id: 'reviewed', label: 'Under Review', color: 'blue', bgClass: 'bg-blue-600', hoverClass: 'hover:bg-blue-700' },
    { id: 'accepted', label: 'Accepted', color: 'green', bgClass: 'bg-green-600', hoverClass: 'hover:bg-green-700' },
    { id: 'rejected', label: 'Rejected', color: 'red', bgClass: 'bg-red-600', hoverClass: 'hover:bg-red-700' }
  ];

  const handleStatusClick = (statusId) => {
    setActiveStatus(statusId);
    onFilterChange(statusId);
    setShowMobileFilters(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const getStatusCount = () => {
    const currentStatus = statuses.find(s => s.id === activeStatus);
    return currentStatus ? currentStatus.label : 'All';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
      
      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-row md:gap-4">
        {/* Search Box */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Status Filters - Desktop */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1">
          {statuses.map(status => (
            <button
              key={status.id}
              onClick={() => handleStatusClick(status.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeStatus === status.id
                  ? `${status.bgClass} text-white shadow-md`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Search Box - Mobile */}
        <div className="relative mb-3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5"
        >
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500 text-sm" />
            <span className="text-sm font-medium text-gray-700">Filter by status</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-700">
              {getStatusCount()}
            </span>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showMobileFilters ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Mobile Status Filters Dropdown */}
        {showMobileFilters && (
          <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-wrap gap-1.5">
              {statuses.map(status => (
                <button
                  key={status.id}
                  onClick={() => handleStatusClick(status.id)}
                  className={`flex-1 min-w-[70px] px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    activeStatus === status.id
                      ? `${status.bgClass} text-white shadow-sm`
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Filter Indicator */}
      {activeStatus !== 'all' && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
          <span className="text-xs text-gray-500">Active filter:</span>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            activeStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
            activeStatus === 'reviewed' ? 'bg-blue-100 text-blue-700' :
            activeStatus === 'accepted' ? 'bg-green-100 text-green-700' :
            activeStatus === 'rejected' ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {statuses.find(s => s.id === activeStatus)?.label}
            <button
              onClick={() => handleStatusClick('all')}
              className="ml-1 hover:opacity-70"
            >
              ×
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default ApplicationFilters;