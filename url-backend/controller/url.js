const Urls = require("../model/url");
const Users = require("../model/users"); // Add this line to import the Users model
const shortid = require("shortid");
const validator = require("validator");

exports.generateShortUrl = async (req, res) => {
  const { long_url, userId } = req.body; // Extract userId from request body
  if (!long_url) {
    return res.status(400).json({ error: "URL is required" });
  }

  if (!validator.isURL(long_url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    // Check if URL already exists
    const urlData = await Urls.findOne({ long_url });
    
    if (urlData) {
      // If URL exists and user is logged in, make sure it's in their list
      if (userId) {
        await Users.findByIdAndUpdate(
          userId,
          { $addToSet: { urls: urlData._id } }, // $addToSet prevents duplicates
          { new: true }
        );
      }
      return res.status(200).json(urlData.short_url);
    }

    // Create new URL
    const short_url = shortid.generate();
    const newUrl = await Urls.create({
      long_url,
      short_url,
      createdAt: new Date(),
    });

    // If user is logged in, add URL to their list
    if (userId) {
      await Users.findByIdAndUpdate(
        userId,
        { $push: { urls: newUrl._id } },
        { new: true }
      );
    }

    return res.status(201).json(newUrl.short_url);
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.redirectToLongUrl = async (req, res) => {
  const short_url = req.params.short_url;

  try {
    const urlData = await Urls.findOneAndUpdate(
      { short_url },
      {
        $inc: { totalVisits: 1 },
        $push: {
          history: { date: new Date(), ip: req.ip },
        },
      },
      { new: true }
    );

    if (!urlData) {
      return res.status(404).json({ error: "URL not found" });
    }

    const fullUrl =
      urlData.long_url.startsWith("http://") ||
      urlData.long_url.startsWith("https://")
        ? urlData.long_url
        : `https://${urlData.long_url}`;

    return res.redirect(fullUrl);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUrlAnalytics = async (req, res) => {
  const short_url = req.params.short_url;

  try {
    const urlData = await Urls.findOne({ short_url });
    if (!urlData) {
      return res.status(404).json({ error: "URL not found" });
    }
    const analytics = {
      totalVisits: urlData.totalVisits,
      history: urlData.history.map((entry) => ({
        date: entry.date.toLocaleString("en-IN"),
        ip: entry.ip,
      })),
      createdAt: urlData.createdAt.toLocaleString("en-IN"),
    };
    return res.status(200).json(analytics);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
