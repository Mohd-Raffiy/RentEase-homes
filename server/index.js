const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");
const reportRoutes = require("./routes/report.js"); // ✅ Added report route

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
app.use("/api/report", reportRoutes); // ✅ Added route usage

// MongoDB Connection
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Rent_Ease",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
