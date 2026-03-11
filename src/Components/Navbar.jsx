import React, { use } from 'react';
import { NavLink } from 'react-router';
import { IoLogoTux } from "react-icons/io5";
import { AuthContext } from '../Context/AuthContext';


const Navbar = () => {

  const {user}=use(AuthContext)
     
    const links=<>
     <li><NavLink to={'/'}>Home</NavLink></li>
     <li><NavLink to={'/postjob'}>Post Job</NavLink></li>
    </>
  

    return (
        <div className="navbar mx-0 px-0 fixed shadow-sm text-white bg-[#0C152F] md:px-40">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="nav menu menu-sm dropdown-content  font-semibold bg-[#0C152F]  rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
        
       
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><IoLogoTux size={40} color="white" />JobBoard</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="nav menu font-semibold menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end gap-2">
   {
    user? <button className='btn text-white bg-blue-900 border-none'>LogOut</button>:<> <NavLink  to={'/register'}  className="btn btn-sm ">Register</NavLink>
    <NavLink to={'/login'} className="btn btn-sm">Login</NavLink></>
   }
  </div>
</div>
    );
};

export default Navbar;