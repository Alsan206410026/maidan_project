const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const connectDB = require("./config/db");
const sessionMiddleware = require("./middleware/sessionmiddleware");

connectDB();

const app = express();


// WebSocket


// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5180"
    ],
    credentials: true,
  })
);
app.use(sessionMiddleware);

// Routes

app.get("/", (req, res) => {
    res.send("API Running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/venue", require("./routes/venueRoutes"));
app.use("/api/venuecategory", require("./routes/venueCategoryRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/tournament", require("./routes/tournamentRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/api/timeslot", require("./routes/timeSlotRoutes"));
app.use("/api/users", require("./routes/GetAdminForChat.Routes.js")); // Add this line to include the user routes

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});