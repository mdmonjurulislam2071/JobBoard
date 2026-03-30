import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import ApplicationsView from '../../Components/applications/ApplicationsView';
import JobCard from '../../Components/JobCard';

const ManageJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [viewMode, setViewMode] = useState('jobs');

  const fetchMyJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getMyJobs();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleViewApplications = async (jobId) => {
    try {
      const data = await jobService.getJobApplications(jobId);
      if (data.success) {
        setApplications(data.applications);
        setSelectedJob(jobs.find(j => j._id === jobId));
        setViewMode('applications');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      const data = await jobService.updateApplicationStatus(applicationId, status);
      if (data.success) {
        setApplications(prev => prev.map(app => 
          app._id === applicationId ? { ...app, status } : app
        ));
        alert(`Application ${status} successfully!`);
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update status');
    }
  };

  const handleBackToJobs = () => {
    setViewMode('jobs');
    setSelectedJob(null);
    setApplications([]);
    fetchMyJobs();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-600"></div>
      </div>
    );
  }

  if (viewMode === 'applications' && selectedJob) {
    return (
      <ApplicationsView
        job={selectedJob}
        applications={applications}
        onUpdateStatus={handleUpdateStatus}
        onBack={handleBackToJobs}
      />
    );
  }

  return (
    <div className="min-h-screen   bg-gray-50 pt-20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Posted Jobs</h1>
          <NavLink 
            to="/postjob"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition"
          >
            + Post New Job
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow">
              <p className="text-gray-500 text-lg">You haven't posted any jobs yet</p>
              <NavLink 
                to="/postjob"
                className="inline-block mt-4 text-violet-600 hover:underline"
              >
                Post your first job →
              </NavLink>
            </div>
          ) : (
            jobs.map(job => (
              <JobCard
                key={job._id} 
                job={job} 
                onViewApplications={handleViewApplications}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageJob;