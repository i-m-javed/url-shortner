import React, { useState } from "react";

const BACKEND_BASE_URL = "http://localhost:3003";

const UrlShortener = ({ user }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userUrls, setUserUrls] = useState([]);
  const [showUserUrls, setShowUserUrls] = useState(false);
  const [fetchingUrls, setFetchingUrls] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl("");
    setError(null);
    setLoading(true);
    setCopied(false);

    try {
      const payload = { long_url: longUrl };
      if (user?.id) payload.userId = user.id;

      const response = await fetch(`${BACKEND_BASE_URL}/url/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return setError(errorData.error || "Something went wrong.");
      }

      const data = await response.json();
      setShortUrl(`${BACKEND_BASE_URL}/url/${data}`);
      setLongUrl("");
      if (user && showUserUrls) fetchUserUrls();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserUrls = async () => {
    if (!user?.id) return;
    setFetchingUrls(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/user/${user.id}/urls`);
      if (!response.ok) {
        const errorData = await response.json();
        return setError(errorData.error || "Failed to fetch URLs.");
      }
      const data = await response.json();
      setUserUrls(data);
      setShowUserUrls(true);
    } catch (err) {
      setError("Failed to load your URLs.");
    } finally {
      setFetchingUrls(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="shortener">
      {/* Shortener form card */}
      <div
        className="glass-card"
        style={{
          maxWidth: 600,
          margin: "0 auto",
          marginTop: -40,
          padding: 32,
          position: "relative",
          zIndex: 10,
        }}
      >
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="longUrl"
            className="text-caption-strong"
            style={{
              display: "block",
              marginBottom: 8,
              color: "var(--color-text-main)",
            }}
          >
            Paste a long URL
          </label>

          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: error || shortUrl ? 20 : 0,
            }}
          >
            <input
              id="longUrl"
              type="url"
              placeholder="https://example.com/your-very-long-url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              className="input-glass"
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ whiteSpace: "nowrap", height: 44 }}
            >
              {loading ? "Shortening…" : "Shorten"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="error-text" style={{ marginTop: 12 }}>
              {error}
            </p>
          )}

          {/* Result */}
          {shortUrl && (
            <div
              style={{
                marginTop: 20,
                padding: 16,
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid var(--color-glass-border)",
                borderRadius: "var(--rounded-sm)",
              }}
            >
              <p
                className="text-caption"
                style={{
                  color: "var(--color-text-muted)",
                  marginBottom: 8,
                }}
              >
                Your shortened URL
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-accent text-body-strong"
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {shortUrl}
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-secondary"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* User URLs */}
      {user && (
        <div style={{ maxWidth: 600, margin: "24px auto 0" }}>
          <button
            onClick={() => {
              if (showUserUrls) {
                setShowUserUrls(false);
              } else {
                fetchUserUrls();
              }
            }}
            className="link-accent text-caption"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginBottom: showUserUrls ? 16 : 0,
            }}
          >
            {showUserUrls ? "Hide your URLs" : "View your shortened URLs"}
            <span
              style={{
                display: "inline-block",
                transform: showUserUrls ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                fontSize: 14,
              }}
            >
              ›
            </span>
          </button>

          {showUserUrls && (
            <div>
              {fetchingUrls ? (
                <p
                  className="text-caption"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Loading…
                </p>
              ) : userUrls.length === 0 ? (
                <p
                  className="text-caption"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  You haven't created any shortened URLs yet.
                </p>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {userUrls.map((url, index) => (
                    <div
                      key={index}
                      className="glass-card"
                      style={{ padding: 16 }}
                    >
                      <p
                        className="text-caption"
                        style={{
                          color: "var(--color-text-muted)",
                          marginBottom: 4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={url.long_url}
                      >
                        {url.long_url}
                      </p>

                      <a
                        href={`${BACKEND_BASE_URL}/url/${url.short_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-accent text-body-strong"
                        style={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          marginBottom: 8,
                        }}
                      >
                        {`${BACKEND_BASE_URL}/url/${url.short_url}`}
                      </a>

                      <div
                        style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center",
                        }}
                      >
                        <span
                          className="text-fine-print"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {new Date(url.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span
                          className="text-fine-print"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {url.totalVisits || 0} visits
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
