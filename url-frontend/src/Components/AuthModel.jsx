import React, { useState, useEffect, useRef } from "react";

const BACKEND_BASE_URL = "http://localhost:3003";

const AuthModal = ({ type, onClose, onAuthSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = type === "Login" ? "/user/login" : "/user/register";
      const payload =
        type === "Login" ? { email, password } : { name, email, password };

      const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Authentication failed");

      localStorage.setItem("user", JSON.stringify(data));
      if (onAuthSuccess) onAuthSuccess(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: 24,
      }}
    >
      <div
        style={{
          background: "var(--color-glass-surface)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid var(--color-glass-border)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          borderRadius: "var(--rounded-lg)",
          width: "100%",
          maxWidth: 400,
          padding: 40,
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text-muted)",
            padding: 4,
            lineHeight: 1,
            fontSize: 20,
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <h2
          className="text-display-lg"
          style={{
            marginBottom: 4,
            color: "var(--color-text-main)",
          }}
        >
          {type === "Login" ? "Sign in." : "Create your account."}
        </h2>
        <p
          className="text-body"
          style={{
            color: "var(--color-text-muted)",
            marginBottom: 32,
          }}
        >
          {type === "Login"
            ? "Access your shortened links and history."
            : "Start shortening links in seconds."}
        </p>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: 20,
              padding: "10px 14px",
              background: "rgba(244, 63, 94, 0.2)",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              borderRadius: "var(--rounded-sm)",
            }}
          >
            <p className="error-text">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {type === "Sign Up" && (
              <div>
                <label
                  className="text-caption-strong"
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "var(--color-text-main)",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-glass"
                />
              </div>
            )}

            <div>
              <label
                className="text-caption-strong"
                style={{
                  display: "block",
                  marginBottom: 6,
                  color: "var(--color-text-main)",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-glass"
              />
            </div>

            <div>
              <label
                className="text-caption-strong"
                style={{
                  display: "block",
                  marginBottom: 6,
                  color: "var(--color-text-main)",
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-glass"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 24,
              height: 48,
              fontSize: 17,
            }}
          >
            {loading
              ? "Processing…"
              : type === "Login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
