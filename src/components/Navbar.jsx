import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-6 w-full">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <div className="flex items-center">
          <span className="text-green-400 font-bold text-4xl">EXPENSIFY</span>
        </div>
        <div className="flex items-center">
          <Link
            to="/"
            className="text-white px-5 py-5 rounded hover:bg-gray-700 text-l"
          >
            HOME
          </Link>
          <Link
            to="/exchangerate"
            className="text-white px-4 py-5 rounded hover:bg-gray-700 text-l "
          >
            FOREX RATES
          </Link>
          {/* Add other navigation links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
