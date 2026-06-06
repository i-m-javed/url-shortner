import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import AuthModal from "./Components/AuthModel";
import UrlShortener from "./Components/UrlShortner";
import UserProfile from "./Components/UserProfile";
import Slogan from "./Components/Slogan";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

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
    setModalType(null);
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
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar
        user={user}
        onLoginClick={() => setModalType("Login")}
        onSignupClick={() => setModalType("Sign Up")}
        onLogoutClick={handleLogout}
        onProfileClick={() => setShowProfile(!showProfile)}
      />

      {/* Hero */}
      <section>
        {!showProfile && <Slogan />}
      </section>

      {/* Main content */}
      <section
        style={{
          flex: 1,
        }}
      >
        <div
          className="content-width"
          style={{ paddingTop: showProfile ? 64 : 0, paddingBottom: 80 }}
        >
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
      </section>

      <Footer />

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
