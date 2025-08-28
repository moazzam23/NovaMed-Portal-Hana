const db = require("../db");

// Get all email setups
exports.getAll = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  try {
    const result = await db.query(`SELECT * FROM "${companyDB}"."EMAILSETUP"`);
    res.json(result);
  } catch (error) {
    console.error("Error fetching email setups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get email setup by ID
exports.getById = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  try {
    const result = await db.query(
      `SELECT * FROM "${companyDB}"."EMAILSETUP" WHERE id = ?`,
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Email setup not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching email setup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create new email setup
exports.create = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  const {
    senderEmail,
    smtpServer,
    port,
    username,
    password,
    ccEmails
  } = req.body;

  if (!senderEmail || !smtpServer || !port || !username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await db.query(
      `INSERT INTO "${companyDB}"."EMAILSETUP" (senderEmail, smtpHost, smtpPort, smtpUser, smtpPassword, ccEmails)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [senderEmail, smtpServer, port, username, password, ccEmails]
    );

    res.json({ message: "Email setup created successfully" });
  } catch (error) {
    console.error("Error creating email setup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update email setup
exports.update = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  const {
    senderEmail,
    smtpServer,
    port,
    username,
    password,
    ccEmails
  } = req.body;

  try {
    await db.query(
      `UPDATE "${companyDB}"."EMAILSETUP"
       SET senderEmail = ?, smtpHost = ?, smtpPort = ?, smtpUser = ?, smtpPassword = ?, ccEmails = ?
       WHERE id = ?`,
      [senderEmail, smtpServer, port, username, password, ccEmails, req.params.id]
    );

    res.json({ message: "Email setup updated successfully" });
  } catch (error) {
    console.error("Error updating email setup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete email setup
exports.remove = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  try {
    await db.query(`DELETE FROM "${companyDB}"."EMAILSETUP" WHERE id = ?`, [req.params.id]);
    res.json({ message: "Email setup deleted successfully" });
  } catch (error) {
    console.error("Error deleting email setup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
