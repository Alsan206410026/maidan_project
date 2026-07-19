const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config(); //first use .env after import

connectDB(); //connect to database

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/venue', require('./routes/venueRoutes.js'));
app.use('/api/venuecategory', require('./routes/venueCategoryRoutes.js'));
// app.use('/api/booking', require('./routes/bookingRoutes.js'));
// app.use('/api/payment', require('./routes/paymentRoutes.js'));
// app.use('/api/admin', require('./routes/adminRoutes.js'));
// app.use('/api/chat', require('./routes/chatRoutes.js'));
// app.use('/api/notification', require('./routes/notificationRoutes.js'));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});