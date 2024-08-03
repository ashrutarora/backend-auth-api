const mongoose = require("mongoose");

exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "mongo-auth-db",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to database");
  }
};
