const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

exports.loginUser = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const { username, password } = req.body;

  try {
    const [user] = await db.query(`SELECT * FROM "${companyDB}"."USERS" WHERE "USERNAME" = ?`, [username]);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(password, user.PASSWORD);
    if (!passwordMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.ID, username: user.USERNAME, roleId: user.ROLEID },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.ID,
        username: user.USERNAME,
        name: user.NAME,
        email: user.EMAIL,
        roleId: user.ROLEID,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};


exports.getLoggedInUser = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await db.query(`SELECT ID, USERNAME, NAME, EMAIL, PHONE, GENDER, ROLEID, SAPUSERNAME, SAPPASSWORD, SAPUSERCODE FROM "${companyDB}"."USERS"  WHERE ID = ?`, [decoded.id]);
    if (!user) return res.status(404).json({ error: "User not found" });
console.log(user)
    res.json(user);
  } catch (err) {
    console.error("Token error:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};