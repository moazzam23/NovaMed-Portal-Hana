const db = require("../db");
const logEmailApproval = require("../Utilis/DocumentLogs");
const { sendEmail } = require("../Utilis/Email");

exports.createApprovalRequest = async (req, res) => {
  const { companyDB } = req.query;
  const { fromEmail, toEmails, ccEmails, subject, body, approvalTemplateId } = req.body;
 let requestId;
  try {
    // Convert arrays to comma-separated strings if needed
    const toEmailsStr = Array.isArray(toEmails) ? toEmails.join(",") : toEmails;
    const ccEmailsStr = Array.isArray(ccEmails) ? ccEmails.join(",") : ccEmails;

    // 1. Insert new request with status PENDING
    const insertResult = await db.query(
      `INSERT INTO "${companyDB}"."EMAIL_APPROVAL_REQUEST"
       ("APPROVAL_TEMPLATE_ID","TO_EMAILS","CC_EMAILS","SUBJECT","BODY","STATUS")
       VALUES (?,?,?,?,?,'PENDING')`,
      [approvalTemplateId, toEmailsStr, ccEmailsStr, subject, body]
    );

    // HANA won't return insertId like MySQL → fetch via CURRENT_IDENTITY_VALUE
    const idRow = await db.query(`SELECT CURRENT_IDENTITY_VALUE() AS "ID" FROM DUMMY`);
     requestId = idRow[0]?.ID;

    // 2. Check template is ACTIVE
    const templateRows = await db.query(
      `SELECT "ID", "STATUS", "USER_ID"
       FROM "${companyDB}"."EMAIL_APPROVAL_TEMPLATE"
       WHERE "ID" = ?`,
      [approvalTemplateId]
    );
    const template = templateRows[0];

     if (!template || template.STATUS !== "ACTIVE") {
      await logEmailApproval({
        companyDB,
        requestId,
        docType: "EmailApproval",
        action: "CREATE",
        message: "Template inactive",
        details: req.body
      });
      return res.status(200).json({ message: "Approval request saved but template is inactive", requestId });
    }
    // 3. Parse approvers from template (array of userIds)
    const approvers = JSON.parse(template.USER_ID || "[]");

    if (approvers.length === 0) {
       await logEmailApproval({
        companyDB,
        requestId,
        docType: "Email Approval",
        action: "CREATE",
        message: "No approvers configured",
        details: req.body
      });
      return res.status(200).json({ message: "No approvers configured", requestId });
    }

    // 4. Get approver emails from USERS table
    const userRows = await db.query(
      `SELECT "EMAIL","NAME" 
       FROM "${companyDB}"."USERS" 
       WHERE "ID" IN (${approvers.join(",")})`
    );

    const approverEmails = userRows.map((u) => u.EMAIL).filter(Boolean);

    if (approverEmails.length === 0) {
 await logEmailApproval({
        companyDB,
        requestId,
        docType: "Email Approval",
        action: "CREATE",
        message: "No valid approver emails found",
        details: req.body
      });
      return res.status(200).json({ message: "No valid approver emails found", requestId });   }

    // 5. Send email using frontend subject & body
    await sendEmail(
      approverEmails.join(","),
      subject,
      body
    );

    res.status(201).json({
      message: "Approval request created & sent to approvers",
      requestId,
    });

      await logEmailApproval({
      companyDB,
      requestId,
      docType: "Email Approval",
      action: "CREATE",
      message: "Approval request created & email sent",
      details: { to: approverEmails, subject, body }
    });
  } catch (error) {
      if (requestId) {
      await logEmailApproval({
        companyDB,
        requestId,
        docType: "Email Approval",
        action: "ERROR",
        message: error.message,
        details: error.stack
      });
    }
    console.error("Error creating approval request:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get ALL approval requests
exports.getApprovalRequests = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const rows = await db.query(
      `SELECT * 
       FROM "${companyDB}"."EMAIL_APPROVAL_REQUEST"
       ORDER BY "CREATED_AT" DESC`
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching approval requests:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get only PENDING approval requests
exports.getPendingApprovalRequests = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const rows = await db.query(
      `SELECT * 
       FROM "${companyDB}"."EMAIL_APPROVAL_REQUEST"
       WHERE "STATUS" = 'PENDING'
       ORDER BY "CREATED_AT" DESC`
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching pending approval requests:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



exports.approveRequest = async (req, res) => {
  const { companyDB } = req.query;
  const { requestId } = req.body;

  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  if (!requestId) return res.status(400).json({ message: "Missing requestId" });

  try {
    // 1. Get the approval request
    const requestRows = await db.query(
      `SELECT "TO_EMAILS", "APPROVAL_TEMPLATE_ID", "STATUS"
       FROM "${companyDB}"."EMAIL_APPROVAL_REQUEST"
       WHERE "ID" = ?`,
      [requestId]
    );

    const request = requestRows[0];
     if (!request) {
      await logEmailApproval({
        companyDB,
        requestId,
        docType: "Email Approval",
        action: "APPROVE",
        message: "Request not found",
      });
      return res.status(404).json({ message: "Request not found" });
    }


    // if (!request) return res.status(404).json({ message: "Request not found" });
    // if (request.STATUS !== "PENDING") return res.status(400).json({ message: "Request already processed" });
 if (request.STATUS !== "PENDING") {
      await logEmailApproval({
        companyDB,
        requestId,
        docType: "Email Approval",
        action: "APPROVE",
        message: "Request already processed",
        details: { status: request.STATUS },
      });
      return res.status(400).json({ message: "Request already processed" });
    }
    const toEmails = request.TO_EMAILS.split(",").map(e => e.trim()).filter(Boolean);
    // const templateId = request.APPROVAL_TEMPLATE_ID;
 // 1. Match provided toEmails against CUSTOMER_EMAIL_TEMPLATE
    const placeholders = toEmails.map(() => "?").join(",");
    const mappingRows = await db.query(
      `SELECT "TEMPLATE_ID", "EMAIL"
       FROM "${companyDB}"."CUSTOMER_EMAIL_TEMPLATE"
       WHERE  "ACTIVE" = 'Y'
         AND "EMAIL" IN (${placeholders})`,
      [ ...toEmails]
    );

    // if (mappingRows.length === 0) {
    //   return res.status(404).json({ message: "No matching template recipients found" });
    // }

    if (mappingRows.length === 0) {
      await logEmailApproval({
        companyDB,
        requestId,
        docType: "Email Approval",
        action: "APPROVE",
        message: "No matching template recipients found",
        details: { toEmails },
      });
      return res.status(404).json({ message: "No matching template recipients found" });
    }

    // 2. Get templateId from mapping
    const templateId = mappingRows[0].TEMPLATE_ID;

    // 3. Fetch email template details
    const templateRows = await db.query(
      `SELECT "EMAIL_SUBJECT", "EMAIL_BODY", "EMAIL_SIGNATURE", "SIGNATURE_ATTACHMENT"
       FROM "${companyDB}"."EMAIL_TEMPLATE"
       WHERE "ID" = ?`,
      [templateId]
    );

    const template = templateRows[0];
    // if (!template) {
    //   return res.status(404).json({ message: "Email template not found" });
    // }

      if (!template) {
      await logEmailApproval({
        companyDB,
        requestId,
        docType: "Email Approval",
        action: "APPROVE",
        message: "Email template not found",
        details: { templateId },
      });
      return res.status(404).json({ message: "Email template not found" });
    }

    const attachment = prepareAttachment(template.SIGNATURE_ATTACHMENT);

    // 4. Send email to each recipient individually
    for (const row of mappingRows) {
      const email = row.EMAIL;

      const finalBody = `
        ${template.EMAIL_BODY || ""}
        
        ${template.EMAIL_SIGNATURE || ""}
      `;

      await sendEmail(
        email,
        template.EMAIL_SUBJECT,
        finalBody,
         attachment // optional attachment (file path or buffer)
      );
    }

    await db.query(
      `UPDATE "${companyDB}"."EMAIL_APPROVAL_REQUEST"
       SET "STATUS" = 'APPROVED', "APPROVED_AT" = CURRENT_TIMESTAMP
       WHERE "ID" = ?`,
      [requestId]
    );

     await logEmailApproval({
      companyDB,
      requestId,
      docType: "Email Approval",
      action: "APPROVE",
      message: "Request approved and emails sent",
      details: { recipients: mappingRows.map(r => r.EMAIL) },
    });

  return  res.status(200).json({ message: "Request approved and emails sent" });

    // return res.status(200).json({ message: "Emails sent successfully" });

  } catch (error) {
    console.error("Error in createApprovalRequest:", error);
    await logEmailApproval({
      companyDB,
      requestId,
      docType: "Email Approval",
      action: "APPROVE",
      message: error.message || "Unexpected error",
      details: { stack: error.stack },
    });
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
//     // 2. Get the email template details
//     const templateRows = await db.query(
//       `SELECT "EMAIL_SUBJECT", "EMAIL_BODY", "EMAIL_SIGNATURE", "SIGNATURE_ATTACHMENT"
//        FROM "${companyDB}"."EMAIL_TEMPLATE"
//        WHERE "ID" = ?`,
//       [templateId]
//     );

//     const template = templateRows[0];
//     if (!template) return res.status(404).json({ message: "Email template not found" });

//     // 3. Send email to each recipient individually
//     for (const email of toEmails) {
//       const finalBody = `${template.EMAIL_BODY}\n\n${template.EMAIL_SIGNATURE || ""}`;
//       await sendEmail(
//         email,
//         template.EMAIL_SUBJECT,
//         finalBody,
//         template.SIGNATURE_ATTACHMENT // optional attachment
//       );
//     }

//     // 4. Update approval request status
//     await db.query(
//       `UPDATE "${companyDB}"."EMAIL_APPROVAL_REQUEST"
//        SET "STATUS" = 'APPROVED', "APPROVED_AT" = CURRENT_TIMESTAMP
//        WHERE "ID" = ?`,
//       [requestId]
//     );

//     res.status(200).json({ message: "Request approved and emails sent" });
//   } catch (error) {
//     console.error("Error approving request:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };


exports.rejectRequest = async (req, res) => {
  const { companyDB } = req.query;
  const { requestId } = req.body;

  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });
  if (!requestId) return res.status(400).json({ message: "Missing requestId" });

  try {
    // 1. Get the approval request
    const requestRows = await db.query(
      `SELECT "STATUS"
       FROM "${companyDB}"."EMAIL_APPROVAL_REQUEST"
       WHERE "ID" = ?`,
      [requestId]
    );

    const request = requestRows[0];
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.STATUS !== "PENDING") {
      return res.status(400).json({ message: "Request already processed" });
    }

    // 2. Update status to REJECTED
    await db.query(
      `UPDATE "${companyDB}"."EMAIL_APPROVAL_REQUEST"
       SET "STATUS" = 'REJECTED'
       WHERE "ID" = ?`,
      [requestId]
    );
     await logEmailApproval({
      companyDB,
      requestId,
      docType: "Email Approval",
      action: "Reject",
      message: "Email Rejected Successfully",
      details: "null"
    });
    

    // ✅ No further processing — just return
    return res.status(200).json({ message: "Request rejected" });
  } catch (error) {
    console.error("Error rejecting request:", error);
     await logEmailApproval({
      companyDB,
      requestId,
      docType: "Email Approval",
      action: "Reject",
      message: error.message || "Unexpected error",
      details: { stack: error.stack },
    });
    
    res.status(500).json({ message: "Server error", error });
  }
};






function prepareAttachment(signatureAttachment) {
  if (!signatureAttachment) return null;

  let base64Data;
  let mimeType = "application/octet-stream";

  if (Buffer.isBuffer(signatureAttachment)) {
    // Convert Buffer (binary) → base64
    base64Data = signatureAttachment.toString("base64");
    mimeType = "image/jpeg"; // since it starts with ÿØÿà (JPEG magic number)
  } else if (typeof signatureAttachment === "string") {
    // If it's already base64 string
    if (signatureAttachment.startsWith("data:")) {
      const matches = signatureAttachment.match(/^data:(.+);base64,(.*)$/);
      if (matches) {
        mimeType = matches[1];
        base64Data = matches[2];
      }
    } else {
      base64Data = signatureAttachment;
      mimeType = "application/pdf"; // default if unsure
    }
  }

  return {
    filename: "signature.jpg", // or .pdf if needed
    content: base64Data,
    encoding: "base64",
    contentType: mimeType,
  };
}
