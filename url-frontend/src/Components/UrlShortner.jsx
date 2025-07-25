import React, { useState, useEffect } from "react";

const BACKEND_BASE_URL = "http://localhost:3003";

const UrlShortener = ({ user }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userUrls, setUserUrls] = useState([]);
  const [showUserUrls, setShowUserUrls] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl("");
    setError(null);
    setLoading(true);

    try {
      const payload = { long_url: longUrl };
      
      // Add user ID if logged in
      if (user && user.id) {
        payload.userId = user.id;
      }

      const response = await fetch(`${BACKEND_BASE_URL}/url/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error:", errorData.error);
        return setError(errorData.error);
      }

      const data = await response.json();

      setShortUrl(`${BACKEND_BASE_URL}/url/${data}`);
      
      // If user is logged in and we're showing their URLs, refresh the list
      if (user && showUserUrls) {
        fetchUserUrls();
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserUrls = async () => {
    if (!user || !user.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/user/${user.id}/urls`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return setError(errorData.error || "Failed to fetch your URLs");
      }
      
      const data = await response.json();
      setUserUrls(data);
      setShowUserUrls(true);
    } catch (error) {
      console.error("Error fetching user URLs:", error);
      setError("Failed to load your URLs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <label
          htmlFor="longUrl"
          className="font-medium text-gray-700 text-center"
        >
          Enter a long URL
        </label>
        <input
          type="text"
          placeholder="https://example.com"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          className="w-[100%] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Shorten"}
        </button>
      </form>

      {shortUrl && (
        <div className="result mt-6 text-center overflow-hidden w-full max-w-md">
          <p className="text-gray-700 mb-2 font-medium">Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-mono truncate max-w-full"
            title={shortUrl}
          >
            {shortUrl}
          </a>
        </div>
      )}

      {error && (
        <div className="error mt-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {user && (
        <div className="mt-6 text-center">
          <a 
            href="#" 
            className="text-blue-600 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              if (showUserUrls) {
                setShowUserUrls(false);
              } else {
                fetchUserUrls();
              }
            }}
          >
            {showUserUrls ? "Hide your URLs" : "View your shortened URLs"}
          </a>
        </div>
      )}
      
      {showUserUrls && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Your Shortened URLs</h3>
          {userUrls.length === 0 ? (
            <p className="text-gray-600">You haven't created any shortened URLs yet.</p>
          ) : (
            <ul className="space-y-3">
              {userUrls.map((url, index) => (
                <li key={index} className="border border-gray-200 rounded p-3">
                  <p className="text-sm text-gray-600 mb-1 truncate">
                    <span className="font-medium">Original:</span> {url.long_url}
                  </p>
                  <a
                    href={`${BACKEND_BASE_URL}/url/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm font-mono truncate block"
                  >
                    {`${BACKEND_BASE_URL}/url/${url.short_url}`}
                  </a>
                  <div className="mt-1 text-xs text-gray-500">
                    Created: {new Date(url.createdAt).toLocaleDateString()}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Visits: {url.totalVisits || 0}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
