import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const PostJob = () => {
  const { user } = use(AuthContext);

  console.log(user.email);

  const handleAddJob = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const companyName = form.companyName.value;
    const location = form.location.value;
    const jobTitle = form.jobTitle.value;
    const description = form.description.value;
    const salary = form.salary.value;
    const jobType = form.jobType.value;
    const companyLogo = form.companyLogo.value;

    // job অবজেক্ট (email বাদ দিয়ে)
    const jobData = {
      companyName,
      location,
      jobTitle,
      description,
      salary,
      jobType,
      companyLogo,
      postedAt: new Date().toISOString()
      // email পাঠানো হচ্ছে না
    };

    fetch('http://localhost:3000/post-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // cookie automatically যাবে
      body: JSON.stringify(jobData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Job posted successfully!');
        form.reset();
      } else {
        alert(data.message || 'Failed to post job');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Server error. Please try again.');
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-none bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      {/* onSubmit যোগ করুন */}
      <form onSubmit={handleAddJob} className="w-full max-w-2xl bg-white shadow-xl mt-16 rounded-2xl p-8 space-y-5">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Add Job Post
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input 
            type="text" 
            name="companyName"
            placeholder="Company Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" 
            required
          />

          <input 
            type="text" 
            name="location"
            placeholder="Location"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" 
          />
        </div>

        <input 
          type="text" 
          name="jobTitle"
          placeholder="Job Title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" 
          required
        />

        <textarea 
          rows="4" 
          name="description"
          placeholder="Job Description..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        ></textarea>

        <div className="grid md:grid-cols-2 gap-4">
          <input 
            type="number" 
            name="salary"
            placeholder="Salary (TK)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" 
          />

          <select 
            name="jobType"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="">Select Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <input 
          type="url" 
          name="companyLogo"
          placeholder="Company Logo URL"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" 
        />

        <button
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition duration-200 shadow-md"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;