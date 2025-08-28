const db = require("../db");

async function logEmailApproval({ companyDB, requestId, docType, action, message, details }) {
  return new Promise((resolve, reject) => {
    try {
      // Connect if not already connected (better: manage a pool)
      const sql = `
        INSERT INTO "${companyDB}"."EMAIL_APPROVAL_LOGS"
        ("REQUEST_ID", "DOC_TYPE", "ACTION", "MESSAGE", "DETAILS")
        VALUES (?, ?, ?, ?, ?)
      `;

      const values = [
        requestId,
        docType,
        action,
        message || null,
        typeof details === "object" ? JSON.stringify(details) : details || null,
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error inserting log:", err);
          return reject(err);
        }
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = logEmailApproval;
