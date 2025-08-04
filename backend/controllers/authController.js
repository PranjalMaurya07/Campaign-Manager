const db = require("../config/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length > 0)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        (err, result) => {
          if (err)
            return res.status(500).json({ message: "User creation failed" });
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  );
};

const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = results[0];
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email },
      });
    }
  );
};

module.exports = { signup, login };
