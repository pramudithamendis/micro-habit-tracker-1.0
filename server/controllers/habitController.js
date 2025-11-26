const db = require("../config/db");

// Create a new habit
const createHabit = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  try {
    await db.promise().query("INSERT INTO habits (user_id, title) VALUES (?, ?)", [userId, title]);
    res.status(201).json({ msg: "Habit created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating habit" });
  }
};

// Get all habits for logged-in user
// const getHabits = async (req, res) => {
//     const userId = req.user.id;

//     try {
//         const [habits] = await db.promise().query("SELECT * FROM habits WHERE user_id = ?", [userId]);
//         res.status(200).json(habits);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Error fetching habits" });
//     }
// };

// Modified getHabits
const getHabits = async (req, res) => {
  const userId = req.user.id; // From verifyToken

  try {
    const [habits] = await db.promise().query(
      `SELECT h.id, h.title, MAX(c.checkin_date) AS last_checkin_date
           FROM habits h
           LEFT JOIN habit_checkins c ON h.id = c.habit_id
           WHERE h.user_id = ?
           GROUP BY h.id`,
      [userId]
    );

    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching habits" });
  }
};

// Mark habit as checked-in today
const checkHabit = async (req, res) => {
  const habitId = req.params.id;
  const userId = req.user.id;
  const today = new Date().toISOString().split("T")[0];

  try {
    const [exists] = await db.promise().query("SELECT * FROM habits WHERE id = ? AND user_id = ?", [habitId, userId]);
    if (!exists.length) return res.status(403).json({ msg: "Unauthorized" });

    await db.promise().query("INSERT IGNORE INTO habit_checkins (habit_id, checkin_date) VALUES (?, ?)", [habitId, today]);
    res.status(200).json({ msg: "Habit checked in for today" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error checking habit" });
  }
};

// Delete a habit
const deleteHabit = async (req, res) => {
  const habitId = req.params.id;
  const userId = req.user.id;

  try {
    const [exists] = await db.promise().query("SELECT * FROM habits WHERE id = ? AND user_id = ?", [habitId, userId]);
    if (!exists.length) return res.status(403).json({ msg: "Unauthorized" });

    await db.promise().query("DELETE FROM habits WHERE id = ?", [habitId]);
    res.status(200).json({ msg: "Habit deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting habit" });
  }
};

// Get a habit
const getHabit = async (req, res) => {
  const habitId = req.params.id;
  const userId = req.user.id;

  try {
    const [rows] = await db.promise().query("SELECT title FROM habits WHERE id = ? AND user_id = ?", [habitId, userId]);

    if (!rows.length) return res.status(403).json({ msg: "Unauthorized" });

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching habit" });
  }
};

// Get habit history
const getHistory = async (req, res) => {
  const habitId = req.params.id;
  const userId = req.user.id;
  try {
    const [exists] = await db.promise().query("SELECT * FROM habits WHERE id = ? AND user_id = ?", [habitId, userId]);
    if (!exists.length) return res.status(403).json({ msg: "Unauthorized" });

    const [rows] = await db.promise().query("SELECT checkin_date FROM habit_checkins WHERE habit_id = ? ORDER BY checkin_date DESC", [habitId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching history" });
  }
};

module.exports = { createHabit, getHabits, getHabit, checkHabit, deleteHabit, getHistory };
