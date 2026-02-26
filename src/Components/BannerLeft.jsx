import React from 'react';
import JobSearchBar from './searchBar';

const BannerLeft = () => {
    return (
        <div className='text-left flex justify-center flex-col items-center px-5 '>
           <div className='mb-10'>
             <h2 className='text-lg md:text-2xl  text-blue-300 font-semibold'>We have <span className='text-yellow-400'>28000+</span>Live Jobs </h2>
            <h1 className=' text-3xl md:text-6xl font-semibold'>Your <span className='text-blue-400'>Dream</span> Job Is Waiting For You </h1>
           </div>

           <div className=''>
             <h1 className='  text-sm  md:text-lg mb-2 text-blue-300'>Type your keywork, then click search to find your perfect job.</h1>
             <JobSearchBar></JobSearchBar>
           </div>
        </div>
    );
};

export default BannerLeft;
