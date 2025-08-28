// const db = require("../db");

// // Create Email Template
// exports.createEmailTemplate = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

//   const {
//     customerName,
//     emailSubject,
//     emailBody,
//     emailSignature,
//     attachmentName
//   } = req.body;

//   try {
//     await db.query(
//       `INSERT INTO "${companyDB}"."EMAIL_TEMPLATE"
//         (CUSTOMER_NAME, EMAIL_SUBJECT, EMAIL_BODY, EMAIL_SIGNATURE, ATTACHMENT_NAME)
//        VALUES (?, ?, ?, ?, ?, ?)`,
//        [customerName, emailSubject, emailBody, emailSignature, attachmentName]
//     );

//     res.status(201).json({ message: "Email template created successfully" });
//   } catch (err) {
//     console.error("Failed to create email template:", err);
//     res.status(500).json({ error: "Failed to create email template" });
//   }
// };

// // Get All Email Templates
// exports.getEmailTemplates = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

//   try {
//     const templates = await db.query(`SELECT * FROM "${companyDB}"."EMAIL_TEMPLATE"`);
//     res.json(templates);
//   } catch (err) {
//     console.error("Error fetching email templates:", err);
//     res.status(500).json({ error: "Failed to get email templates" });
//   }
// };

// // Get Email Template By ID
// exports.getEmailTemplateById = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

//   const templateId = req.params.id;

//   try {
//     const [row] = await db.query(
//       `SELECT * FROM "${companyDB}"."EMAIL_TEMPLATE" WHERE ID = ?`,
//       [templateId]
//     );

//     if (!row) return res.status(404).json({ error: "Email template not found" });

//     res.json(row);
//   } catch (err) {
//     console.error("Failed to get email template:", err);
//     res.status(500).json({ error: "Failed to get email template" });
//   }
// };

// // Update Email Template
// exports.updateEmailTemplate = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

//   const templateId = req.params.id;
//   const {
//     customerName,
//     emailSubject,
//     emailBody,
//     emailSignature,
//     attachmentName
//   } = req.body;

//   try {
//     await db.query(
//       `UPDATE "${companyDB}"."EMAIL_TEMPLATE"
//        SET CUSTOMER_NAME = ?, EMAIL_SUBJECT = ?, EMAIL_BODY = ?, EMAIL_SIGNATURE = ?, ATTACHMENT_NAME = ?, UPDATED_AT = CURRENT_TIMESTAMP
//        WHERE ID = ?`,
//       [customerName, emailSubject, emailBody, emailSignature, attachmentName, templateId]
//     );

//     res.json({ message: "Email template updated successfully" });
//   } catch (err) {
//     console.error("Failed to update email template:", err);
//     res.status(500).json({ error: "Failed to update email template" });
//   }
// };

// // Delete Email Template
// exports.deleteEmailTemplate = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

//   const templateId = req.params.id;

//   try {
//     await db.query(
//       `DELETE FROM "${companyDB}"."EMAIL_TEMPLATE" WHERE ID = ?`,
//       [templateId]
//     );

//     res.json({ message: "Email template deleted successfully" });
//   } catch (err) {
//     console.error("Failed to delete email template:", err);
//     res.status(500).json({ error: "Failed to delete email template" });
//   }
// };
const db = require("../db");

// Create Email Template
exports.createEmailTemplate = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const {
    customerName,
    emailSubject,
    emailBody,
    emailSignature,
    attachmentName,
    signatureAttachment // <-- base64 or buffer expected
  } = req.body;

  try {
    await db.query(
      `INSERT INTO "${companyDB}"."EMAIL_TEMPLATE"
        (CUSTOMER_NAME, EMAIL_SUBJECT, EMAIL_BODY, EMAIL_SIGNATURE, SIGNATURE_ATTACHMENT, ATTACHMENT_NAME)
       VALUES (?, ?, ?, ?, ?, ?)`,
       [
         customerName,
         emailSubject,
         emailBody,
         emailSignature,
         signatureAttachment ? Buffer.from(signatureAttachment, "base64") : null,
         attachmentName
       ]
    );

    res.status(201).json({ message: "Email template created successfully" });
  } catch (err) {
    console.error("Failed to create email template:", err);
    res.status(500).json({ error: "Failed to create email template" });
  }
};

// Get All Email Templates
exports.getEmailTemplates = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const templates = await db.query(`SELECT * FROM "${companyDB}"."EMAIL_TEMPLATE"`);

    // Convert BLOB to base64 for frontend
    const formatted = templates.map(t => ({
      ...t,
      SIGNATURE_ATTACHMENT: t.SIGNATURE_ATTACHMENT 
        ? t.SIGNATURE_ATTACHMENT.toString("base64") 
        : null
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching email templates:", err);
    res.status(500).json({ error: "Failed to get email templates" });
  }
};

// Get Email Template By ID
exports.getEmailTemplateById = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const templateId = req.params.id;

  try {
    const [row] = await db.query(
      `SELECT * FROM "${companyDB}"."EMAIL_TEMPLATE" WHERE ID = ?`,
      [templateId]
    );

    if (!row) return res.status(404).json({ error: "Email template not found" });

    // Convert blob to base64
    if (row.SIGNATURE_ATTACHMENT) {
      row.SIGNATURE_ATTACHMENT = row.SIGNATURE_ATTACHMENT.toString("base64");
    }

    res.json(row);
  } catch (err) {
    console.error("Failed to get email template:", err);
    res.status(500).json({ error: "Failed to get email template" });
  }
};

