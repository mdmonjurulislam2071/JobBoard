import { FiSearch } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const JobSearchBar = () => {
  return (
    <div className="w-full flex justify-center ">

      <form >


        <div className="w-full max-w-4xl bg-gray-100 rounded-xl shadow-md flex flex-col md:flex-row items-center p-3 gap-3">

        {/* Job Input */}
        <div className="flex items-center w-full gap-2 px-3">
          <FiSearch className="text-purple-500 text-xl" />
          <input
            type="text"
            placeholder="Job Title, Keywords"
            className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            required
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-gray-300" />

        {/* Location Input */}
        <div className="flex items-center w-full gap-2 px-3">
          <IoLocationOutline className="text-purple-500 text-xl" />
          <input
            type="text"
            placeholder="City"
            className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            required
          />
        </div>

        {/* Button */}
        <input type="submit" value={'Find Job'}  className="w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition">
         
        </input>
      </div>





      </form>
      




    </div>
  );
};

export default JobSearchBar;