import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.tsx";
import Auth from "../utils/auth.ts";

const Navbar: React.FC = () => {
  // const { isLoggedIn } = useContext(UserContext);

  // console.log("isLoggedIn:", isLoggedIn);

  const isLoggedIn = Auth.loggedIn();
  console.log("isLoggedIn:", isLoggedIn);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">MelodyHub</Link>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <input
              type="text"
              placeholder="Search songs, lyrics, artists..."
              className="px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          )}
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link to="/signup" className="text-gray-300 hover:text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
