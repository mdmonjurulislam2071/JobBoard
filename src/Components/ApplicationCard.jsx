import React from 'react';
import { FaEye, FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

const ApplicationCard = ({ application, onUpdateStatus }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {application.applicantName?.charAt(0) || 'U'}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">{application.applicantName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <MdEmail className="text-gray-400" />
              <span>{application.applicantEmail}</span>
            </div>
            {application.applicantPhone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdPhone className="text-gray-400" />
                <span>{application.applicantPhone}</span>
              </div>
            )}
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-sm font-medium
          ${application.status === 'accepted' ? 'bg-green-100 text-green-800' : 
            application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
            application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'}`}
        >
          {application.status === 'accepted' ? 'Accepted' : 
           application.status === 'rejected' ? 'Rejected' : 
           application.status === 'reviewed' ? 'Reviewed' :
           'Pending'}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Applied on</p>
          <p className="font-medium">{new Date(application.appliedAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Expected Salary</p>
          <p className="font-medium text-green-600">{application.expectedSalary || 'Negotiable'} BDT</p>
        </div>
      </div>

      {application.coverLetter && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{application.coverLetter}</p>
        </div>
      )}

      {application.resumeUrl && (
        <div className="mt-4">
          <a 
            href={application.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-violet-600 hover:underline text-sm flex items-center gap-1"
          >
            <FaEye /> View Resume
          </a>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {application.status !== 'accepted' && (
          <button
            onClick={() => onUpdateStatus(application._id, 'accepted')}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <FaCheck /> Accept
          </button>
        )}
        {application.status !== 'rejected' && (
          <button
            onClick={() => onUpdateStatus(application._id, 'rejected')}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <FaTimes /> Reject
          </button>
        )}
        {application.status === 'pending' && (
          <button
            onClick={() => onUpdateStatus(application._id, 'reviewed')}
            className="flex-1 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition flex items-center justify-center gap-2"
          >
            <FaClock /> Review
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;