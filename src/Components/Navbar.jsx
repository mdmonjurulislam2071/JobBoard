import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogoTux } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading, logOutUser } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log("👤 Navbar - Current user:", user);
  //   console.log("👤 Navbar - User role:", user?.role);
  // }, [user]);

  if (loading) {
    return (
      <div className="navbar fixed bg-[#0C152F] text-white md:px-40">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logOutUser();
      navigate("/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const links = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? "text-violet-400 font-bold" : "hover:text-violet-400"
          }
        >
          Home
        </NavLink>
      </li>
      
      
      {user && user?.role === 'user' && (
        <li>
          <NavLink 
            to="/myapplication"
            className={({ isActive }) => 
              isActive ? "text-violet-400 font-bold" : "hover:text-violet-400"
            }
          >
            My Application
          </NavLink>
        </li>
      )}

      
      {user && user?.role === "recruiter" && (
        <>
          <li>
            <NavLink 
              to="/postjob"
              className={({ isActive }) => 
                isActive ? "text-violet-400 font-bold" : "hover:text-violet-400"
              }
            >
              Post Job
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/manage-job"
              className={({ isActive }) => 
                isActive ? "text-violet-400 font-bold" : "hover:text-violet-400"
              }
            >
              Manage Job
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar mx-0 px-0 fixed shadow-sm text-white bg-[#0C152F] md:px-40 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content font-semibold bg-[#0C152F] rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <NavLink to="/" className="btn btn-ghost text-xl">
          <IoLogoTux size={40} color="white" />
          JobBoard
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu font-semibold menu-horizontal px-1 gap-2">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FaUserCircle size={24} className="text-gray-400" />
              <span className="text-sm hidden md:block">
                {user.email}
                {/* <span className="block text-xs text-violet-400">
                  {user?.role === "recruiter" ? "👔 Recruiter" : "🔍 Job Seeker"}
                </span> */}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/register" className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none">
              Register
            </NavLink>
            <NavLink to="/login" className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;