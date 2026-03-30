import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const ApplyJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    const [job, setJob] = useState(null);
    const [jobLoading, setJobLoading] = useState(true);
    const [expectedSalary, setExpectedSalary] = useState('');
    const [resume, setResume] = useState(null);
    const [salaryError, setSalaryError] = useState('');
    const [resumeError, setResumeError] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    const [loading, setLoading] = useState(false);
    
    const allowedFileTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/jpg'
    ];
    
    useEffect(() => {
        if (!id) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Request',
                text: 'No job ID found. Please go back and try again.',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                navigate('/jobs');
            });
            return;
        }
        
        const fetchJobDetails = async () => {
            try {
                console.log("Fetching job details for ID:", id);
                const response = await axios.get(`https://job-board-server-omega.vercel.app/jobs/${id}`);
                
                if (response.data.success) {
                    setJob(response.data.job);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Job Not Found',
                        text: response.data.message || 'The job you are applying for does not exist.',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        navigate('/jobs');
                    });
                }
            } catch (error) {
                console.error('Error fetching job:', error);
                let errorMessage = 'Failed to load job details. Please try again.';
                
                if (error.response?.status === 404) {
                    errorMessage = 'Job not found. It may have been removed.';
                } else if (error.response?.status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else if (error.code === 'ERR_NETWORK') {
                    errorMessage = 'Network error. Please check if the server is running on port 3000';
                }
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                    confirmButtonColor: '#3085d6'
                }).then(() => {
                    navigate('/jobs');
                });
            } finally {
                setJobLoading(false);
            }
        };
        
        fetchJobDetails();
    }, [id, navigate]);
    
    const handleSalaryChange = (e) => {
        setExpectedSalary(e.target.value);
        setSalaryError('');
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            if (!allowedFileTypes.includes(file.type)) {
                setResumeError('Please upload only PDF, DOCX, JPG, or PNG files');
                setResume(null);
                setUploadStatus('');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                setResumeError('File size must be less than 5MB');
                setResume(null);
                setUploadStatus('');
                return;
            }
            
            setResume(file);
            setUploadStatus(`Selected file: ${file.name}`);
            setResumeError('');
        }
    };
    
    const validateForm = () => {
        let isValid = true;
        
        if (!expectedSalary) {
            setSalaryError('Expected salary is required');
            isValid = false;
        } else if (expectedSalary < 0) {
            setSalaryError('Salary must be greater than 0');
            isValid = false;
        }
        
        if (!resume) {
            setResumeError('Please upload your resume');
            isValid = false;
        }
        
        return isValid;
    };
    
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // ✅ লগইন চেক - লগইন না থাকলে login পেজে যাবে, সাথে current path মনে রাখবে
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to apply for this job',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    // ✅ লগইন করার পর এই পেজে ফিরে আসার জন্য path পাঠানো
                    navigate('/login', { state: { from: { pathname: `/applyjob/${id}` } } });
                }
            });
            return;
        }
        
        setLoading(true);
        
        try {
            let resumeBase64 = '';
            if (resume) {
                resumeBase64 = await fileToBase64(resume);
            }
            
            const applicationData = {
                expectedSalary: expectedSalary,
                resumeUrl: resumeBase64,
                resumeFileName: resume ? resume.name : 'resume.pdf',
                jobId: id,
                jobTitle: job?.jobTitle || '',
                companyName: job?.companyName || ''
            };
            
            const response = await axios.post(
                `https://job-board-server-omega.vercel.app/applyjob/${id}`,
                applicationData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted!',
                    text: `Your application for ${job?.jobTitle} at ${job?.companyName} has been submitted successfully`,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'View My Applications'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setExpectedSalary('');
                        setResume(null);
                        setUploadStatus('');
                        navigate('/myapplication');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: response.data.message || 'Failed to submit application. Please try again.',
                    confirmButtonColor: '#3085d6'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            
            let errorMessage = 'Something went wrong. Please try again.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message === 'Network Error') {
                errorMessage = 'Network error. Please check your internet connection.';
            } else if (error.response?.status === 401) {
                errorMessage = 'Please login again to continue.';
                navigate('/login');
            } else if (error.response?.status === 400) {
                errorMessage = error.response.data.message || 'You have already applied for this job.';
            }
            
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: errorMessage,
                confirmButtonColor: '#3085d6'
            });
        } finally {
            setLoading(false);
        }
    };
    
    if (jobLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Loading job details...</p>
            </div>
        );
    }
    
    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Job Not Found</h3>
                    <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
                    <button 
                        onClick={() => navigate('/jobs')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Browse Jobs
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50 pt-24 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Job Details Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            {job.companyLogo ? (
                                <img 
                                    src={job.companyLogo} 
                                    alt={job.companyName}
                                    className="w-16 h-16 object-contain rounded-lg"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/64?text=Logo';
                                    }}
                                />
                            ) : (
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            )}
                            
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {job.jobTitle}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {job.companyName}
                                </p>
                            </div>
                        </div>
                        
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {job.jobType || 'Full Time'}
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                        <div>
                            <p className="text-gray-500 text-sm">Location</p>
                            <p className="font-medium text-gray-700">{job.location || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Salary Range</p>
                            <p className="font-medium text-gray-700">{job.salary || 'Negotiable'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Job Type</p>
                            <p className="font-medium text-gray-700">{job.jobType || 'Full Time'}</p>
                        </div>
                    </div>
                    
                    {job.description && (
                        <div className="mt-4 pt-4 border-t">
                            <p className="text-gray-500 text-sm mb-2">Job Description</p>
                            <p className="text-gray-700">{job.description}</p>
                        </div>
                    )}
                </div>
                
                {/* Application Form */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                        Application Form
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm">
                        Please fill out the information below to apply for this position
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Expected Salary (BDT) *
                            </label>
                            <input
                                type="number"
                                value={expectedSalary}
                                onChange={handleSalaryChange}
                                placeholder="e.g., 50000"
                                disabled={loading}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    salaryError ? 'border-red-500' : 'border-gray-300'
                                } ${loading ? 'bg-gray-100' : ''}`}
                            />
                            {salaryError && (
                                <p className="text-red-500 text-sm mt-1">{salaryError}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Resume/CV *
                            </label>
                            
                            <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors ${loading ? 'opacity-50' : ''}`}>
                                <input
                                    type="file"
                                    id="resume"
                                    onChange={handleFileChange}
                                    accept=".pdf,.docx,.jpg,.jpeg,.png"
                                    className="hidden"
                                    disabled={loading}
                                />
                                
                                <label
                                    htmlFor="resume"
                                    className={`cursor-pointer inline-flex flex-col items-center ${loading ? 'cursor-not-allowed' : ''}`}
                                >
                                    <svg
                                        className="w-12 h-12 text-gray-400 mb-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                    
                                    <span className="text-blue-600 font-medium">
                                        Select File
                                    </span>
                                    
                                    <span className="text-gray-500 text-sm mt-1">
                                        or drag and drop
                                    </span>
                                    
                                    <span className="text-gray-400 text-xs mt-2">
                                        PDF, DOCX, JPG, PNG (Max 5MB)
                                    </span>
                                </label>
                                
                                {uploadStatus && (
                                    <p className="mt-3 text-sm text-green-600">{uploadStatus}</p>
                                )}
                            </div>
                            
                            {resumeError && (
                                <p className="text-red-500 text-sm mt-2">{resumeError}</p>
                            )}
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                loading 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'hover:bg-blue-700'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting Application...
                                </span>
                            ) : (
                                'Submit Application'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;