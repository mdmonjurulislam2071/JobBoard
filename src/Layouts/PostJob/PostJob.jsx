import React from 'react';

const PostJob = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-none bg-gradient-to-br from-indigo-100 to-purple-100 p-6">

      <form className="w-full max-w-2xl bg-white shadow-xl mt-16 rounded-2xl p-8 space-y-5">

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Add Job Post
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Company Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"/>

          <input type="text" placeholder="Location"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"/>
        </div>

        <input type="text" placeholder="Job Title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"/>

        <textarea rows="4" placeholder="Job Description..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"></textarea>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="number" placeholder="Salary ($/Hour)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"/>

          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none">
            <option>Select Job Type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Remote</option>
            <option>Internship</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="url" placeholder="Company Logo URL"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"/>

        </div>

        <button
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition duration-200 shadow-md">
          Add Job
        </button>

      </form>
    </div>
    );
};

export default PostJob;