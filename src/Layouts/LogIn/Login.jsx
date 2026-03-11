import React, { use, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {

  const { loginUser } = use(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    setError("");

    loginUser(formData.email, formData.password)
      .then((result) => {

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 2000,
          showConfirmButton: false
        });

        console.log(result)

        setTimeout(() => {
          navigate("/");
        }, 2000);

      })
      .catch((err) => {

        if (err.code === "auth/user-not-found") {
          setError("User not found. Please register.");
        }
        else if (err.code === "auth/wrong-password") {
          setError("Incorrect password.");
        }
        else if (err.code === "auth/invalid-credential") {
          setError("Invalid email or password.");
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
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-violet-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-400">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-violet-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-gray-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 font-semibold"
          >
            Login
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

        </form>

        {/* Register Link */}
        <p className="text-center text-gray-400 mt-4 text-sm">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-violet-500 hover:underline"
          >
            Register
          </NavLink>
        </p>

      </div>
    </div>
  );
};

export default Login;