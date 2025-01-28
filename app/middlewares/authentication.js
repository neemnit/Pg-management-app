require("dotenv").config();
const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  try {
    // Extract token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token part
    console.log(token, "Extracted Token");

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "Decoded Payload");

    // Attach decoded payload to request for downstream use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err, "JWT Error");
    const message =
      err.name === "TokenExpiredError"
        ? "Token has expired."
        : "Invalid token.";
    return res.status(403).json({ message });
  }
}

module.exports = authentication;
