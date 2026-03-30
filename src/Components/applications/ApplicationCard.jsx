// components/applications/ApplicationCard.jsx
import React from 'react';

const ApplicationCard = ({ application, onUpdateStatus }) => {

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': 
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': 
        return 'bg-blue-100 text-blue-800';
      case 'accepted': 
        return 'bg-green-100 text-green-800';
      case 'rejected': 
        return 'bg-red-100 text-red-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': 
        return 'Pending Review';
      case 'reviewed': 
        return 'Under Review';
      case 'accepted': 
        return 'Accepted';
      case 'rejected': 
        return 'Rejected';
      default: 
        return status;
    }
  };

  const handleViewResume = () => {
    if (application.resumeUrl) {
      window.open(application.resumeUrl, '_blank');
    } else {
      alert('No resume uploaded for this applicant');
    }
  };

  const handleDownloadResume = () => {
    if (application.resumeUrl) {
      const link = document.createElement('a');
      link.href = application.resumeUrl;
      link.download = `${application.applicantName}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No resume uploaded for this applicant');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {application.applicantName}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 break-all">
            {application.applicantEmail}
          </p>
          {application.applicantPhone && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
               {application.applicantPhone}
            </p>
          )}
        </div>
        <div className="self-start sm:self-auto">
          <span className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(application.status)}`}>
            {getStatusText(application.status)}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div>
          <p className="text-xs sm:text-sm text-gray-600">
            <span className="font-medium">Expected Salary:</span> {application.expectedSalary} BDT
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            <span className="font-medium">Applied:</span> {new Date(application.appliedAt).toLocaleDateString()}
          </p>
        </div>
        
        {/* Resume Buttons */}
        <div className="flex justify-start sm:justify-end items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
          {application.resumeUrl ? (
            <>
              <button
                onClick={handleViewResume}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="hidden xs:inline">View</span> Resume
              </button>
              
              <button
                onClick={handleDownloadResume}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden xs:inline">Download</span>
              </button>
            </>
          ) : (
            <p className="text-gray-400 text-xs sm:text-sm">No resume uploaded</p>
          )}
        </div>
      </div>

      {/* Cover Letter */}
      {application.coverLetter && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1"> Cover Letter</p>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{application.coverLetter}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        <button
          onClick={() => onUpdateStatus(application._id, 'accepted')}
          disabled={application.status === 'accepted'}
          className={`flex-1 min-w-[80px] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
            application.status === 'accepted'
              ? 'bg-green-100 text-green-600 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          ✓ Accept
        </button>
        <button
          onClick={() => onUpdateStatus(application._id, 'rejected')}
          disabled={application.status === 'rejected'}
          className={`flex-1 min-w-[80px] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
            application.status === 'rejected'
              ? 'bg-red-100 text-red-600 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          ✗ Reject
        </button>
        <button
          onClick={() => onUpdateStatus(application._id, 'reviewed')}
          disabled={application.status === 'reviewed'}
          className={`flex-1 min-w-[100px] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
            application.status === 'reviewed'
              ? 'bg-blue-100 text-blue-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
           Mark as Reviewed
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;