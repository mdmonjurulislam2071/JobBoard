// components/JobDetails/JobDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Swal from 'sweetalert2';
import { FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase, FaCalendarAlt, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../../../Context/AuthContext';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasApplied, setHasApplied] = useState(false);
    const [checkingApplication, setCheckingApplication] = useState(false);

    useEffect(() => {
        if (id) {
            fetchJobDetails();
            if (user) {
                checkIfApplied();
            }
        }
    }, [id, user]);

    const fetchJobDetails = async () => {
        try {
            const response = await axios.get(`https://job-board-server-omega.vercel.app/jobs/${id}`);
            if (response.data.success) {
                setJob(response.data.job);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Job Not Found',
                    text: 'The job you are looking for does not exist.',
                    confirmButtonColor: '#3085d6'
                }).then(() => {
                    navigate('/jobs');
                });
            }
        } catch (error) {
            console.error('Error fetching job:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load job details. Please try again.',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                navigate('/jobs');
            });
        } finally {
            setLoading(false);
        }
    };

    const checkIfApplied = async () => {
        setCheckingApplication(true);
        try {
            const response = await axios.get('https://job-board-server-omega.vercel.app/my-applications', {
                withCredentials: true
            });
            if (response.data.success) {
                const applied = response.data.applications.some(app => app.jobId === id);
                setHasApplied(applied);
            }
        } catch (error) {
            console.error('Error checking application:', error);
        } finally {
            setCheckingApplication(false);
        }
    };

    const handleApply = () => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to apply for this job',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }
        
        navigate(`/applyjob/${id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Job not found</p>
                    <Link to="/jobs" className="text-blue-600 hover:underline">
                        Back to Jobs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                    ← Back to Jobs
                </button>

                {/* Job Header Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                    <div className="p-6 border-b">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                {job.companyLogo ? (
                                    <img 
                                        src={job.companyLogo} 
                                        alt={job.companyName}
                                        className="w-16 h-16 object-contain rounded-lg"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">
                                            {job.companyName?.charAt(0) || 'J'}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        {job.jobTitle}
                                    </h1>
                                    <p className="text-gray-600 mt-1">{job.companyName}</p>
                                </div>
                            </div>
                            
                            {/* Apply Button */}
                            {hasApplied ? (
                                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
                                    <FaCheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Already Applied</span>
                                </div>
                            ) : (
                                <button
                                    onClick={handleApply}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                                >
                                    Apply Now
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Job Info Grid */}
                    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-gray-400 w-5 h-5" />
                            <div>
                                <p className="text-xs text-gray-500">Location</p>
                                <p className="text-sm font-medium text-gray-700">{job.location || 'Remote'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaMoneyBillWave className="text-gray-400 w-5 h-5" />
                            <div>
                                <p className="text-xs text-gray-500">Salary</p>
                                <p className="text-sm font-medium text-gray-700">{job.salary || 'Negotiable'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaBriefcase className="text-gray-400 w-5 h-5" />
                            <div>
                                <p className="text-xs text-gray-500">Job Type</p>
                                <p className="text-sm font-medium text-gray-700">{job.jobType || 'Full Time'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-gray-400 w-5 h-5" />
                            <div>
                                <p className="text-xs text-gray-500">Posted</p>
                                <p className="text-sm font-medium text-gray-700">
                                    {new Date(job.postedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Description */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {job.description || 'No description provided.'}
                    </p>
                </div>

                {/* Requirements (if available) */}
                {job.requirements && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {job.requirements.split(',').map((req, index) => (
                                <li key={index}>{req.trim()}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Benefits (if available) */}
                {job.benefits && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Benefits</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {job.benefits.split(',').map((benefit, index) => (
                                <li key={index}>{benefit.trim()}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* About Company */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">About {job.companyName}</h2>
                    <p className="text-gray-600">
                        {job.aboutCompany || `${job.companyName} is a leading company in the industry.`}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                    {!hasApplied ? (
                        <button
                            onClick={handleApply}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                        >
                            Apply Now
                        </button>
                    ) : (
                        <div className="flex-1 bg-green-100 text-green-700 py-3 rounded-lg font-medium text-center">
                            You have already applied for this position
                        </div>
                    )}
                    <Link
                        to="/"
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium text-center transition"
                    >
                        Browse More Jobs
                    </Link>
                </div>

               
               
            </div>
        </div>
    );
};

export default JobDetails;