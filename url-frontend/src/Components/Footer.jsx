import React from "react";

const Footer = () => (
  <footer
    style={{
      background: "rgba(15, 23, 42, 0.4)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderTop: "1px solid var(--color-glass-border)",
    }}
  >
    <div
      className="content-width"
      style={{
        maxWidth: 980,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      {/* Separator line */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          className="text-fine-print"
          style={{ color: "var(--color-text-muted)" }}
        >
          Copyright © {new Date().getFullYear()} SnapIt. All rights reserved.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <a
            href="#"
            className="text-fine-print"
            style={{
              color: "var(--color-text-muted)",
              textDecoration: "none",
            }}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-fine-print"
            style={{
              color: "var(--color-text-muted)",
              textDecoration: "none",
            }}
          >
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
