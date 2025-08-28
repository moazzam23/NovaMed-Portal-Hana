// const nodemailer = require("nodemailer");
// const db = require("../db");

// async function getEmailConfig() {
//   try {
//     const result = await db.query("SELECT TOP 1 * FROM EmailSetup ORDER BY createdAt DESC");
//     return result[0]; // Assuming db.query returns array
//   } catch (error) {
//     console.error("❌ Failed to load email configuration from DB:", error);
//     return null;
//   }
// }

// async function sendEmail(from,to, subject, html, attachments = [], cc = "") {
//   const config = await getEmailConfig();
//   if (!config) {
//     console.error("❌ No email config found. Cannot send email.");
//     return;
//   }

//   const transporter = nodemailer.createTransport({
//     host: config.smtpHost,
//     port: parseInt(config.smtpPort || "587"),
//     secure: parseInt(config.smtpPort) === 465, 
//     auth: {
//       user: config.smtpUser,
//       pass: config.smtpPassword,
//     },
//   });

//   const mailOptions = {
//     // from: `"NovaMed Portal" <${config.senderEmail}>`,
//     from,
//     to,
//     cc: config.ccEmails || cc, 
//     subject,
//     html,
//     attachments,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`📧 Email sent to ${to}`);
//   } catch (err) {
//     console.error(`❌ Failed to send email to ${to}`, err);
//   }
// }

// module.exports = { sendEmail };


const nodemailer = require("nodemailer");
const db = require("../db"); // your hana client wrapper

// ✅ Get latest email configuration from HANA
async function getEmailConfig() {
  try {
    const result = await db.query(`SELECT * FROM ${process.env.CompanyDB}."EMAILSETUP" ORDER BY "CREATEDAT" DESC LIMIT 1`);
    return result[0] || null; // hana returns array of rows
  } catch (error) {
    console.error("❌ Failed to load email configuration from HANA:", error);
    return null;
  }
}

// ✅ Send Email
async function sendEmail(to, subject, html, attachments = [], cc = "") {
  const config = await getEmailConfig();
  if (!config) {
    console.error("❌ No email config found. Cannot send email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.SMTPHOST,
    port: parseInt(config.SMTPPORT || "587"),
    secure: parseInt(config.SMTPPORT) === 465, // TLS for port 465
    auth: {
      user: config.SMTPUSER,
      pass: config.SMTPPASSWORD,
    },
  });

  // 📌 Handle multiple TO/CC addresses (comma separated)
  const mailOptions = {
    from: `"NovaMed Portal" <${config.SENDEREMAIL}>`,
    to: to.split(",").map(email => email.trim()),
    cc: (cc || config.CCEMAILS || "")
          .split(",")
          .map(email => email.trim())
          .filter(e => e), 
    subject,
    html,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}`, err);
  }
}

module.exports = { sendEmail };
