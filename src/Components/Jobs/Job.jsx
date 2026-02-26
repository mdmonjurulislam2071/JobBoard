import React from 'react';

const JobCard = ({ job }) => {
    if (!job) return null;

    const {
        companyName,
        location,
        jobTitle,
        jobDescription,
        salaryPerHour,
        jobType,
        companyLogoUrl,
       
    } = job;

    return (
        <div className="relative w-full max-w-xl rounded-2xl border border-violet-500 p-6 
                        bg-gradient-to-br from-[#1e1f3a] to-[#1a1b2f] text-white 
                        shadow-lg hover:scale-[1.02] transition duration-300">

            {/* Meta Info (Always Top Right Corner) */}
            <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                <p className="text-sm text-gray-300">2 days ago</p>
                <span className="text-xs bg-violet-600/30 text-violet-400 px-3 py-1 rounded-md">
                    {jobType}
                </span>
            </div>

            {/* Header */}
            <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <img
                        src={companyLogoUrl}
                        alt={`${companyName} logo`}
                        className="w-10 h-10 object-contain"
                    />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-violet-400">
                        {companyName}
                    </h2>
                    <p className="text-sm text-gray-400">{location}</p>
                    <p className="text-lg font-medium text-gray-200">
                        {jobTitle}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
                {jobDescription}
            </p>

            {/* Footer */}
            <div className="flex justify-between items-center">
                <button className="bg-gradient-to-r from-violet-600 to-indigo-600 
                                   px-6 py-3 rounded-xl font-semibold 
                                   hover:scale-105 transition">
                    Apply Now
                </button>
                <p className="text-xl font-bold text-violet-400">
                    {salaryPerHour} Tk{" "}
                    <span className="text-gray-300 text-base">/ Hour</span>
                </p>
            </div>
        </div>
    );
};

export default JobCard;
