import React from "react";

const Navbar = ({ user, onLoginClick, onSignupClick, onLogoutClick, onProfileClick }) => (
  <nav className="w-full bg-blue-700 shadow">
    <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-white text-2xl font-bold">🔗</span>
        <span className="text-white text-xl font-semibold tracking-wide">URL Shortener</span>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-white">Hello, {user.name || user.email}</span>
            <button
              onClick={onProfileClick}
              className="bg-blue-500 text-white px-4 py-1 rounded font-semibold hover:bg-blue-600 transition"
            >
              Profile
            </button>
            <button
              onClick={onLogoutClick}
              className="bg-white text-blue-700 px-4 py-1 rounded font-semibold hover:bg-blue-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onLoginClick}
              className="bg-white text-blue-700 px-4 py-1 rounded font-semibold hover:bg-blue-100 transition"
            >
              Login
            </button>
            <button
              onClick={onSignupClick}
              className="bg-blue-500 text-white px-4 py-1 rounded font-semibold hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);

export default Navbar;