// Update Email Template
exports.updateEmailTemplate = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const templateId = req.params.id;
  const {
    customerName,
    emailSubject,
    emailBody,
    emailSignature,
    attachmentName,
    signatureAttachment
  } = req.body;

  try {
    await db.query(
      `UPDATE "${companyDB}"."EMAIL_TEMPLATE"
       SET CUSTOMER_NAME = ?, EMAIL_SUBJECT = ?, EMAIL_BODY = ?, EMAIL_SIGNATURE = ?, 
           SIGNATURE_ATTACHMENT = ?, ATTACHMENT_NAME = ?, UPDATED_AT = CURRENT_TIMESTAMP
       WHERE ID = ?`,
      [
        customerName,
        emailSubject,
        emailBody,
        emailSignature,
        signatureAttachment ? Buffer.from(signatureAttachment, "base64") : null,
        attachmentName,
        templateId
      ]
    );

    res.json({ message: "Email template updated successfully" });
  } catch (err) {
    console.error("Failed to update email template:", err);
    res.status(500).json({ error: "Failed to update email template" });
  }
};

// Delete Email Template
exports.deleteEmailTemplate = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const templateId = req.params.id;

  try {
    await db.query(
      `DELETE FROM "${companyDB}"."EMAIL_TEMPLATE" WHERE ID = ?`,
      [templateId]
    );

    res.json({ message: "Email template deleted successfully" });
  } catch (err) {
    console.error("Failed to delete email template:", err);
    res.status(500).json({ error: "Failed to delete email template" });
  }
};


// Attach Template to Customer
// exports.attachTemplateToCustomer = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

//   const { customerCode, templateId } = req.body;

//   if (!customerCode || !templateId) {
//     return res.status(400).json({ message: "customerCode and templateId are required" });
//   }

//   try {
//     // Check if customer already has a template
//     const check = await db.query(
//       `SELECT TEMPLATE_ID FROM "${companyDB}"."CUSTOMER_TEMPLATE"
//        WHERE CUSTOMER_CODE = ?`,
//       [customerCode]
//     );

//     if (check.length > 0) {
//       // Update existing mapping
//       await db.query(
//         `UPDATE "${companyDB}"."CUSTOMER_TEMPLATE"
//          SET TEMPLATE_ID = ?
//          WHERE CUSTOMER_CODE = ?`,
//         [templateId, customerCode]
//       );

//       return res.status(200).json({ message: "Template updated for customer successfully" });
//     } else {
//       // Insert new mapping
//       await db.query(
//         `INSERT INTO "${companyDB}"."CUSTOMER_TEMPLATE"
//          (CUSTOMER_CODE, TEMPLATE_ID)
//          VALUES (?, ?)`,
//         [customerCode, templateId]
//       );

//       return res.status(201).json({ message: "Template attached to customer successfully" });
//     }
//   } catch (err) {
//     console.error("Failed to attach template to customer:", err);
//     res.status(500).json({ error: "Failed to attach template to customer" });
//   }
// };


// exports.attachTemplateToCustomer = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) {
//     return res.status(400).json({ message: "Missing companyDB" });
//   }

//   const { payload } = req.body;
//   if (!payload) {
//     return res.status(400).json({ message: "Missing payload" });
//   }

//   const { customerCode, templateId } = payload;

//   if (!customerCode || !templateId) {
//     return res.status(400).json({ message: "customerCode and templateId are required" });
//   }

//   // split comma separated string into array
//   const customers = customerCode.split(",").map(c => c.trim()).filter(Boolean);

//   try {
//     for (const code of customers) {
//       // Check if this customer already has a mapping
//       const check = await db.query(
//         `SELECT ID FROM "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
//          WHERE CUSTOMER_CODE = ? AND ACTIVE = 'Y'`,
//         [code]
//       );

//       if (check.length > 0) {
//         // Update existing mapping
//         await db.query(
//           `UPDATE "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
//            SET TEMPLATE_ID = ?
//            WHERE CUSTOMER_CODE = ? AND ACTIVE = 'Y'`,
//           [templateId, code]
//         );
//       } else {
//         // Insert new mapping
//         await db.query(
//           `INSERT INTO "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
//            (CUSTOMER_CODE, TEMPLATE_ID, ACTIVE)
//            VALUES (?, ?, 'Y')`,
//           [code, templateId]
//         );
//       }
//     }

//     return res.status(200).json({ message: "Template(s) assigned to customer(s) successfully" });
//   } catch (err) {
//     console.error("Failed to attach template to customer:", err);
//     res.status(500).json({ error: "Failed to attach template(s)" });
//   }
// };


exports.attachTemplateToCustomer = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) {
    return res.status(400).json({ message: "Missing companyDB" });
  }

  const payload = req.body.payload;
  if (!Array.isArray(payload) || payload.length === 0) {
    return res.status(400).json({ message: "Payload must be a non-empty array" });
  }

  try {
    for (const { customerCode, templateId, email } of payload) {
      if (!customerCode || !templateId) continue;

      const check = await db.query(
        `SELECT ID FROM "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
         WHERE CUSTOMER_CODE = ? AND ACTIVE = 'Y'`,
        [customerCode]
      );

      if (check.length > 0) {
        await db.query(
          `UPDATE "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
           SET TEMPLATE_ID = ?, EMAIL = ?
           WHERE CUSTOMER_CODE = ? AND ACTIVE = 'Y'`,
          [templateId, email, customerCode]
        );
      } else {
        await db.query(
          `INSERT INTO "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
           (CUSTOMER_CODE, TEMPLATE_ID, EMAIL, ACTIVE)
           VALUES (?, ?, ?, 'Y')`,
          [customerCode, templateId, email]
        );
      }
    }

    return res.status(200).json({ message: "Template(s) assigned to customer(s) successfully" });
  } catch (err) {
    console.error("Failed to attach template to customer:", err);
    res.status(500).json({ error: "Failed to attach template(s)" });
  }
};


// exports.attachTemplateToCustomer = async (req, res) => {
//   const { companyDB } = req.query;
//   if (!companyDB) {
//     return res.status(400).json({ message: "Missing companyDB" });
//   }

//   const { payload } = req.body;
//   if (!payload) {
//     return res.status(400).json({ message: "Missing payload" });
//   }

//   console.log(payload)

//   const { customerCode, templateId ,email} = payload;

//   if (!customerCode || !templateId) {
//     return res.status(400).json({ message: "customerCode and templateId are required" });
//   }

//   // split comma separated string into array
//   const customers = customerCode.split(",").map(c => c.trim()).filter(Boolean);
//     // const customers = customerCode.split(",").map(c => c.trim()).filter(Boolean);

//   try {
//     for (const code of customers) {
//       // Check if this customer already has a mapping
//       const check = await db.query(
//         `SELECT ID FROM "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
//          WHERE CUSTOMER_CODE = ? AND ACTIVE = 'Y'`,
//         [code]
//       );

//       if (check.length > 0) {
//         // Update existing mapping
//         await db.query(
//           `UPDATE "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
//            SET TEMPLATE_ID = ?, EMAIL = ?
//            WHERE CUSTOMER_CODE = ? AND ACTIVE = 'Y'`,
//           [templateId, email, code]
//         );
//       } else {
//         // Insert new mapping
//         await db.query(
//           `INSERT INTO "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
//            (CUSTOMER_CODE, TEMPLATE_ID, EMAIL, ACTIVE)
//            VALUES (?, ?, ?, 'Y')`,
//           [code, templateId,email]
//         );
//       }
//     }

//     return res.status(200).json({ message: "Template(s) assigned to customer(s) successfully" });
//   } catch (err) {
//     console.error("Failed to attach template to customer:", err);
//     res.status(500).json({ error: "Failed to attach template(s)" });
//   }
// };


// Get assigned template for a customer (by code)
exports.getCustomerTemplate = async (req, res) => {
  const { companyDB } = req.query;
  // const { customerCode } = req.params; // e.g. /api/customer-template/:customerCode

  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  // if (!customerCode) return res.status(400).json({ message: "Missing customerCode" });

  try {
    const rows = await db.query(
      `SELECT cet.CUSTOMER_CODE,
              et.CUSTOMER_NAME AS TEMPLATE_NAME
             FROM "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE" cet
       JOIN "${companyDB}"."EMAIL_TEMPLATE" et
         ON cet.TEMPLATE_ID = et.ID
       WHERE cet.ACTIVE = 'Y'`,
      // [customerCode]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No active template found for this customer" });
    }

    // Format: convert BLOB to base64
    const formatted = rows.map(r => ({
      CUSTOMER_CODE: r.CUSTOMER_CODE,
      TEMPLATE_NAME: r.TEMPLATE_NAME,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching customer template:", err);
    res.status(500).json({ error: "Failed to get customer template" });
  }

};










//logs

exports.getlogs = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const templates = await db.query(`SELECT * FROM "${companyDB}"."EMAIL_APPROVAL_LOGS"`);

    res.json(templates);
  } catch (err) {
    console.error("Error fetching email templates:", err);
    res.status(500).json({ error: "Failed to get email templates" });
  }
};