const jwt = require("jsonwebtoken");

const verifyPlus = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Plus verification BEFORE next()
    if (decoded.id == 23) {
      return res.status(403).json({ msg: "You are not a Plus user" });
    }

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = verifyPlus;
