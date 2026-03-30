import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobSearchBar from './searchBar';

const BannerLeft = () => {
    const [totalJobs, setTotalJobs] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTotalJobs();
    }, []);

    const fetchTotalJobs = async () => {
        try {
            const response = await axios.get('https://job-board-server-omega.vercel.app/jobs');
            if (response.data.success) {
                setTotalJobs(response.data.count);
            }
        } catch (error) {
            console.error('Error fetching jobs count:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='text-left flex justify-center flex-col items-center px-5'>
            <div className='mb-10'>
                <h2 className='text-lg md:text-2xl text-blue-300 font-semibold'>
                    We have 
                    <span className='text-yellow-400 mx-2'>
                        {loading ? '...' : totalJobs.toLocaleString()}+
                    </span>
                    Live Jobs 
                </h2>
                <h1 className='text-3xl md:text-6xl font-semibold'>
                    Your <span className='text-blue-400'>Dream</span> Job Is Waiting For You
                </h1>
            </div>

            <div>
                <h1 className='text-sm md:text-lg mb-2 text-blue-300'>
                    Type your keyword, then click search to find your perfect job.
                </h1>
                <JobSearchBar />
            </div>
        </div>
    );
};

export default BannerLeft;