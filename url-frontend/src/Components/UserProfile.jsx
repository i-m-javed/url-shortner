import React, { useState, useEffect } from "react";

const BACKEND_BASE_URL = "http://localhost:3003";

const UserProfile = ({ user, onProfileUpdate, onDeleteAccount }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Update local storage with new user data
      const updatedUser = { ...user, name: data.name, email: data.email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Notify parent component
      if (onProfileUpdate) {
        onProfileUpdate(updatedUser);
      }

      setIsEditing(false);
    } catch (error) {
      setError(error.message);
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

      // Clear local storage
      localStorage.removeItem("user");
      
      // Notify parent component
      if (onDeleteAccount) {
        onDeleteAccount();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Your Profile</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {isEditing ? (
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setName(user.name || "");
                setEmail(user.email || "");
              }}
              className="flex-1 bg-gray-200 text-gray-800 rounded py-2 font-semibold hover:bg-gray-300 transition"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-gray-600 text-sm">Name:</p>
            <p className="font-medium">{user.name}</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Email:</p>
            <p className="font-medium">{user.email}</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Account Created:</p>
            <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          
          {user.lastLogin && (
            <div>
              <p className="text-gray-600 text-sm">Last Login:</p>
              <p className="font-medium">{new Date(user.lastLogin).toLocaleString()}</p>
            </div>
          )}
          
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
          
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="mt-2 bg-red-600 text-white rounded py-2 font-semibold hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>
      )}
      
      {showDeleteConfirm && (
        <div className="mt-6 p-4 border border-red-300 rounded bg-red-50">
          <p className="text-red-700 font-medium mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteAccount}
              className="flex-1 bg-red-600 text-white rounded py-2 font-semibold hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
            
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 bg-gray-200 text-gray-800 rounded py-2 font-semibold hover:bg-gray-300 transition"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;