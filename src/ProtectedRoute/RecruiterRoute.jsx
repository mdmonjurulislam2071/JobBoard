import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, NavLink, useLocation } from "react-router";

const RecruiterRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-violet-500"></span>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== "recruiter") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-700">You don't have permission to access this page.</p>
          <NavLink to="/" className="btn bg-blue-600 text-white mt-4">
            Go to Home
          </NavLink>
        </div>
      </div>
    );
  }

  return children;
};

export default RecruiterRoute;