import React, { useEffect, useState } from "react";

const words = ["Instantly.", "Beautifully.", "Effortlessly."];

const Slogan = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-padding content-width" style={{ textAlign: "center", maxWidth: 800 }}>
      {/* Badge */}
      <div 
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 16px",
          borderRadius: "var(--rounded-pill)",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid var(--color-glass-border)",
          marginBottom: 24,
        }}
      >
        <span 
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#4ade80",
            animation: "pulse 2s infinite"
          }} 
        />
        <span className="text-caption" style={{ color: "#e9d5ff", fontWeight: 500 }}>
          Free · Fast · No account required
        </span>
      </div>

      {/* Main heading */}
      <h1 className="text-hero" style={{ marginBottom: 16 }}>
        Shorten links{" "}
        <br />
        <span
          className="text-hero-gradient"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            display: "inline-block",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          {words[wordIndex]}
        </span>
      </h1>

      {/* Sub */}
      <p 
        className="text-lead" 
        style={{ 
          maxWidth: 600, 
          margin: "0 auto", 
          marginBottom: 40,
          color: "var(--color-text-muted)"
        }}
      >
        Transform long, messy URLs into clean, shareable links in seconds.
        Track clicks, manage your links, and more.
      </p>

      {/* Stats row */}
      <div 
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {[
          { value: "10M+", label: "Links Created" },
          { value: "99.9%", label: "Uptime" },
          { value: "< 1s", label: "Redirect Speed" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div className="text-display-lg text-hero-gradient" style={{ fontSize: 32 }}>{stat.value}</div>
            <div className="text-caption" style={{ color: "var(--color-text-subtle)", marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }
      `}</style>
    </div>
  );
};

export default Slogan;