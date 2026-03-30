import React from 'react';
import Navbar from '../Components/Navbar'
import FirefliesBackground from '../Components/FirefliesBackground';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';


const RootLayout = () => {


    return (
        <div className='bg-[#0C152F] min-h-screen relative'>

             <FirefliesBackground></FirefliesBackground>


          
           <div className='relative z-50'>
              <Navbar ></Navbar>
           </div>
           <div className='relative z-40'>
            <Outlet></Outlet>
           </div>
          

          <div className='relative z-50 '>
            <Footer></Footer>
          </div>
           
          
       
           
            
        </div>
    );
};

export default RootLayout;