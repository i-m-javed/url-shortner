const { default: mongooses } = require("mongoose");

const db_path = process.env.MONGO_URI;
const PORT = process.env.PORT;

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
