const db = require("../db");

// exports.createApprovalTemplate = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

//   const { userId, templateName, status } = req.body;

//   try {
//     await db.query(
//       `INSERT INTO "${companyDB}"."APPROVAL_TEMPLATE" (USER_ID, TEMPLATE_NAME, STATUS)
//        VALUES (?, ?, ?)`,
//       [userId, templateName, status || "ACTIVE"]
//     );

//     res.status(201).json({ message: "Approval Template created successfully" });
//   } catch (err) {
//     console.error("Error creating approval template:", err);
//     res.status(500).json({ error: "Failed to create approval template" });
//   }
// };


exports.createApprovalTemplate = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  let { userId, templateName, status } = req.body;
  // userId here is an array

  try {
    // Convert array → JSON string before inserting
    const usersString = JSON.stringify(userId);

    await db.query(
      `INSERT INTO "${companyDB}"."EMAIL_APPROVAL_TEMPLATE" (USER_ID, TEMPLATE_NAME, STATUS)
       VALUES (?, ?, ?)`,
      [usersString, templateName, status || "ACTIVE"]
    );

    res.status(201).json({ message: "Approval Template created successfully" });
  } catch (err) {
    console.error("Error creating approval template:", err);
    res.status(500).json({ error: "Failed to create approval template" });
  }
};


// exports.getApprovalTemplates = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

//   try {
//     const templates = await db.query(
//       `SELECT at.ID, at.TEMPLATE_NAME, at.STATUS, at.CREATED_AT, u.NAME as USER_NAME
//        FROM "${companyDB}"."EMAIL_APPROVAL_TEMPLATE" at
//        LEFT JOIN "${companyDB}"."USERS" u ON at.USER_ID = u.ID`
//     );

//     res.json(templates);
//   } catch (err) {
//     console.error("Error fetching approval templates:", err);
//     res.status(500).json({ error: "Failed to get approval templates" });
//   }
// };


exports.getApprovalTemplates = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const rows = await db.query(
      `SELECT ID, TEMPLATE_NAME, STATUS, CREATED_AT, USER_ID
       FROM "${companyDB}"."EMAIL_APPROVAL_TEMPLATE"`
    );

    // Fetch all users once
    const users = await db.query(
      `SELECT ID, NAME FROM "${companyDB}"."USERS"`
    );

    const templates = rows.map((row) => {
      const ids = row.USER_ID ? JSON.parse(row.USER_ID) : [];
      const approvers = users.filter(u => ids.includes(u.ID));
      return {
        ...row,
        USER_ID: ids,
        APPROVERS: approvers  // array of { ID, NAME }
      };
    });

    res.json(templates);
  } catch (err) {
    console.error("Error fetching approval templates:", err);
    res.status(500).json({ error: "Failed to get approval templates" });
  }
};


// PATCH /api/email-approval/:id/status?companyDB=DBNAME
exports.updateApprovalTemplateStatus = async (req, res) => {
  const { companyDB } = req.query;
  const { id } = req.params;
  const { status } = req.body; // e.g. "ACTIVE" or "INACTIVE"

  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  if (!id) return res.status(400).json({ message: "Missing template ID" });

  try {
    await db.query(
      `UPDATE "${companyDB}"."EMAIL_APPROVAL_TEMPLATE"
       SET STATUS = ?
       WHERE ID = ?`,
      [status, id]
    );

    res.json({ message: "Approval template status updated" });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update approval template status" });
  }
};


exports.getApprovalTemplateById = async (req, res) => {
  const { companyDB } = req.query;
  const { id } = req.params;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const [template] = await db.query(
      `SELECT at.ID, at.TEMPLATE_NAME, at.STATUS, at.CREATED_AT, u.NAME as USER_NAME
       FROM "${companyDB}"."EMAIL_APPROVAL_TEMPLATE" at
       LEFT JOIN "${companyDB}"."USERS" u ON at.USER_ID = u.ID
       WHERE at.ID = ?`,
      [id]
    );

    if (!template) return res.status(404).json({ error: "Approval Template not found" });

    res.json(template);
  } catch (err) {
    console.error("Error fetching approval template:", err);
    res.status(500).json({ error: "Failed to get approval template" });
  }
};

exports.updateApprovalTemplate = async (req, res) => {
  const { companyDB } = req.query;
  const { id } = req.params;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const { userId, templateName, status } = req.body;

  try {
    await db.query(
      `UPDATE "${companyDB}"."EMAIL_APPROVAL_TEMPLATE"
       SET USER_ID = ?, TEMPLATE_NAME = ?, STATUS = ?
       WHERE ID = ?`,
      [userId, templateName, status, id]
    );

    res.json({ message: "Approval Template updated successfully" });
  } catch (err) {
    console.error("Error updating approval template:", err);
    res.status(500).json({ error: "Failed to update approval template" });
  }
};

exports.deleteApprovalTemplate = async (req, res) => {
  const { companyDB } = req.query;
  const { id } = req.params;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    await db.query(
      `DELETE FROM "${companyDB}"."EMAIL_APPROVAL_TEMPLATE" WHERE ID = ?`,
      [id]
    );

    res.json({ message: "Approval Template deleted successfully" });
  } catch (err) {
    console.error("Error deleting approval template:", err);
    res.status(500).json({ error: "Failed to delete approval template" });
  }
};