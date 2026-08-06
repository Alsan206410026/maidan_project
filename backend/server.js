const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");

dotenv.config();

const connectDB = require("./config/db");
const sessionMiddleware = require("./middleware/sessionmiddleware");

const updatetournamentstatus = require("./jobs/updatetournamentstatus.job.js");
const pendingremove = require("./jobs/pendingremove.js");


// Socket imports
const { initializeSocket } = require("./config/socket");
const socketHandler = require("./socket/socketHandler");


connectDB();


const app = express();


// Cron Job Function Definition
const startTournamentCron = () => {

    // Runs every day at midnight (00:00)
    cron.schedule("0 0 * * *", async () => {

        console.log("[CRON] Running scheduled tournament date check...");

        await updatetournamentstatus();

    });


    console.log("Tournament status cron job initialized.");

};



// Cron Job for Pending Booking Cleanup
cron.schedule("*/3 * * * *", async () => {

    console.log("[CRON] Running scheduled pending booking cleanup...");

    await pendingremove();

});



// Execute cron initialization
updatetournamentstatus();

startTournamentCron();



// Middleware
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


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

app.use("/api/tournament", require("./routes/tournamentRoutes"));

app.use("/api/booking", require("./routes/bookingRoutes"));

app.use("/api/timeslot", require("./routes/timeSlotRoutes"));

app.use("/api/users", require("./routes/GetAdminForChat.Routes.js"));

app.use("/api/admin-chat", require("./routes/AdminChat.routes"));

app.use("/api/esewa", require("./routes/esewaRoutes"));

app.use("/api/messages", require("./routes/message.routes.js"));




// Create HTTP server
const PORT = process.env.PORT || 5001;


const server = http.createServer(app);


// Initialize Socket.IO
const io = initializeSocket(server);


// Register socket events
socketHandler(io);



// Start Server
server.listen(PORT, () => {

    console.log(`Server running on ${PORT}`);

});