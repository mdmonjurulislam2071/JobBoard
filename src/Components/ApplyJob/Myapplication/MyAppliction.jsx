import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaDownload, FaClock, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const MyAppliction = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        if (user) {
            fetchApplications();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/my-applications',
                {
                    withCredentials: true
                }
            );
            if (response.data.success) {
                setApplications(response.data.applications);
            }
            setError('');
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    // Status based styling (industry standard)
    const getStatusConfig = (status) => {
        switch(status) {
            case 'accepted':
                return {
                    label: 'Accepted',
                    icon: <FaCheckCircle className="w-5 h-5" />,
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-800',
                    borderColor: 'border-green-200',
                    badgeClass: 'bg-green-100 text-green-800'
                };
            case 'rejected':
                return {
                    label: 'Rejected',
                    icon: <FaTimesCircle className="w-5 h-5" />,
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-800',
                    borderColor: 'border-red-200',
                    badgeClass: 'bg-red-100 text-red-800'
                };
            case 'reviewed':
                return {
                    label: 'Under Review',
                    icon: <FaSpinner className="w-5 h-5 animate-spin" />,
                    bgColor: 'bg-blue-100',
                    textColor: 'text-blue-800',
                    borderColor: 'border-blue-200',
                    badgeClass: 'bg-blue-100 text-blue-800'
                };
            case 'pending':
            default:
                return {
                    label: 'Pending',
                    icon: <FaClock className="w-5 h-5" />,
                    bgColor: 'bg-yellow-100',
                    textColor: 'text-yellow-800',
                    borderColor: 'border-yellow-200',
                    badgeClass: 'bg-yellow-100 text-yellow-800'
                };
        }
    };

    // Filter applications
    const filteredApplications = filterStatus === 'all' 
        ? applications 
        : applications.filter(app => app.status === filterStatus);

    // Status counts
    const statusCounts = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        reviewed: applications.filter(a => a.status === 'reviewed').length,
        accepted: applications.filter(a => a.status === 'accepted').length,
        rejected: applications.filter(a => a.status === 'rejected').length
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                    <p className="text-gray-600 mt-2">Track and manage your job applications</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <p className="text-2xl font-bold text-gray-800">{statusCounts.total}</p>
                        <p className="text-sm text-gray-500">Total</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
                        <p className="text-sm text-gray-500">Pending</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{statusCounts.reviewed}</p>
                        <p className="text-sm text-gray-500">Under Review</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">{statusCounts.accepted}</p>
                        <p className="text-sm text-gray-500">Accepted</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
                        <p className="text-sm text-gray-500">Rejected</p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filterStatus === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        All ({statusCounts.total})
                    </button>
                    <button
                        onClick={() => setFilterStatus('pending')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filterStatus === 'pending'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Pending ({statusCounts.pending})
                    </button>
                    <button
                        onClick={() => setFilterStatus('reviewed')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filterStatus === 'reviewed'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Under Review ({statusCounts.reviewed})
                    </button>
                    <button
                        onClick={() => setFilterStatus('accepted')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filterStatus === 'accepted'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Accepted ({statusCounts.accepted})
                    </button>
                    <button
                        onClick={() => setFilterStatus('rejected')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filterStatus === 'rejected'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Rejected ({statusCounts.rejected})
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {/* Applications List */}
                {filteredApplications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No applications found</h3>
                        <p className="text-gray-500 mb-4">
                            {filterStatus !== 'all' 
                                ? `You don't have any ${filterStatus} applications.` 
                                : "You haven't applied for any jobs yet."}
                        </p>
                        <Link 
                            to="/jobs" 
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredApplications.map((application) => {
                            const statusConfig = getStatusConfig(application.status);
                            return (
                                <div key={application._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            {/* Job Info */}
                                            <div className="flex-1">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                                        {application.companyName?.charAt(0) || 'J'}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-800">
                                                            {application.jobTitle}
                                                        </h3>
                                                        <p className="text-gray-600">{application.companyName}</p>
                                                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                                                            <span>📍 {application.location || 'Remote'}</span>
                                                            <span>💰 {application.expectedSalary} BDT</span>
                                                            <span>📅 Applied: {formatDate(application.appliedAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bgClass} ${statusConfig.textColor}`}>
                                                {statusConfig.icon}
                                                <span className="font-medium">{statusConfig.label}</span>
                                            </div>
                                        </div>

                                        {/* Resume Section */}
                                        {application.resumeUrl && (
                                            <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
                                                <a
                                                    href={application.resumeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    <FaEye className="w-4 h-4" />
                                                    View Resume
                                                </a>
                                                <a
                                                    href={application.resumeUrl}
                                                    download={`${application.jobTitle}_resume.pdf`}
                                                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
                                                >
                                                    <FaDownload className="w-4 h-4" />
                                                    Download Resume
                                                </a>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="mt-4 pt-4 border-t flex justify-end">
                                            <Link
                                                to={`/jobs/${application.jobId}`}
                                                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                                            >
                                                View Job Details
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Application Timeline */}
                {applications.length > 0 && (
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Timeline</h3>
                        <div className="space-y-3">
                            {applications.slice(0, 5).map((app, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-500">{formatDate(app.appliedAt)}</span>
                                    <span className="text-gray-700">Applied for</span>
                                    <span className="font-medium text-gray-900">{app.jobTitle}</span>
                                    <span className="text-gray-500">at</span>
                                    <span className="font-medium text-gray-900">{app.companyName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppliction;