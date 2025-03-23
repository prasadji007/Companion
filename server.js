// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const authRoutes = require("./auth");
const paymentRoutes = require("./payments");
const socketIo = require("socket.io");
const http = require("http");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

// Database setup
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

app.use(cors());
app.use(express.json());

// pEER MAKING PROCESS 
app.use("peer",peerRoutes);





// Routes
app.use("/auth", authRoutes);
app.use("/payments", paymentRoutes);

// WebSocket Handling
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    
    socket.on("message", (data) => {
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
