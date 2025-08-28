const db = require("../db");
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
   const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const {
    username, password, name, email, phone,
    gender, roleId, SapUserName, SapUserCode 
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(
      `INSERT INTO "${companyDB}"."USERS" (USERNAME, PASSWORD, NAME, EMAIL, PHONE, GENDER, ROLEID, SAPUSERNAME, SAPUSERCODE, SAPPASSWORD)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, name, email, phone, gender, roleId, SapUserName, SapUserCode, password]
    );

    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};


exports.getUserById = async (req, res) => {
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const userId = req.params.id;

  try {
    const [userRow] = await db.query(`SELECT * FROM "${companyDB}"."USERS" WHERE id = ?`, [userId]);
    if (!userRow) return res.status(404).json({ error: "User not found" });

    const user = { ...userRow };

    res.json(user);
  } catch (err) {
    console.error("Failed to get user by ID:", err);
    res.status(500).json({ error: "Failed to get user" });
  }
};


exports.getuser = async (req, res) => {
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const users = await db.query(`
      SELECT 
        u.* FROM "${companyDB}"."USERS" u
    `);

    const parsedUsers = users;

    res.json(parsedUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to get users" });
  }
};


exports.getNextUserId = async (req, res) => {
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const result = await db.query(`SELECT MAX(id) + 1 AS nextId FROM "${companyDB}"."USERS"`);
    const nextId = result[0]?.NEXTID || result[0]?.nextId || 1;
    res.json({ nextId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get next user ID' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const {
    username, name, email, phone,
    gender, roleId
  } = req.body;

  try {
    // Update basic user fields
    await db.query(
      `UPDATE "${companyDB}"."USERS" SET username = ?, name = ?, email = ?, phone = ?, gender = ?, roleId = ?
       WHERE id = ?`,
      [username, name, email, phone, gender, roleId, userId]
    );

    res.json({ message: "User updated successfully" });

  } catch (err) {
    console.error("Failed to update user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {

    await db.query(`DELETE FROM "${companyDB}"."USERS" WHERE id = ?`, [userId]);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Failed to delete user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

