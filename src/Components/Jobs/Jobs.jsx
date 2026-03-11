import React, { use, useState } from 'react';
import Job from './Job';

const Jobs = ({ jobsPromise }) => {

  const jobs = use(jobsPromise);

  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>

      <h1 className='text-3xl font-semibold mb-8'>
        All <span className='text-yellow-400'>Job Post</span> here
      </h1>

      {/* grid */}
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {jobs.slice(0, visibleCount).map(job => (
          <Job key={job.job_Id} job={job} />
        ))}
      </div>

      {/* load more button */}
      {visibleCount < jobs.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 rounded-xl font-semibold text-white hover:scale-105 transition"
          >
            Load More
          </button>
        </div>
      )}

    </div>
  );
};

export default Jobs;