// components/applications/ApplicationStats.jsx
import React from 'react';
import { FaClock, FaEye, FaUserCheck, FaUserTimes, FaUsers } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color, total }) => {
  const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : 0;
  
  const colorClasses = {
    yellow: {
      light: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-600',
      icon: 'text-yellow-500',
      progress: 'bg-yellow-500'
    },
    blue: {
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      icon: 'text-blue-500',
      progress: 'bg-blue-500'
    },
    green: {
      light: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      icon: 'text-green-500',
      progress: 'bg-green-500'
    },
    red: {
      light: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      icon: 'text-red-500',
      progress: 'bg-red-500'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border ${colors.border} overflow-hidden`}>
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide">
              {title}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
              {value}
            </p>
          </div>
          <div className={`${colors.icon} text-2xl sm:text-3xl`}>
            {icon}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">of total applications</span>
            <span className="text-xs font-medium text-gray-600">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`${colors.progress} h-1.5 rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationStats = ({ applications }) => {
  const total = applications.length;
  
  const stats = {
    pending: applications.filter(a => a.status === 'pending').length,
    reviewed: applications.filter(a => a.status === 'reviewed').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
      
      {/* Total Applications Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-xs sm:text-sm font-medium uppercase tracking-wide">
                Total Applications
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-white mt-1">
                {total}
              </p>
              <p className="text-blue-100 text-xs sm:text-sm mt-2">
                {total === 0 ? 'No applications yet' : total === 1 ? '1 candidate applied' : `${total} candidates applied`}
              </p>
            </div>
            <div className="bg-white/20 rounded-full p-3 sm:p-4">
              <FaUsers className="text-white text-2xl sm:text-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        <StatCard 
          title="Pending" 
          value={stats.pending} 
          icon={<FaClock />} 
          color="yellow"
          total={total}
        />
        <StatCard 
          title="Under Review" 
          value={stats.reviewed} 
          icon={<FaEye />} 
          color="blue"
          total={total}
        />
        <StatCard 
          title="Accepted" 
          value={stats.accepted} 
          icon={<FaUserCheck />} 
          color="green"
          total={total}
        />
        <StatCard 
          title="Rejected" 
          value={stats.rejected} 
          icon={<FaUserTimes />} 
          color="red"
          total={total}
        />
      </div>

      {/* Summary Section */}
      {total > 0 && (
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">Pending: {stats.pending}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Under Review: {stats.reviewed}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Accepted: {stats.accepted}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Rejected: {stats.rejected}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span className="text-gray-600">Acceptance Rate: {total > 0 ? ((stats.accepted / total) * 100).toFixed(0) : 0}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationStats;