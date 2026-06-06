import React, { useState, useEffect } from "react";

const BACKEND_BASE_URL = "http://localhost:3003";

const ProfileRow = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "14px 0",
      borderBottom: "1px solid var(--color-glass-border)",
    }}
  >
    <span className="text-body" style={{ color: "var(--color-text-muted)" }}>
      {label}
    </span>
    <span className="text-body" style={{ color: "var(--color-text-main)" }}>
      {value}
    </span>
  </div>
);

const UserProfile = ({ user, onProfileUpdate, onDeleteAccount }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to update profile");

      const updatedUser = { ...user, name: data.name, email: data.email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      if (onProfileUpdate) onProfileUpdate(updatedUser);

      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/user/${user.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete account");
      }
      localStorage.removeItem("user");
      if (onDeleteAccount) onDeleteAccount();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1
        className="text-display-lg"
        style={{ marginBottom: 8, color: "var(--color-text-main)" }}
      >
        Your profile.
      </h1>
      <p
        className="text-body"
        style={{ color: "var(--color-text-muted)", marginBottom: 32 }}
      >
        Manage your account settings.
      </p>

      {/* Success */}
      {success && (
        <div
          style={{
            marginBottom: 20,
            padding: "10px 14px",
            background: "rgba(34, 197, 94, 0.2)",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            borderRadius: "var(--rounded-sm)",
          }}
        >
          <p className="text-caption" style={{ color: "#4ade80" }}>
            Profile updated successfully.
          </p>
        </div>
      )}

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

      <div className="glass-card" style={{ padding: "32px" }}>
        {isEditing ? (
          <form onSubmit={handleUpdateProfile}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-glass"
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ flex: 1, height: 44 }}
              >
                {loading ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setName(user.name || "");
                  setEmail(user.email || "");
                  setError(null);
                }}
                className="btn-secondary"
                disabled={loading}
                style={{ flex: 1, height: 44 }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <ProfileRow label="Name" value={user.name} />
            <ProfileRow label="Email" value={user.email} />
            <ProfileRow
              label="Member since"
              value={new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            {user.lastLogin && (
              <ProfileRow
                label="Last sign in"
                value={new Date(user.lastLogin).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
                style={{ height: 44 }}
              >
                Edit Profile
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-caption"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-accent)",
                  cursor: "pointer",
                  padding: "8px 14px",
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}

        {/* Delete confirmation */}
        {showDeleteConfirm && (
          <div
            style={{
              marginTop: 24,
              padding: 20,
              background: "rgba(244, 63, 94, 0.2)",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              borderRadius: "var(--rounded-sm)",
            }}
          >
            <p
              className="text-body"
              style={{
                color: "var(--color-text-main)",
                marginBottom: 16,
              }}
            >
              Are you sure? This action cannot be undone. All your data and
              links will be permanently removed.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                style={{
                  flex: 1,
                  height: 44,
                  background: "var(--color-accent)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "var(--rounded-pill)",
                  fontSize: 17,
                  fontWeight: 400,
                  cursor: "pointer",
                  letterSpacing: "-0.374px",
                }}
              >
                {loading ? "Deleting…" : "Delete Account"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-secondary"
                disabled={loading}
                style={{ flex: 1, height: 44 }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
