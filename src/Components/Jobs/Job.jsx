import React from 'react';
import { NavLink } from 'react-router-dom';

const Job = ({ job }) => {
    if (!job) return null;

    const {
        companyName,
        location,
        jobTitle,
        description,
        salary,
        jobType,
        companyLogo,
        postedAt,
        _id
    } = job;

    return (
        <div className="relative w-full rounded-2xl border border-violet-500 p-4 sm:p-5 lg:p-6 
                        bg-gradient-to-br from-[#1e1f3a] to-[#1a1b2f] text-white 
                        shadow-lg hover:scale-[1.02] transition duration-300">

            {/* Meta Info - Top Right Corner */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col items-end gap-1">
                <p className="text-xs sm:text-sm text-gray-300">
                    {postedAt ? new Date(postedAt).toLocaleDateString() : 'Recently'}
                </p>
                <span className="text-[10px] sm:text-xs bg-violet-600/30 text-violet-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md">
                    {jobType}
                </span>
            </div>

            {/* Header */}
            <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <img
                        src={companyLogo || 'https://via.placeholder.com/40'}
                        alt={`${companyName} logo`}
                        className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-violet-400 truncate">
                        {companyName}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                        📍 {location || 'Remote'}
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-200 mt-1 truncate">
                        {jobTitle}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 sm:mb-5 lg:mb-6 line-clamp-2 sm:line-clamp-3">
                {description}
            </p>

            {/* Footer */}
            <div className="flex flex-col xs:flex-row justify-between items-center gap-3 sm:gap-4 pt-2 sm:pt-0">
                <NavLink 
                    to={`/applyjob/${_id}`} 
                    className="w-full xs:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 
                               px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl font-semibold text-sm sm:text-base
                               hover:scale-105 transition text-center"
                >
                    Apply Now
                </NavLink>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-violet-400 whitespace-nowrap">
                    {salary} <span className="text-gray-300 text-xs sm:text-sm">Tk / Monthly</span>
                </p>
            </div>
        </div>
    );
};

export default Job;