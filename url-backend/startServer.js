const { default: mongooses } = require("mongoose");

const db_path = `mongodb+srv://myselfjaved:Javed123@url-shorter.sxgf0s5.mongodb.net/?retryWrites=true&w=majority&appName=url-shorter`;

const PORT = 3003;

const startServer = async (app) => {
  try {
    await mongooses.connect(db_path);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = startServer;
