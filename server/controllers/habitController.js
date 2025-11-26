const Habit = require("../models/Habit");

// Create a new habit
const createHabit = async (req, res) => {
  const { title } = req.body;

  try {
    await Habit.create({ user: req.user.id, title, checkins: [] });
    res.status(201).json({ msg: "Habit created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating habit" });
  }
};

// Get habits + last checkin
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });

    const formatted = habits.map((h) => ({
      id: h._id,
      title: h.title,
      last_checkin_date: h.checkins.length ? h.checkins[h.checkins.length - 1] : null,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching habits" });
  }
};

// Get habit
const getHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) return res.status(403).json({ msg: "Unauthorized" });

    res.json({ title: habit.title });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching habit" });
  }
};

// Check-in habit
const checkHabit = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) return res.status(403).json({ msg: "Unauthorized" });

    if (!habit.checkins.includes(today)) {
      habit.checkins.push(today);
      await habit.save();
    }

    res.json({ msg: "Habit checked in for today" });
  } catch (err) {
    res.status(500).json({ msg: "Error checking habit" });
  }
};

// Delete habit
const deleteHabit = async (req, res) => {
  try {
    const deleted = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) return res.status(403).json({ msg: "Unauthorized" });

    res.json({ msg: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting habit" });
  }
};

// Get habit history
const getHistory = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) return res.status(403).json({ msg: "Unauthorized" });

    res.json(habit.checkins.reverse());
  } catch (err) {
    res.status(500).json({ msg: "Error fetching history" });
  }
};

module.exports = {
  createHabit,
  getHabits,
  getHabit,
  checkHabit,
  deleteHabit,
  getHistory,
};
