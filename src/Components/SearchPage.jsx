import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { FiSearch } from "react-icons/fi";
import { IoLocation } from "react-icons/io5";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    fetchAndFilterJobs();
  }, [query, location]);

  const fetchAndFilterJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/jobs');
      
      if (response.data.success) {
        let filteredJobs = response.data.jobs;
        
        if (query) {
          filteredJobs = filteredJobs.filter(job => 
            job.jobTitle?.toLowerCase().includes(query.toLowerCase()) ||
            job.description?.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        if (location) {
          filteredJobs = filteredJobs.filter(job => 
            job.location?.toLowerCase().includes(location.toLowerCase())
          );
        }
        
        setJobs(filteredJobs);
        setTotalJobs(filteredJobs.length);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Job Card Component - Home পেজের মতো একই ডিজাইন
  const JobCard = ({ job }) => {
    const {
      companyName,
      location: jobLocation,
      jobTitle,
      description,
      salary,
      jobType,
     
      postedAt,
      _id
    } = job;

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          {/* Company Name & Location */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{companyName}</h3>
              <p className="text-gray-500 text-sm">{jobLocation || 'Remote'}</p>
            </div>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {jobType || 'Full Time'}
            </span>
          </div>

          {/* Job Title */}
          <h2 className="text-lg font-bold text-gray-800 mt-2">{jobTitle}</h2>
          
          {/* Posted Date */}
          <p className="text-gray-400 text-xs mt-1">
            {postedAt ? new Date(postedAt).toLocaleDateString() : 'Recently'}
          </p>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mt-3 line-clamp-2">
            {description || 'No description provided'}
          </p>
          
          {/* Footer */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <NavLink to={`/applyjob/${_id}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition">
                Apply Now
              </button>
            </NavLink>
            <p className="text-blue-600 font-semibold text-sm">
              {salary} Tk / Monthly
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Search Results
            </h1>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex flex-wrap gap-4">
                {query && (
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                    <FiSearch className="text-purple-500" />
                    <span className="text-gray-700">"{query}"</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                    <IoLocation className="text-purple-500" />
                    <span className="text-gray-700">{location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Result Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-blue-600">{totalJobs}</span> jobs
            {query && <span> matching "<span className="font-medium text-purple-600">{query}</span>"</span>}
            {location && <span> in <span className="font-medium text-purple-600">{location}</span></span>}
          </p>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-lg">No jobs found matching your search.</p>
            <p className="text-gray-400 text-sm mt-2">
              Try different keywords or browse all jobs
            </p>
            <Link to="/jobs">
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Browse All Jobs
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;