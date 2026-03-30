// components/applications/ApplicationsView.jsx
import React, { useState, useMemo } from 'react';
import ApplicationStats from './ApplicationStats';
import ApplicationFilters from './ApplicationFilters';
import ApplicationCard from './ApplicationCard';

const ApplicationsView = ({ job, applications, onUpdateStatus, onBack }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter applications based on status and search
  const filteredApplications = useMemo(() => {
    let filtered = applications;
    
    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.applicantName?.toLowerCase().includes(term) ||
        app.applicantEmail?.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [applications, filterStatus, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 pb-8 sm:pb-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="group mb-4 sm:mb-6 text-violet-600 hover:text-violet-700 flex items-center gap-2 font-medium text-sm sm:text-base transition-colors"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </button>

        {/* Job Header Card */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6 mb-5 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Company Logo */}
            <div className="flex-shrink-0 self-center sm:self-start">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl flex items-center justify-center shadow-sm">
                {job.companyLogo ? (
                  <img 
                    src={job.companyLogo} 
                    alt={job.companyName} 
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                ) : (
                  <div className="text-2xl sm:text-3xl text-gray-400">📋</div>
                )}
              </div>
            </div>
            
            {/* Job Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                {job.jobTitle}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {job.companyName}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">📍 {job.location || 'Remote'}</span>
                <span className="inline-flex items-center gap-1">⏰ {job.jobType || 'Full Time'}</span>
                <span className="inline-flex items-center gap-1">💰 {job.salary || 'Negotiable'}/month</span>
                <span className="inline-flex items-center gap-1">📝 {applications.length} {applications.length === 1 ? 'Application' : 'Applications'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <ApplicationStats applications={applications} />

        {/* Filters Section */}
        <ApplicationFilters 
          onFilterChange={setFilterStatus}
          onSearchChange={setSearchTerm}
        />

        {/* Applications List Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-5">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Applications 
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredApplications.length})
            </span>
          </h2>
          {filterStatus !== 'all' && (
            <button
              onClick={() => setFilterStatus('all')}
              className="self-start sm:self-auto text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filter
            </button>
          )}
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 text-gray-300">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-base sm:text-lg">No applications found</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              {applications.length > 0 
                ? 'Try changing your filters to see more results' 
                : 'No one has applied for this position yet'}
            </p>
            {applications.length > 0 && filterStatus !== 'all' && (
              <button
                onClick={() => setFilterStatus('all')}
                className="mt-4 text-violet-600 hover:text-violet-700 text-sm font-medium"
              >
                Show all applications
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredApplications.map(application => (
              <ApplicationCard 
                key={application._id} 
                application={application} 
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsView;