const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
dotenv.config();
const authRoutes = require("./routes/auth");
const habitRoutes = require("./routes/habit");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/habits",habitRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});

