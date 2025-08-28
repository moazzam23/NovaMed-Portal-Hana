const db = require("../db");

exports.createRecipient = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  const { documentType, eventType, emails } = req.body;

  if (!documentType || !eventType || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    for (const email of emails) {
      await db.query(
        `INSERT INTO "${companyDB}"."EMAILRECIPIENTS" (documentType, eventType, email) VALUES (?, ?, ?)`,
        [documentType, eventType, email]
      );
    }
    res.status(201).json({ message: "Recipients added" });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: "Failed to add recipients" });
  }
};

exports.getAllRecipients = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  try {
    const rows = await db.query(`SELECT * FROM "${companyDB}"."EMAILRECIPIENTS"`);

    const grouped = {};
    for (const row of rows) {
      const key = `${row.DOCUMENTTYPE}_${row.EVENTTYPE}`;
      if (!grouped[key]) {
        grouped[key] = {
          id: row.ID,
          documentType: row.DOCUMENTTYPE,
          eventType: row.EVENTTYPE,
          emails: [],
        };
      }
      grouped[key].emails.push(row.EMAIL);
    }

    res.json(Object.values(grouped));
  } catch (err) {
    console.error("Fetch all error:", err);
    res.status(500).json({ error: "Failed to fetch recipients" });
  }
};

exports.getRecipientById = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  const { id } = req.params;

  try {
    const [record] = await db.query(`SELECT * FROM "${companyDB}"."EMAILRECIPIENTS" WHERE id = ?`, [id]);
    if (!record) return res.status(404).json({ error: "Recipient not found" });

    const emails = await db.query(
      `SELECT email FROM "${companyDB}"."EMAILRECIPIENTS" WHERE documentType = ? AND eventType = ?`,
      [record.DOCUMENTTYPE, record.EVENTTYPE]
    );

    res.json({
      id: record.ID,
      documentType: record.DOCUMENTTYPE,
      eventType: record.EVENTTYPE,
      emails: emails.map(e => e.EMAIL),
    });
  } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch recipient" });
  }
};

exports.updateRecipient = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  const { id } = req.params;
  const { documentType, eventType, emails } = req.body;

  if (!documentType || !eventType || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [record] = await db.query(`SELECT * FROM "${companyDB}"."EMAILRECIPIENTS" WHERE id = ?`, [id]);
    if (!record) return res.status(404).json({ error: "Recipient not found" });

    await db.query(
      `DELETE FROM "${companyDB}"."EMAILRECIPIENTS" WHERE documentType = ? AND eventType = ?`,
      [record.DOCUMENTTYPE, record.EVENTTYPE]
    );

    for (const email of emails) {
      await db.query(
        `INSERT INTO "${companyDB}"."EMAILRECIPIENTS" (documentType, eventType, email) VALUES (?, ?, ?)`,
        [documentType, eventType, email]
      );
    }

    res.json({ message: "Recipients updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update recipients" });
  }
};

exports.deleteRecipient = async (req, res) => {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  const { id } = req.params;

  try {
    const [record] = await db.query(`SELECT * FROM "${companyDB}"."EMAILRECIPIENTS" WHERE id = ?`, [id]);
    if (!record) return res.status(404).json({ error: "Recipient not found" });

    await db.query(
      `DELETE FROM "${companyDB}"."EMAILRECIPIENTS" WHERE documentType = ? AND eventType = ?`,
      [record.DOCUMENTTYPE, record.EVENTTYPE]
    );

    res.json({ message: "Recipients deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete recipients" });
  }
};

async function getEmailRecipients(documentType, eventType) {
       const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  try {
    const rows = await db.query(
      `SELECT email FROM "${companyDB}"."EMAILRECIPIENTS" WHERE documentType = ? AND eventType = ?`,
      [documentType, eventType]
    );
    return rows.map(r => r.EMAIL);
  } catch (err) {
    console.error("Email config error:", err.message);
    return [];
  }
}

exports.getEmailRecipients = getEmailRecipients;
