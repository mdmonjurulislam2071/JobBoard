import React from 'react';

const JobCard = ({ job, onViewApplications }) => {
  const applicationCount = job.applicationsCount || 0;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
            <p className="text-gray-600 mt-1">{job.companyName}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {job.status || 'Active'}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-2">
          📍 {job.location || 'Remote'} • {job.jobType || 'Full Time'}
        </p>
        <p className="text-blue-600 font-semibold mb-3">
          💰 {job.salary} / month
        </p>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {job.description || 'No description provided'}
        </p>
        <p className="text-gray-400 text-xs mb-4">
          Posted: {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Recently'}
        </p>

        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 rounded-full">
            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-sm font-medium text-violet-700">
              {applicationCount} {applicationCount === 1 ? 'Applicant' : 'Applicants'}
            </span>
          </div>
        </div>

        <button
          onClick={() => onViewApplications(job._id)}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Applications ({applicationCount})
        </button>
      </div>
    </div>
  );
};

export default JobCard;