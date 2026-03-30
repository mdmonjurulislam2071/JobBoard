const API_URL = 'https://job-board-server-omega.vercel.app';

export const jobService = {
  getMyJobs: async () => {
    try {
      const response = await fetch(`${API_URL}/my-jobs`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      return await response.json();
    } catch (error) {
      console.error('Error in getMyJobs:', error);
      return { success: false, jobs: [] };
    }
  },

  getJobApplications: async (jobId) => {
    try {
      const response = await fetch(`${API_URL}/job-applications/${jobId}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      return await response.json();
    } catch (error) {
      console.error('Error in getJobApplications:', error);
      return { success: false, applications: [] };
    }
  },

  updateApplicationStatus: async (applicationId, status) => {
    try {
      const response = await fetch(`${API_URL}/application/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status })
      });
      return await response.json();
    } catch (error) {
      console.error('Error in updateApplicationStatus:', error);
      return { success: false, message: error.message };
    }
  },

  updateJobStatus: async (jobId, status) => {
    try {
      const response = await fetch(`${API_URL}/my-job/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status })
      });
      return await response.json();
    } catch (error) {
      console.error('Error in updateJobStatus:', error);
      return { success: false };
    }
  },

  deleteJob: async (jobId) => {
    try {
      const response = await fetch(`${API_URL}/my-job/${jobId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      return await response.json();
    } catch (error) {
      console.error('Error in deleteJob:', error);
      return { success: false };
    }
  }
};