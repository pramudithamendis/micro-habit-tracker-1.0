const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
    createHabit,
    getHabits,
    getHabit,
    checkHabit,
    deleteHabit,
    getHistory,
} = require("../controllers/habitController");

router.post("/", verifyToken, createHabit);
router.get("/", verifyToken, getHabits);
router.get("/:id", verifyToken, getHabit);
router.put("/:id/check", verifyToken, checkHabit);
router.delete("/:id", verifyToken, deleteHabit);
router.get("/:id/history", verifyToken, getHistory);

module.exports = router;
