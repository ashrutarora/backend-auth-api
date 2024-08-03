const express = require("express");
const UserAuthRouter = require("./routes/UserAuthRouter");
const { dbConnect } = require("./lib/dbConnect");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Set a default port if not defined in .env

app.use(express.json());

// Routes
app.use("/user", UserAuthRouter);

// Database connection
dbConnect().catch(err => {
  console.error("Failed to connect to the database:", err);
  process.exit(1); // Exit the process if the database connection fails
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
