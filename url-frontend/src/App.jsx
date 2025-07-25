import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import AuthModal from "./Components/AuthModel";
import UrlShortener from "./Components/UrlShortner";
import UserProfile from "./Components/UserProfile";
import Slogan from "./Components/Slogan";
import "./App.css";

function App() {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // Check for existing user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowProfile(false);
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div>
      <Navbar
        user={user}
        onLoginClick={() => setModalType("Login")}
        onSignupClick={() => setModalType("Sign Up")}
        onLogoutClick={handleLogout}
        onProfileClick={() => setShowProfile(!showProfile)}
      />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-200">
        <Slogan />
        <h1 className="text-4xl font-bold mb-8 text-blue-700 drop-shadow">
          🔗 URL Shortener
        </h1>
        
        {showProfile && user ? (
          <UserProfile 
            user={user} 
            onProfileUpdate={handleProfileUpdate} 
            onDeleteAccount={handleLogout} 
          />
        ) : (
          <UrlShortener user={user} />
        )}
      </div>
      {modalType && (
        <AuthModal 
          type={modalType} 
          onClose={() => setModalType(null)} 
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}

export default App;
