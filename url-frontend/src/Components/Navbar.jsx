import React, { useState } from "react";

const Navbar = ({
  user,
  onLoginClick,
  onSignupClick,
  onLogoutClick,
  onProfileClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Global Nav */}
      <nav
        className="glass-panel"
        style={{
          height: 64,
          position: "sticky",
          top: 16,
          zIndex: 100,
          margin: "16px auto",
          maxWidth: 1024,
          width: "calc(100% - 32px)",
          borderRadius: 32,
          padding: "0 24px",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              color: "#fff"
            }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span
              className="desktop-only"
              style={{
                cursor: "pointer",
                color: "#fff",
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: "-0.5px"
              }}
            >
              SnapIt
            </span>
          </a>

          {/* Desktop nav links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {user ? (
              <>
                <span className="text-caption-strong desktop-only" style={{ color: "var(--color-primary-focus)", marginRight: 12 }}>
                  Hi, {user.name || user.email}
                </span>
                <button onClick={onProfileClick} className="nav-btn desktop-only">
                  Profile
                </button>
                <button onClick={onLogoutClick} className="nav-btn desktop-only">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button onClick={onLoginClick} className="nav-btn desktop-only">
                  Sign In
                </button>
                <button
                  onClick={onSignupClick}
                  className="btn-primary desktop-only"
                  style={{
                    fontSize: 14,
                    padding: "8px 20px",
                    marginLeft: 8,
                  }}
                >
                  Get Started
                </button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              className="mobile-only"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                cursor: "pointer",
                padding: 4,
                display: "none",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        .nav-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
          padding: 8px 16px;
          border-radius: var(--rounded-pill);
        }
        .nav-btn:hover {
          color: #fff;
          background: rgba(255,255,255,0.08);
        }
        @media (max-width: 734px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
        @media (min-width: 735px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
