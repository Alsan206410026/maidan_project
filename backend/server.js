const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");


// Load environment variables before importing modules that read them.
dotenv.config();

const connectDB = require("./config/db");
const sessionMiddleware = require("./middleware/sessionmiddleware.js");

connectDB(); //connect to database

const app = express();
app.use(bodyParser.json());

app.use(
    cors({
        origin: "http://localhost:5173", // React Vite
        credentials: true,
    })
);

app.use(express.json());


app.use(sessionMiddleware);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/venue', require('./routes/venueRoutes.js'));
app.use('/api/venuecategory', require('./routes/venueCategoryRoutes.js'));
app.use('/api/tournament', require('./routes/tournamentRoutes.js'));
app.use('/api/booking', require('./routes/bookingRoutes.js'));
app.use('/api/timeslot', require('./routes/timeSlotRoutes.js'));  
// app.use('/api/payment', require('./routes/paymentRoutes.js'));
// app.use('/api/chat', require('./routes/chatRoutes.js'));
// app.use('/api/notification', require('./routes/notificationRoutes.js'));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
