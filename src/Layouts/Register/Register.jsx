import React, { use, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {

  const { createUser } = use(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    createUser(email, password)
      .then((result) => {

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration Successful",
          text: "Please login to continue",
          showConfirmButton: false,
          timer: 2000
          
        });
        console.log(result)

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      })
      .catch((err) => {

        if (err.code === "auth/email-already-in-use") {
          setError("Email already registered. Please login.");
        }
        else if (err.code === "auth/weak-password") {
          setError("Password must be at least 6 characters.");
        }
        else {
          setError(err.message);
        }

      });

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-none">
      <div className="bg-[#111827] p-8 rounded-2xl w-[400px] text-white shadow-xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-400">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              minLength="6"
              placeholder="Minimum 6 characters"
              className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-gray-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-400">
              Register As
            </label>

            <select
              name="role"
              required
              className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <option value="">Select Role</option>
              <option value="user">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>

          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 font-semibold"
          >
            Register
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

        </form>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-violet-500 hover:underline"
          >
            Login
          </NavLink>
        </p>

      </div>
    </div>
  );
};

export default Register;