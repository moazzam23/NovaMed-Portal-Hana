'use strict';
require('dotenv').config(); 
const { v4: uuidv4 } = require('uuid');
const cron = require("node-cron");
const express = require('express');
const cors = require('cors');
const hana = require('@sap/hana-client');
const axios= require('axios')
const { performance } = require('perf_hooks');
const authRoutes = require('./Routes/AuthRoutes');
const userRoutes = require('./Routes/UserRoutes');
const roleRoutes = require('./Routes/RoleRoutes');
const documentSequenceRoutes = require('./Routes/DocumentSequenceRoutes');
const emailRecipientsRoutes = require('./Routes/ReccipientEmailRoutes');
const EmailTemplateRoutes = require('./Routes/EmailTemplateRoutes');
const emailSetupRoutes = require("./Routes/SenderEmailRoutes");
const EmailApprovalTemplateRoute = require("./Routes/EmailApprovalTemplateRoute");
const EmailApprovalRoute = require("./Routes/SendingApprovalRoute");
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', roleRoutes);
app.use('/api/email-recipients', emailRecipientsRoutes);
app.use('/api/document-sequence', documentSequenceRoutes);
app.use("/api/email-setup", emailSetupRoutes);
app.use('/api', userRoutes);
app.use('/api', EmailTemplateRoutes);
app.use('/api', EmailApprovalRoute);
app.use('/api', EmailApprovalTemplateRoute);
app.use('/api/auth', authRoutes);


const connOptions = {
  serverNode: process.env.HANA_SERVER,
  uid: process.env.HANA_USER,
  pwd: process.env.HANA_PASS,
  sslValidateCertificate: 'false'
};

const httpsAgent = new https.Agent({  
  rejectUnauthorized: false 
});
app.get('/api/Items', (req, res) => {
  const { CompanyDB } = req.query; 
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }
  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
    const result = connection.exec(`
        CALL "${CompanyDB}".Portal_Item_Selection
      `);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


app.get('/api/Inventory-Close-Req', (req, res) => {
  const { CompanyDB } = req.query; 
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }
  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
    const result = connection.exec(`
        CALL "${CompanyDB}".Portal_INVENTORY_REQ_CLOSED
      `);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/Posted-Good-Issue', (req, res) => {
  const { CompanyDB } = req.query; 
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }
  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
    const result = connection.exec(`
        CALL "${CompanyDB}".Portal_ALL_GOOD_ISSUE_POSTED
      `);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/Posted-Good-Issue_User', (req, res) => {
  const { CompanyDB,USERCODE } = req.query; 
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }
   const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
     const result = connection.exec(`
   CALL "${CompanyDB}".Portal_ALL_GOOD_ISSUE_POSTED_WITHPRAM('${USERCODE}')
    `);
      // console.log(result);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/INVENTORY_REQ_CLOSED_User', (req, res) => {
  const { CompanyDB,USERCODE } = req.query; 
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }
   const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
     const result = connection.exec(`
   CALL "${CompanyDB}".Portal_INVENTORY_REQ_CLOSED_WITHPRAM('${USERCODE}')
    `);
      // console.log(result);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


app.get('/api/Customer', (req, res) => {
  const { CompanyDB } = req.query; 
  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
    const result = connection.exec(`
        SELECT "CardCode", "CardName" FROM "${CompanyDB}"."OCRD" 
      `);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/SAP_Customer', (req, res) => {
  const { CompanyDB } = req.query; 
  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
    const result = connection.exec(`
        CALL  "${CompanyDB}".Portal_Customer_Selection
      `);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


app.get('/api/warehouse', (req, res) => {
  const { CompanyDB } = req.query;
   
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }
   const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
    const result = connection.exec(`
    CALL  "${CompanyDB}".Portal_whs_Selection
      `);
      // console.log(result);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/Instockquantity', (req, res) => {
  const { CompanyDB,ItemCode,WhsCode } = req.query; 
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }
   const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
     const result = connection.exec(`
   CALL "${CompanyDB}".Portal_InStock_Qty('${ItemCode}', '${WhsCode}')
    `);
      // console.log(result);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/GetCompany', (req, res) => {

  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
    const result = connection.exec(`
        CALL "SBOCOMMON".GetCompany_Portal
      `);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/pendinggoodissue_user', (req, res) => {
  const { CompanyDB,usercode } = req.query; 
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }

  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
    const result = connection.exec(`
      CALL "${CompanyDB}".Portal_Pending_Good_Issue_WITHPRAM('${usercode}')
      `);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/pendinggoodissue', (req, res) => {
  const { CompanyDB } = req.query; 
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }

  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const t0 = performance.now();
    const result = connection.exec(`
      CALL "${CompanyDB}".Portal_Pending_Good_Issue
      `);
    const t1 = performance.now();
    console.log(`Query took ${t1 - t0} ms`);
    connection.disconnect();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// //Users_Roles
// app.get('/api/user-roles/:userId', (req, res) => {
//   const { CompanyDB } = req.query;
//   const { userId } = req.params;

//   if (!CompanyDB) {
//     return res.status(400).send("Missing CompanyDB");
//   }

//   const connection = hana.createConnection();
//   try {
//     connection.connect(connOptions);
//     const query = `
//       SELECT DISTINCT ur.PERMISSION
//       FROM "${CompanyDB}".USER_ROLES ur
//       WHERE ur.USER_ID = ?
//     `;

//     connection.prepare(query, (err, statement) => {
//       if (err) throw err;
//       statement.exec([userId], (err2, result) => {
//         if (err2) throw err2;

//         // const permissions = result.map(r => r.PERMISSION);
//         const rawPermissions = result.map(r => r.PERMISSION); // this is an array with one element: the CSV string
// const permissions = rawPermissions
//   .join(",") // in case there are multiple strings
//   .split(",") // split CSV
//   .map(p => p.trim());
//         console.log(permissions);
//         res.json({ permissions });
//         // res.json(result);
//         connection.disconnect();
//       });
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });

// app.get('/api/user-roles', (req, res) => {
//   const { CompanyDB } = req.query;

//   if (!CompanyDB) {
//     return res.status(400).send("Missing CompanyDB");
//   }

//   const connection = hana.createConnection();
//   try {
//     connection.connect(connOptions);
//     // SELECT * FROM "${CompanyDB}".USER_ROLES
//     const result = connection.exec(`
//          SELECT 
//   ur.USER_ID,
//   u.U_NAME AS USER_NAME,
//   ur.ROLE_ID,
//   r.ROLE_NAME,
//   ur.PERMISSION
// FROM 
//   "${CompanyDB}".USER_ROLES ur
// LEFT JOIN "${CompanyDB}".OUSR u ON ur.USER_ID = u.USER_CODE
// LEFT JOIN "${CompanyDB}".ROLES r ON ur.ROLE_ID = r.ROLE_ID
//       `);
//     res.json(result);
//     connection.disconnect();

//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });


// //Update Apis

// app.get('/api/user-roles/form/:userId', (req, res) => {
//   const { CompanyDB } = req.query;
//   const { userId } = req.params;

//   if (!CompanyDB) {
//     return res.status(400).send("Missing CompanyDB");
//   }

//   const connection = hana.createConnection();
//   try {
//     connection.connect(connOptions);
//     const query = `
//       SELECT 
//         ur.USER_ID,
//         u.U_NAME AS USER_NAME,
//         ur.ROLE_ID,
//         r.ROLE_NAME,
//         ur.PERMISSION
//       FROM "${CompanyDB}".USER_ROLES ur
//       LEFT JOIN "${CompanyDB}".OUSR u ON ur.USER_ID = u.USER_CODE
//       LEFT JOIN "${CompanyDB}".ROLES r ON ur.ROLE_ID = r.ROLE_ID
//       WHERE ur.USER_ID = ?
//     `;

//     connection.prepare(query, (err, statement) => {
//       if (err) throw err;

//       statement.exec([userId], (err2, result) => {
//         if (err2) throw err2;
//         console.log(result)
//         res.json(result);
//         connection.disconnect();
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });

// //put
// app.put('/api/user-roles/:userId', (req, res) => {
//   const { CompanyDB } = req.query;
//   const { userId } = req.params;
//   const { roles } = req.body; // array of role entries: [{ roleId, permission }, ...]
// console.log(roles)

//   if (!CompanyDB || !roles || !Array.isArray(roles)) {
//     return res.status(400).send("Missing CompanyDB or roles data");
//   }

//   const connection = hana.createConnection();
//   try {
//     connection.connect(connOptions);

//     // Delete old roles
//     const deleteQuery = `DELETE FROM "${CompanyDB}".USER_ROLES WHERE USER_ID = ?`;

//     connection.prepare(deleteQuery, (err, deleteStmt) => {
//       if (err) throw err;

//       deleteStmt.exec([userId], (delErr) => {
//         if (delErr) throw delErr;

//         // Insert new roles
//         const insertQuery = `
//           INSERT INTO "${CompanyDB}".USER_ROLES (USER_ID, ROLE_ID, PERMISSION)
//           VALUES (?, ?, ?)
//         `;

//         connection.prepare(insertQuery, (err2, insertStmt) => {
//           if (err2) throw err2;

//           const tasks = roles.map(({ ROLE_ID, PERMISSION }) =>
//             insertStmt.exec([userId, ROLE_ID, PERMISSION])
//           );

//           Promise.all(tasks)
//             .then(() => {
//               res.send("User roles updated successfully");
//               connection.disconnect();
//             })
//             .catch((insertErr) => {
//               console.error(insertErr);
//               res.status(500).send("Insert failed");
//               connection.disconnect();
//             });
//         });
//       });
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });

// //delete
// app.delete('/api/user-roles/:userId', (req, res) => {
//   const { CompanyDB } = req.query;
//   const { userId } = req.params;

//   if (!CompanyDB) {
//     return res.status(400).send("Missing CompanyDB");
//   }

//   const connection = hana.createConnection();
//   try {
//     connection.connect(connOptions);

//     const query = `DELETE FROM "${CompanyDB}".USER_ROLES WHERE USER_ID = ?`;

//     connection.prepare(query, (err, statement) => {
//       if (err) throw err;

//       statement.exec([userId], (err2) => {
//         if (err2) throw err2;
//         res.send("User roles deleted successfully");
//         connection.disconnect();
//       });
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });




// app.post('/api/user-roles', (req, res) => {
//   const { CompanyDB } = req.query;
//   const { USER_ID, ROLE_ID, PERMISSION, DOCUMENT_ID = "" } = req.body;

//   if (!CompanyDB ) {
//     return res.status(400).send("Missing required fields");
//   }

//   const PERMISSION_STRING = Array.isArray(PERMISSION)
//   ? PERMISSION.join(",")
//   : PERMISSION;

//   const connection = hana.createConnection();
//   try {
//     connection.connect(connOptions);

//     const insertSQL = `
//       INSERT INTO "${CompanyDB}".USER_ROLES 
//       (USER_ID, ROLE_ID, PERMISSION, DOCUMENT_ID)
//       VALUES (?, ?, ?, ?)
//     `;

//     connection.prepare(insertSQL, (err, statement) => {
//       if (err) throw err;
//       statement.exec([USER_ID, ROLE_ID, PERMISSION_STRING, DOCUMENT_ID], (err2, result) => {
//         if (err2) throw err2;
//         res.status(201).send("User role inserted");
//         connection.disconnect();
//       });
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });


// app.get('/api/users', (req, res) => {
//   const { CompanyDB } = req.query;
//   if (!CompanyDB) {
//     return res.status(400).send("Missing CompanyDB");
//   }

//   const connection = hana.createConnection();
//   try {
//     connection.connect(connOptions);
//     const result = connection.exec(`
//       SELECT T0."USERID",T0."U_NAME", T0."USER_CODE" FROM"${CompanyDB}".OUSR T0
//       `);
//     res.json(result);
//     connection.disconnect();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });

app.get('/api/projects', (req, res) => {
  const { CompanyDB } = req.query;
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }

  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const result = connection.exec(`
      CALL "${CompanyDB}".Portal_Project_Selection
      `);
    res.json(result);
    connection.disconnect();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/departments', (req, res) => {
  const { CompanyDB } = req.query;
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }

  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const result = connection.exec(`
          CALL "${CompanyDB}".Portal_Department_Selection
      `);
    res.json(result);
    connection.disconnect();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/TransferType', (req, res) => {
  const { CompanyDB } = req.query;
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }

  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const result = connection.exec(`
          CALL "${CompanyDB}".Portal_TransferType
      `);
    res.json(result);
    connection.disconnect();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/api/Reason', (req, res) => {
  const { CompanyDB } = req.query;
  if (!CompanyDB) {
    return res.status(400).send("Missing CompanyDB");
  }

  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const result = connection.exec(`
          CALL "${CompanyDB}".Portal_ReasonUDF
      `);
    res.json(result);
    connection.disconnect();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
// 




//WORKFLOW APIS

async function runQuery(sql, params = []) {

  const connection = hana.createConnection();
  try {
    connection.connect(connOptions);
    const stmt = await connection.prepare(sql);
    const results = await stmt.exec(params);
    return results;
  } finally {
     }
}

// Evaluate condition JSON string with jsonlogic against document data
function evaluateCondition(conditionJson, document) {
  if (!conditionJson) return true;
  let condition;
  try {
    condition = JSON.parse(conditionJson);
  } catch {
    console.error('Invalid condition JSON:', conditionJson);
    return false;
  }
  return jsonLogic.apply(condition, document);
}

// Get workflow template and steps for a doc type
async function getWorkflowForDocType(docTypeId,CompanyDB) {
  // console.log(docTypeId)
  // console.log(CompanyDB)
  const workflows = await runQuery(
    `SELECT * FROM "${CompanyDB}"."WORKFLOW_TEMPLATE" WHERE DOC_TYPE_ID = ? AND IS_ACTIVE = TRUE`,
    [docTypeId]
  );
  // console.log(workflows)
  if (workflows.length === 0) return null;
  const workflow = workflows[0];

  const steps = await runQuery(
    `SELECT * FROM "${CompanyDB}"."WORKFLOW_STEPS" WHERE WORKFLOW_ID = ? ORDER BY STEP_ORDER`,
    [workflow.WORKFLOW_ID]
  );
  // console.log(steps)
  return { workflow, steps };
}

// Find first applicable step based on condition
function findFirstApplicableStep(steps, document) {
  for (const step of steps) {
    if (!step.CONDITION || evaluateCondition(step.CONDITION, document)) {
      return step;
    }
  }
  return null;
}


  app.get('/users/approved-documents', async (req, res) => {
  const { CompanyDB } = req.query;
    try {
      const docs = await runQuery(
        `SELECT d.*, u.NAME AS CREATED_BY_NAME
      FROM "${CompanyDB}"."DOCUMENTS" d
      LEFT JOIN "${CompanyDB}"."USERS" u ON d.CREATED_BY = TO_VARCHAR(u.ID)
      WHERE d.STATUS = 'approved'
      ORDER BY d.DOC_DATE DESC`,
      
      );
      res.json({ documents: docs });
    } catch (error) {
      console.error('Error fetching approved documents:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/users/:userId/approved-documents', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const { userId } = req.params;

    const docs = await runQuery(
      `
      SELECT d.*
      FROM "${CompanyDB}"."DOCUMENTS" d
      INNER JOIN "${CompanyDB}"."APPROVALS" a ON d.DOC_ID = a.DOC_ID
      WHERE a.APPROVER_USER_ID = ? AND  a.APPROVAL_STATUS IN ('approved', 'rejected')
      ORDER BY d.DOC_DATE DESC
      `,
      [userId]
    );

    res.json({ documents: docs });

  } catch (error) {
    console.error('Error fetching approved documents for user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/users/:userId/all-documents', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const { userId } = req.params;
    const docs = await runQuery(
      `SELECT * FROM "${CompanyDB}"."DOCUMENTS" WHERE CREATED_BY = ?  ORDER BY DOC_DATE DESC`,
      [userId]
    );
    res.json({ documents: docs });
  } catch (error) {
    console.error('Error fetching approved documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/documents/all-documents', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
  const docs = await runQuery(
      `SELECT d.*,u.NAME AS CREATORNAME FROM "${CompanyDB}"."DOCUMENTS" d 
       LEFT JOIN "${CompanyDB}"."USERS" u ON d.CREATED_BY = TO_VARCHAR(u.ID)
       ORDER BY DOC_DATE DESC`,
     
    );
    res.json({ documents: docs });
  } catch (error) {
    console.error('Error fetching approved documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/documents/:docId/approver-edit', async (req, res) => {
  try {
    const { docId } = req.params;
    const updates = req.body;
     const { CompanyDB } = req.query;

    const docs = await runQuery(`SELECT * FROM "${CompanyDB}"."DOCUMENTS" WHERE DOC_ID = ?`, [docId]);
    if (docs.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const existingDoc = docs[0];
    const updatedPayload = updates.payload || JSON.parse(existingDoc.PAYLOAD);

    const mergedDoc = {
      ...existingDoc,
      ...updates,
      payload: updatedPayload,
    };

    // Dynamically build SQL SET clause
    const keys = Object.keys(updates);
    const setClause = keys.map(key => {
      switch (key.toLowerCase()) {
        case 'payload': return `"PAYLOAD" = ?`;
        case 'docdate': return `"DOC_DATE" = ?`;
        default: return `"${key.toUpperCase()}" = ?`;
      }
    }).join(', ');

    const values = keys.map(key =>
      key.toLowerCase() === 'payload'
        ? JSON.stringify(updates[key])
        : updates[key]
    );

    if (keys.length > 0) {
      await runQuery(
        `UPDATE "${CompanyDB}"."DOCUMENTS" SET ${setClause} WHERE DOC_ID = ?`,
        [...values, docId]
      );
    }

    res.json({
      message: 'Document updated without resetting workflow',
      docId,
      currentStepId: existingDoc.CURRENT_STEP_ID,
      status: existingDoc.STATUS
    });

  } catch (error) {
    console.error('Error updating document (approver-edit):', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/documents/:docId', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const { docId } = req.params;
    const updates = req.body;

    const docs = await runQuery(`SELECT * FROM "${CompanyDB}"."DOCUMENTS" WHERE DOC_ID = ?`, [docId]);
    if (docs.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const existingDoc = docs[0];
    const updatedPayload = updates.payload || JSON.parse(existingDoc.PAYLOAD);
    const mergedDoc = {
      ...existingDoc,
      ...updates,
      payload: updatedPayload,
    };

    const keys = Object.keys(updates);
const setClause = keys.map(key => {
  switch (key.toLowerCase()) {
    case 'payload': return `"PAYLOAD" = ?`;
    case 'docdate': return `"DOC_DATE" = ?`;
    default: return `"${key.toUpperCase()}" = ?`;
  }
}).join(', ');

const values = keys.map(key => 
  key.toLowerCase() === 'payload' 
    ? JSON.stringify(updates[key]) 
    : updates[key]
);

if (keys.length > 0) {
  await runQuery(
    `UPDATE "${CompanyDB}"."DOCUMENTS" SET ${setClause} WHERE DOC_ID = ?`,
    [...values, docId]
  );
}

    const docTypeId = existingDoc.DOC_TYPE_ID;
    const User_ID = existingDoc.CREATED_BY;

    const wfData = await getWorkflowForDocType(docTypeId,CompanyDB);
    if (!wfData) {
      return res.json({ message: 'Document updated, no workflow found', docId });
    }

    const { workflow, steps } = wfData;

    const docDataForCond = {
      ...mergedDoc,
      payload: updatedPayload,
      docId,
      docTypeId,
    };

    const firstStep = findFirstApplicableStep(steps, docDataForCond);
    if (!firstStep) {
      await runQuery(`UPDATE "${CompanyDB}"."DOCUMENTS" SET STATUS = 'approved' WHERE DOC_ID = ?`, [docId]);
      return res.json({ message: 'Document auto-approved (no matching workflow step)', docId });
    }

    await runQuery(
      `DELETE FROM "${CompanyDB}"."APPROVALS" WHERE DOC_ID = ?`,
      [docId]
    );

    await runQuery(
      `UPDATE "${CompanyDB}"."DOCUMENTS" SET STATUS = 'in_progress', CURRENT_STEP_ID = ? WHERE DOC_ID = ?`,
      [firstStep.STEP_ID, docId]
    );

    res.json({ message: 'Document updated and workflow restarted', docId, currentStep: firstStep });

  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/documents/:docId', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const { docId } = req.params;

    const result = await runQuery(
      `SELECT * FROM "${CompanyDB}"."DOCUMENTS" WHERE DOC_ID = ?`,
      [docId]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Optionally parse payload if it’s stored as JSON string
    const doc = result[0];
    if (doc.PAYLOAD) {
      try {
        doc.PAYLOAD = JSON.parse(doc.PAYLOAD);
      } catch (e) {
        // leave as string if not valid JSON
      }
    }

    res.json({ document: doc });
  } catch (error) {
    console.error('Error fetching document by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/documents/PortalNum/:docId', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const { docId } = req.params;

    const result = await runQuery(
      `SELECT * FROM "${CompanyDB}"."DOCUMENTS" WHERE DOC_NUMBER = ?`,
      [docId]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Optionally parse payload if it’s stored as JSON string
    const doc = result[0];
    if (doc.PAYLOAD) {
      try {
        doc.PAYLOAD = JSON.parse(doc.PAYLOAD);
      } catch (e) {
        // leave as string if not valid JSON
      }
    }

    res.json({ document: doc });
  } catch (error) {
    console.error('Error fetching document by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/documents', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const {
      docId = uuidv4(),
      docTypeId,
      docNumber,
      docDate,
      status = 'pending',
      payload,
      User_ID,
      ...documentData // additional fields for condition evaluation
    } = req.body;

    // console.log("docu user id",User_ID)
const emailSubject = `New Document Submitted: ${docNumber}`;
const emailBody = `
  <p>A new document has been submitted into the system.</p>
  <ul>
    <li><strong>Document ID:</strong> ${docId}</li>
    <li><strong>Type:</strong> ${docTypeId}</li>
    <li><strong>Number:</strong> ${docNumber}</li>
    <li><strong>Status:</strong> ${status}</li>
    <li><strong>Date:</strong> ${docDate}</li>
  </ul>
  <p>Please check the workflow dashboard for further action.</p>
`;

    // Insert document header
    await runQuery(
      `INSERT INTO "${CompanyDB}"."DOCUMENTS" (DOC_ID, DOC_TYPE_ID, DOC_NUMBER, DOC_DATE, STATUS,PAYLOAD,CREATED_BY) VALUES (?, ?, ?, ?, ?,?,?)`,
      [docId, docTypeId, docNumber, docDate, status,JSON.stringify(payload),User_ID]
    );
    await runQuery(
  `UPDATE "${CompanyDB}"."DOCUMENTSEQUENCES" 
   SET NEXTNUMBER = NEXTNUMBER + 1, UPDATEDAT = CURRENT_TIMESTAMP 
   WHERE DOCUMENTTYPE = ? AND ISACTIVE = 1`,
  [docTypeId]
);

    // Fetch workflow for this document type
    const wfData = await getWorkflowForDocType(docTypeId,CompanyDB);
    // console.log("whdata",wfData)
    if (!wfData || !wfData.workflow || !wfData.steps || wfData.steps.length === 0) {
      await runQuery(`UPDATE "${CompanyDB}"."DOCUMENTS" SET STATUS = 'approved' WHERE DOC_ID = ?`, [docId]);

        // await sendEmail(config.notificationEmails, emailSubject, emailBody);

      return res.status(201).json({
        message: 'Document created, no workflow assigned',
        docId,
        Approved: true
      });
    }

    const { workflow, steps } = wfData;
    // const workflowCreators = JSON.parse(workflow.ALLOWED_CREATORS || '[]');
    const workflowCreators = JSON.parse(workflow.ALLOWED_CREATORS || '[]').map(Number);
const userId = Number(User_ID);
    // console.log(workflowCreators)
    // console.log(userId)
if (!workflowCreators.includes(userId)) {
  await runQuery(`UPDATE "${CompanyDB}"."DOCUMENTS" SET STATUS = 'approved' WHERE DOC_ID = ?`, [docId]);
  return res.status(201).json({
    message: 'Document created, no matching workflow for creator',
    docId,
Approved:true
  });
}

    // Get full document data for condition eval (simulate by merging passed fields)
    const docDataForCond = {
      docId,
      docTypeId,
      docNumber,
      docDate,
      status,
      payload,
      ...documentData,
    };
// console.log("checking points 1")
    // Find first step that applies
    const firstStep = findFirstApplicableStep(steps, docDataForCond);
// console.log("checking points 2",firstStep)
    if (!firstStep) {
      // No steps applicable - auto approve
      await runQuery(`UPDATE "${CompanyDB}"."DOCUMENTS" SET STATUS = 'approved' WHERE DOC_ID = ?`, [docId]);
      return res.status(201).json({ message: 'Document auto approved, no applicable workflow steps', docId });
    }

    // console.log("checking points 3")

    // Start workflow: update document with workflow id and current step id, set status in_progress
    await runQuery(
      `UPDATE "${CompanyDB}"."DOCUMENTS" SET WORKFLOW_ID = ?, CURRENT_STEP_ID = ?, STATUS = 'in_progress' WHERE DOC_ID = ?`,
      [workflow.WORKFLOW_ID, firstStep.STEP_ID, docId]
    );
// console.log("checking points 4")
    res.status(201).json({ message: 'Document created and workflow started', docId, currentStep: firstStep });
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/documents/update-sap-status', async (req, res) => {
  const { CompanyDB } = req.query;
  const { docId, sapDocNum, isPostedToSAP } = req.body;
console.log(docId)
console.log(sapDocNum)

  try {
    await runQuery(
      `UPDATE "${CompanyDB}"."DOCUMENTS" 
       SET IS_POSTED_TO_SAP = ?, 
           SAP_INV_QRE_DOC_NUM = ?
       WHERE DOC_ID = ?`,
      [isPostedToSAP, sapDocNum || null, docId]
    );

    res.status(200).json({ message: "SAP status updated" });
  } catch (error) {
    console.error("Error updating SAP status:", error);
    res.status(500).json({ error: "Failed to update SAP status" });
  }
});

app.put('/api/documents/update-sap-Issue-status', async (req, res) => {
  const { CompanyDB } = req.query;
  const { docId, sapDocNum, isPostedToSAP } = req.body;
console.log(docId)
console.log(sapDocNum)

  try {
    await runQuery(
      `UPDATE "${CompanyDB}"."DOCUMENTS" 
       SET IS_POSTED_TO_SAP = ?, 
           SAP_DOC_ISSUE_DOC_NUM = ?
       WHERE DOC_ID = ?`,
      [isPostedToSAP, sapDocNum || null, docId]
    );

    res.status(200).json({ message: "SAP status updated" });
  } catch (error) {
    console.error("Error updating SAP status:", error);
    res.status(500).json({ error: "Failed to update SAP status" });
  }
});


app.get('/api/documents/get-by-sap-docnum', async (req, res) => {
  const { CompanyDB, sapDocNum } = req.query;

  if (!CompanyDB || !sapDocNum) {
    return res.status(400).json({ error: "Missing CompanyDB or sapDocNum" });
  }

  try {
    const result = await runQuery(
      `SELECT DOC_NUMBER 
       FROM "${CompanyDB}"."DOCUMENTS" 
       WHERE SAP_INV_QRE_DOC_NUM = ?`,
      [sapDocNum]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ docId: result[0].DOC_ID });
  } catch (error) {
    console.error("Error fetching document by SAP doc number:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/api/workflow-templates', async (req, res) => {
  
  const { workflowName, docId,creators } = req.body;
  const workflowId = uuidv4();
  const { CompanyDB } = req.query;

  if (!workflowName || !docId || !CompanyDB)
    return res.status(400).send("Missing required fields");

  try {
    await runQuery(
      `INSERT INTO "${CompanyDB}"."WORKFLOW_TEMPLATE" 
      (WORKFLOW_ID, DOC_TYPE_ID, WORKFLOW_NAME, IS_ACTIVE,ALLOWED_CREATORS)
      VALUES (?, ?, ?, TRUE,?)`,
      [workflowId, docId, workflowName,JSON.stringify(creators)]
    );

    res.status(201).json({ workflowId, message: "Template created" });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch('/api/workflow-templates/:workflowId/active', async (req, res) => {
  const { workflowId } = req.params;
  const { isActive } = req.body; // expects true or false
  const { CompanyDB } = req.query;

  if (!workflowId || typeof isActive !== 'boolean' || !CompanyDB) {
    return res.status(400).json({ error: 'Missing required fields or invalid data' });
  }

  try {
    await runQuery(
      `UPDATE "${CompanyDB}"."WORKFLOW_TEMPLATE" SET IS_ACTIVE = ? WHERE WORKFLOW_ID = ?`,
      [isActive, workflowId]
    );

    res.status(200).json({ message: `Workflow ${isActive ? 'activated' : 'deactivated'}` });
  } catch (error) {
    console.error("Error updating workflow activation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/workflow-steps', async (req, res) => {
  const { workflowId, steps } = req.body;
  const { CompanyDB } = req.query;
  // console.log(workflowId)
  // console.log(steps)

  if (!workflowId || !steps || !Array.isArray(steps) || !CompanyDB)
    return res.status(400).send("Missing required fields");

  try {
    for (const step of steps) {
      await runQuery(
        `INSERT INTO "${CompanyDB}"."WORKFLOW_STEPS" 
        (STEP_ID, WORKFLOW_ID, STEP_ORDER, ROLE_NAMES, STEP_CONDITION, ACTION_TYPE,NO_OF_APPROVAL, NO_OF_REJECTION)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          uuidv4(),
          workflowId,
          step.stepOrder,
          // step.roleName,
          JSON.stringify(step.roleNames),
          step.condition || "",
          step.actionType,
          step.noOfApproval,
          step.noOfRejection
        ]
      );
      
    }

    res.status(201).send("Workflow steps added");
  } catch (error) {
    console.error("Error adding workflow steps:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/workflow-templates', async (req, res) => {
  const { CompanyDB } = req.query;

  if (!CompanyDB)
    return res.status(400).send("Missing CompanyDB query parameter");

  try {
    // Get all workflow templates
    const workflows = await runQuery(
      `SELECT * FROM "${CompanyDB}"."WORKFLOW_TEMPLATE" WHERE "DOC_TYPE_ID" <> 'INV'
`
    );

    if (workflows.length === 0)
      return res.status(200).json({ workflows: [] });

    // Get all steps for all workflows
    const allSteps = await runQuery(
      `SELECT * FROM "${CompanyDB}"."WORKFLOW_STEPS"`
    );

    // Group steps under each workflow
    const workflowsWithSteps = workflows.map(wf => ({
      ...wf,
      steps: allSteps
        .filter(step => step.WORKFLOW_ID === wf.WORKFLOW_ID)
        .sort((a, b) => a.STEP_ORDER - b.STEP_ORDER),
    }));

    res.json({ workflows: workflowsWithSteps });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get('/documents/:docId/workflow', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const { docId } = req.params;
console.log(docId)
    // Get the document
    const docs = await runQuery(`SELECT * FROM "${CompanyDB}"."DOCUMENTS" WHERE DOC_ID = ?`, [docId]);
    if (docs.length === 0) return res.status(404).json({ error: 'Document not found' });
    const doc = docs[0];

    if (!doc.WORKFLOW_ID) {
      return res.status(200).json({ message: 'No workflow assigned', document: doc });
    }

    // Get workflow steps
    const steps = await runQuery(
      `SELECT * FROM "${CompanyDB}"."WORKFLOW_STEPS" WHERE WORKFLOW_ID = ? ORDER BY STEP_ORDER`,
      [doc.WORKFLOW_ID]
    );

    // Get approvals made for this document
    const approvals = await runQuery(
      `SELECT * FROM "${CompanyDB}"."APPROVALS" WHERE DOC_ID = ? ORDER BY TIMESTAMP`,
      [docId]
    );

    // Prepare step status with per-user approval tracking
    const stepStatuses = steps.map((step) => {
      const stepApprovals = approvals.filter((a) => a.STEP_ID === step.STEP_ID);
      let status = 'pending';

      // Check if step applies
      const applies = !step.CONDITION || evaluateCondition(step.CONDITION, doc);
      if (!applies) {
        status = 'skipped';
      } else if (stepApprovals.some(a => a.APPROVAL_STATUS === 'rejected')) {
        status = 'rejected';
      } else if (stepApprovals.filter(a => a.APPROVAL_STATUS === 'approved').length >= (step.NO_OF_APPROVAL || 1)) {
        status = 'approved';
      }

      // console.log(step)
      // Parse expected approvers directly from step.ROLE_NAMES (contains full user info)
      const expectedApprovers = JSON.parse(step.ROLE_NAMES || '[]'); // expects array of { userId, name, role }
      // console.log(expectedApprovers)
      // console.log(stepApprovals)

      // Map all expected users with their approval status
      // const expectedApprovers = JSON.parse(step.ROLE_NAMES || '[]'); // Now an array of objects

const allApprovers = expectedApprovers.map(user => {
  const match = stepApprovals.find(a => a.APPROVER_USER_ID == user);
  // console.log(match)
  return {
    approverUserId: user,
    userName: user,
    role: user.role,
    status: match ? match.APPROVAL_STATUS : 'pending',
    comments: match?.COMMENTS || '',
    timestamp: match?.TIMESTAMP || null
  };
});



      return {
        stepId: step.STEP_ID,
        order: step.STEP_ORDER,
        role: expectedApprovers.map(u => u.role),
        status,
        approvals: allApprovers
      };
    });

    res.status(200).json({
      document: doc,
      steps: stepStatuses,
      currentStepId: doc.CURRENT_STEP_ID,
      status: doc.STATUS
    });

  } catch (error) {
    console.error('Error fetching workflow:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// // GET /documents/:docId/workflow - get workflow status and steps with approval info
// app.get('/documents/:docId/workflow', async (req, res) => {
//   try {
//     const { docId } = req.params;

//     const docs = await runQuery(`SELECT * FROM "APP"."DOCUMENTS" WHERE DOC_ID = ?`, [docId]);
//     if (docs.length === 0) return res.status(404).json({ error: 'Document not found' });
//     const doc = docs[0];

//     if (!doc.WORKFLOW_ID) {
//       return res.status(200).json({ message: 'No workflow assigned', document: doc });
//     }

//     const steps = await runQuery(
//       `SELECT * FROM "APP"."WORKFLOW_STEPS" WHERE WORKFLOW_ID = ? ORDER BY STEP_ORDER`,
//       [doc.WORKFLOW_ID]
//     );

//     // Get approvals for this document
//     const approvals = await runQuery(
//       `SELECT * FROM "APP"."APPROVALS" WHERE DOC_ID = ? ORDER BY TIMESTAMP`,
//       [docId]
//     );

//     // Combine step status: approved, rejected, pending, skipped (if condition fails)
//     const stepStatuses = steps.map((step) => {
//       // Check if step is approved or rejected
//       // const approval = approvals.find((a) => a.STEP_ID === step.STEP_ID);
//       const stepApprovals = approvals.filter((a) => a.STEP_ID === step.STEP_ID);

//       let status = 'pending';

//       // Evaluate condition on document to see if step applies
//       const applies = !step.CONDITION || evaluateCondition(step.CONDITION, doc);

//       if (!applies) {
//         status = 'skipped';
//       } else if (stepApprovals.some(a => a.APPROVAL_STATUS === 'rejected')) {
//         status = 'rejected';
//       } else if (stepApprovals.filter(a => a.APPROVAL_STATUS === 'approved').length >= (step.NO_OF_APPROVAL || 1)) {
//         status = 'approved';
//       }
//       return{
//         stepId: step.STEP_ID,
//         order: step.STEP_ORDER,
//         role: JSON.parse(step.ROLE_NAMES || '[]'),
//         status,
//         approvals: stepApprovals.map(a => ({
//           approverUserId: a.APPROVER_USER_ID,
//           status: a.APPROVAL_STATUS,
//           comments: a.COMMENTS,
//           timestamp: a.TIMESTAMP,
//         })),
//       }
      
//     });

//     res.status(200).json({
//       document: doc,
//       steps: stepStatuses,
//       currentStepId: doc.CURRENT_STEP_ID,
//       status: doc.STATUS,
//     });
//   } catch (error) {
//     console.error('Error fetching workflow:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// GET /users/:userId/pending-approvals
app.get('/users/:userId/pending-approvals', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const { userId } = req.params;

    // Get user roles
    const userRoles = await runQuery(`SELECT ID FROM "${CompanyDB}"."USERS" WHERE ID = ?`, [userId]);
    
    // console.log("role",userRoles);

    if (userRoles.length === 0) {
      return res.status(404).json({ error: 'User roles not found or user has no roles' });
    }

    const roleNames = userRoles.map(r => r.ID); 
  const likeClauses = roleNames.map(() => `ws.ROLE_NAMES LIKE ?`).join(' OR ');
  const values = roleNames.map(role => `%${role}%`);
  values.push(userId);
  const query = `
    SELECT d.* 
    FROM "${CompanyDB}"."DOCUMENTS" d
    JOIN "${CompanyDB}"."WORKFLOW_STEPS" ws ON d.CURRENT_STEP_ID = ws.STEP_ID
    WHERE d.STATUS = 'in_progress' 
    AND (${likeClauses})
    AND NOT EXISTS (
  SELECT 1 FROM "${CompanyDB}"."APPROVALS" a
  WHERE a.DOC_ID = d.DOC_ID
    AND a.STEP_ID = d.CURRENT_STEP_ID
    AND a.APPROVER_USER_ID = ?
)
  `;
  
  const pendingDocs = await runQuery(query, values);


    res.json({ count: pendingDocs.length,pendingApprovals: pendingDocs });
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: /documents/created-per-user
app.get('/api/documents/created-per-user', async (req, res) => {
   const { CompanyDB } = req.query;
  //  console.log(CompanyDB)
  try {
    const result = await runQuery(`
      SELECT u.NAME AS CREATED_BY, COUNT(*) AS count 
      FROM "${CompanyDB}"."DOCUMENTS" d
      LEFT JOIN "${CompanyDB}"."USERS" u ON d.CREATED_BY = TO_VARCHAR(u.ID)
      GROUP BY u.NAME
    `);

    res.json(result);
  } catch (error) {
    console.error('Error fetching document counts per user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /approvals/count-by-role
app.get('/approvals/count-by-role', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const result = await runQuery(`
      
      SELECT ws.ROLE_NAMES, COUNT(a.APPROVAL_ID) as count
      FROM "${CompanyDB}"."APPROVALS" a
      JOIN "${CompanyDB}"."WORKFLOW_STEPS" ws ON a.STEP_ID = ws.STEP_ID
      GROUP BY ws.ROLE_NAMES
    `);
    res.json(result);
  } catch (err) {
    console.error('Error fetching approval count by role:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/documents/sap-post-status-summary', async (req, res) => {
  const { CompanyDB } = req.query;
  try {
    const result = await runQuery(`
      SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN IS_POSTED_TO_SAP = TRUE THEN 1 ELSE 0 END) AS posted,
        SUM(CASE WHEN IS_POSTED_TO_SAP = FALSE THEN 1 ELSE 0 END) AS unposted
      FROM "${CompanyDB}"."DOCUMENTS"
    `);
    
    const { TOTAL, POSTED, UNPOSTED } = result[0];
    res.json({
      total: parseInt(TOTAL),
      posted: parseInt(POSTED),
      unposted: parseInt(UNPOSTED)
    });
  } catch (err) {
    console.error('Error fetching SAP post status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET /documents/created-over-time
// app.get('/api/documents/created-over-time', async (req, res) => {
//    const { CompanyDB } = req.query;
//   //  console.log("COMPANYDB",CompanyDB)
//   try {
//     const result = await runQuery(`
//       SELECT 
//         TO_VARCHAR(DOC_DATE, 'YYYY-MM') AS month, 
//         COUNT(*) AS count
//       FROM "${CompanyDB}"."DOCUMENTS"
//       GROUP BY TO_VARCHAR(DOC_DATE, 'YYYY-MM')
//       ORDER BY month
//     `);
//     res.json(result);
//   } catch (err) {
//     console.error('Error fetching documents over time:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/api/documents/created-over-time', async (req, res) => {
  const { CompanyDB } = req.query;
  try {
    const result = await runQuery(`
      SELECT 
        TO_VARCHAR(DOC_DATE, 'YYYY-MM') AS month,
        SUM(CASE WHEN DOC_TYPE_ID = 'Inventory Request' THEN 1 ELSE 0 END) AS inventory_requests,
        SUM(CASE WHEN DOC_TYPE_ID = 'Good Issue' THEN 1 ELSE 0 END) AS goods_issues
      FROM "${CompanyDB}"."DOCUMENTS"
      GROUP BY TO_VARCHAR(DOC_DATE, 'YYYY-MM')
      ORDER BY month
    `);
    res.json(result);
  } catch (err) {
    console.error('Error fetching documents over time:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// GET /approvals/status-by-role
app.get('/api/approvals/status-by-role', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const result = await runQuery(
      `SELECT 
  STRING_AGG(u.NAME, ', ') AS ROLE_NAMES,
  a.APPROVAL_STATUS,
  COUNT(*) AS count
FROM "${CompanyDB}"."APPROVALS" a
JOIN "${CompanyDB}"."WORKFLOW_STEPS" ws ON a.STEP_ID = ws.STEP_ID
JOIN LATERAL UNNEST(STRING_SPLIT(ws.ROLE_NAMES, ',')) AS roleId
JOIN "${CompanyDB}"."USERS" u ON u.ID = TO_INT(roleId)
GROUP BY a.APPROVAL_STATUS

    `);

      // SELECT 
      //   ws.ROLE_NAMES, 
      //   a.APPROVAL_STATUS, 
      //   COUNT(*) AS count
      // FROM "${CompanyDB}"."APPROVALS" a
      // JOIN "${CompanyDB}"."WORKFLOW_STEPS" ws ON a.STEP_ID = ws.STEP_ID
      // GROUP BY ws.ROLE_NAMES, a.APPROVAL_STATUS
    // console.log(result)
    const grouped = {};
    const allStatuses = ['approved', 'rejected', 'cancelled']; // added cancelled

    result.forEach(r => {
      const role = r.ROLE_NAMES || 'Unknown Role';
      const status = r.APPROVAL_STATUS ? r.APPROVAL_STATUS.toLowerCase() : 'unknown';
      const count = parseInt(r.COUNT, 10) || 0;
      // console.log(role)
      // console.log(status)

      if (!grouped[role]) {
        // initialize all statuses to 0
        grouped[role] = { role };
        allStatuses.forEach(s => {
          grouped[role][s] = 0;
        });
      }

      grouped[role][status] = count;
    });
    // console.log(grouped)

    res.json(Object.values(grouped));
  } catch (err) {
    console.error('Error fetching stacked approval data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/api/documents/document-status-summary', async (req, res) => {
  console.log("✅ API HIT: /documents/document-status-summary");
   const { CompanyDB } = req.query;
  try {

    // Step 3: Query to count documents by status where current step is assigned to user's role
    // console.log("1")
    const statusSummaryQuery = `
      SELECT d.STATUS, COUNT(*) as COUNT
      FROM "${CompanyDB}"."DOCUMENTS" d
      GROUP BY d.STATUS
    `;
//  console.log("2")
    const summaryResults = await runQuery(statusSummaryQuery);
//  console.log("3")
    // Step 4: Format response as { pending: x, in_progress: y, approved: z, rejected: w }
    const formatted = {
      pending: 0,
      in_progress: 0,
      approved: 0,
      rejected: 0,
      cancelled: 0
    };
    
    summaryResults.forEach(row => {
      const status = row.STATUS.toLowerCase();
      if (formatted.hasOwnProperty(status)) {
        formatted[status] = parseInt(row.COUNT);
      }
    });
    //  console.log("4")

    res.json({ statusCounts: formatted });
  } catch (error) {
    console.error('Error fetching document status summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// POST /documents/:docId/approve - approve or reject current step
// app.post('/documents/:docId/approve', async (req, res) => {
//   try {
//     const { docId } = req.params;
//     const { userId, approvalStatus, comments = '' } = req.body; // approvalStatus: 'approved' or 'rejected'

//     if (!['approved', 'rejected','cancelled'].includes(approvalStatus)) {
//       return res.status(400).json({ error: 'Invalid approvalStatus' });
//     }

//     // Get document and current step
//     const docs = await runQuery(`SELECT * FROM "APP"."DOCUMENTS" WHERE DOC_ID = ?`, [docId]);
//     if (docs.length === 0) return res.status(404).json({ error: 'Document not found' });
//     const doc = docs[0];
//     if (!doc.CURRENT_STEP_ID) return res.status(400).json({ error: 'Document has no active workflow step' });

//     // Get current step
//     const steps = await runQuery(
//       `SELECT * FROM "APP"."WORKFLOW_STEPS" WHERE WORKFLOW_ID = ? ORDER BY STEP_ORDER`,
//       [doc.WORKFLOW_ID]
//     );
//     const currentStep = steps.find((s) => s.STEP_ID === doc.CURRENT_STEP_ID);
//     if (!currentStep) return res.status(500).json({ error: 'Current workflow step not found' });

//     // Verify user role matches current step role (in real app, check user's roles)
//     // For demo, skipping this check

//     // Insert approval record
//     const existing = await runQuery(
//       `SELECT * FROM "APP"."APPROVALS" WHERE DOC_ID = ? AND STEP_ID = ? AND APPROVER_USER_ID = ?`,
//       [docId, currentStep.STEP_ID, userId]
//     );
//     if (existing.length > 0) {
//       return res.status(400).json({ error: 'You have already responded to this step' });
//     }

//     // Insert approval record
//     await runQuery(
//       `INSERT INTO "APP"."APPROVALS" (APPROVAL_ID, DOC_ID, STEP_ID, APPROVER_USER_ID, APPROVAL_STATUS, COMMENTS) VALUES (?, ?, ?, ?, ?, ?)`,
//       [uuidv4(), docId, currentStep.STEP_ID, userId, approvalStatus, comments]
//     );

//     // Count approvals and rejections
//     const allApprovals = await runQuery(
//       `SELECT APPROVAL_STATUS FROM "APP"."APPROVALS" WHERE DOC_ID = ? AND STEP_ID = ?`,
//       [docId, currentStep.STEP_ID]
//     );

//     const approvedCount = allApprovals.filter(a => a.APPROVAL_STATUS === 'approved').length;
//     const rejectedCount = allApprovals.filter(a => a.APPROVAL_STATUS === 'rejected').length;
//     const requiredApprove = currentStep.NO_OF_APPROVAL || 1;
//     const requiredReject = currentStep.NO_OF_REJECTION || 1;

//     // 🟥 Reject Quorum Met
//     if (rejectedCount >= requiredReject) {
//       await runQuery(`UPDATE "APP"."DOCUMENTS" SET STATUS = 'rejected', CURRENT_STEP_ID = NULL WHERE DOC_ID = ?`, [docId]);
//       return res.json({ message: 'Document rejected due to quorum', rejected: true });
//     }

    
//         if (approvalStatus === 'cancel') {
//           await runQuery(
//             `UPDATE "APP"."DOCUMENTS" SET STATUS = 'cancelled', CURRENT_STEP_ID = NULL WHERE DOC_ID = ?`,
//             [docId]
//           );
//           return res.json({ message: 'Document cancelled, workflow ended', cancelled: true });
//         }
    
    
//         if (approvalStatus === 'rejected') {
//           // Workflow rejected, update document status
//           await runQuery(`UPDATE "APP"."DOCUMENTS" SET STATUS = 'rejected', CURRENT_STEP_ID = NULL WHERE DOC_ID = ?`, [docId]);
//           return res.json({ message: 'Document rejected, workflow ended' });}
//     // 🟩 Approve Quorum Met
//     if (approvedCount >= requiredApprove) {
//       // Find next step

    
  

//     // approvalStatus === 'approved'
//     // Find next applicable step
//     const currentOrder = currentStep.STEP_ORDER;
//     let nextStep = null;
//     for (const step of steps) {
//       if (step.STEP_ORDER > currentOrder) {
//         // Evaluate condition for next step
//         if (!step.CONDITION || evaluateCondition(step.CONDITION, doc)) {
//           nextStep = step;
//           break;
//         }
//       }
//     }
//   }

//     if (!nextStep) {
//       // No more steps - approve document
//       await runQuery(`UPDATE "APP"."DOCUMENTS" SET STATUS = 'approved', CURRENT_STEP_ID = NULL WHERE DOC_ID = ?`, [docId]);

//         const payloadString = doc.PAYLOAD;
//         const payload = JSON.parse(payloadString);
    
//       return res.json({ message: 'Document fully approved, workflow completed',Approved:true,  payload: payload  });
//     }


//     // Update document current step to next step
//     await runQuery(
//       `UPDATE "APP"."DOCUMENTS" SET CURRENT_STEP_ID = ? WHERE DOC_ID = ?`,
//       [nextStep.STEP_ID, docId]
//     );

//     res.json({ message: 'Step approved, moved to next step', nextStep });
//   } catch (error) {
//     console.error('Error approving step:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.post('/documents/:docId/approve', async (req, res) => {
   const { CompanyDB } = req.query;
  try {
    const { docId } = req.params;
    const { userId, approvalStatus, comments = '' } = req.body;

    if (!['approved', 'rejected', 'cancelled'].includes(approvalStatus)) {
      return res.status(400).json({ error: 'Invalid approvalStatus' });
    }

    const docs = await runQuery(`SELECT * FROM "${CompanyDB}"."DOCUMENTS" WHERE DOC_ID = ?`, [docId]);
    if (docs.length === 0) return res.status(404).json({ error: 'Document not found' });

    const doc = docs[0];
    if (!doc.CURRENT_STEP_ID) return res.status(400).json({ error: 'Document has no active workflow step', });

    const steps = await runQuery(
      `SELECT * FROM "${CompanyDB}"."WORKFLOW_STEPS" WHERE WORKFLOW_ID = ? ORDER BY STEP_ORDER`,
      [doc.WORKFLOW_ID]
    );
    const currentStep = steps.find((s) => s.STEP_ID === doc.CURRENT_STEP_ID);
    if (!currentStep) return res.status(500).json({ error: 'Current workflow step not found' });

    // Check if user already responded
    const existing = await runQuery(
      `SELECT * FROM "${CompanyDB}"."APPROVALS" WHERE DOC_ID = ? AND STEP_ID = ? AND APPROVER_USER_ID = ?`,
      [docId, currentStep.STEP_ID, Number(userId)]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: 'You have already responded to this step', });
    }

    // Insert approval
    await runQuery(
      `INSERT INTO "${CompanyDB}"."APPROVALS" (APPROVAL_ID, DOC_ID, STEP_ID, APPROVER_USER_ID, APPROVAL_STATUS, COMMENTS) VALUES (?, ?, ?, ?, ?, ?)`,
      [uuidv4(), docId, currentStep.STEP_ID, Number(userId), approvalStatus, comments]
    );

    // Handle immediate cancellation
    if (approvalStatus === 'cancelled') {
      await runQuery(
        `UPDATE "${CompanyDB}"."DOCUMENTS" SET STATUS = 'cancelled', CURRENT_STEP_ID = NULL WHERE DOC_ID = ?`,
        [docId]
      );
      return res.json({ message: 'Document cancelled, workflow ended', cancelled: true });
    }

    // Count approvals and rejections
    const allApprovals = await runQuery(
      `SELECT APPROVAL_STATUS FROM "${CompanyDB}"."APPROVALS" WHERE DOC_ID = ? AND STEP_ID = ?`,
      [docId, currentStep.STEP_ID]
    );
    const approvedCount = allApprovals.filter(a => a.APPROVAL_STATUS === 'approved').length;
    const rejectedCount = allApprovals.filter(a => a.APPROVAL_STATUS === 'rejected').length;
    const requiredApprove = currentStep.NO_OF_APPROVAL || 1;
    const requiredReject = currentStep.NO_OF_REJECTION || 1;

    // Reject Quorum Met
    if (rejectedCount >= requiredReject || approvalStatus === 'rejected') {
      await runQuery(
        `UPDATE "${CompanyDB}"."DOCUMENTS" SET STATUS = 'rejected', CURRENT_STEP_ID = NULL WHERE DOC_ID = ?`,
        [docId]
      );
      return res.json({ message: 'Document rejected, workflow ended', rejected: true,docId });
    }

    // Approve Quorum Met
    if (approvedCount >= requiredApprove) {
      const currentOrder = currentStep.STEP_ORDER;
      let nextStep = null;

      for (const step of steps) {
        if (step.STEP_ORDER > currentOrder) {
          if (!step.CONDITION || evaluateCondition(step.CONDITION, doc)) {
            nextStep = step;
            break;
          }
        }
      }

      if (!nextStep) {
        await runQuery(
          `UPDATE "${CompanyDB}"."DOCUMENTS" SET STATUS = 'approved', CURRENT_STEP_ID = NULL WHERE DOC_ID = ?`,
          [docId]
        );
        const payload = JSON.parse(doc.PAYLOAD);
        return res.json({ message: 'Document fully approved, workflow completed', Approved: true, payload,docId });
      }

      // Move to next step
      await runQuery(
        `UPDATE "${CompanyDB}"."DOCUMENTS" SET CURRENT_STEP_ID = ? WHERE DOC_ID = ?`,
        [nextStep.STEP_ID, docId]
      );
      return res.json({ message: 'Step approved, moved to next step', nextStep });
    }

    // If quorum not met yet
    res.json({ message: 'Approval recorded, waiting for others' });
  } catch (error) {
    console.error('Error approving step:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


async function loginToSAP() {
  try {
    const response = await axios.post(
      `${process.env.SAP_HANA_URL}/Login` ,
      {
        UserName: process.env.SAP_USERNAME, 
        Password: process.env.SAP_PASSWORD,
        CompanyDB: process.env.CompanyDB      
      },
      {
        headers: { "Content-Type": "application/json" },
        httpsAgent
      }
    );
console.log(response.data)
console.log(process.env.SAP_HANA_URL)
    const sessionId = response.data.SessionId;
    if (!sessionId) throw new Error("No SessionId returned from SAP");

    const cookieHeader = `B1SESSION=${sessionId}`;
    return cookieHeader;
  } catch (err) {
    console.error("SAP Login Failed", err.message);
    return null;
  }
}



// cron.schedule("*/1 * * * *", async () => {
//   console.log("⏳ Cron Job: Checking unposted SAP documents...");

//   try {

//     const sessionId= await loginToSAP();
//     const CompanyDB = process.env.CompanyDB;

//     // 1. Fetch unposted documents
//     const unpostedDocs = await runQuery(
//       `SELECT DOC_ID, DOC_TYPE_ID, PAYLOAD 
//        FROM "${CompanyDB}"."DOCUMENTS"
//        WHERE IS_POSTED_TO_SAP = false ORDER BY DOC_DATE DESC`
//     );
    
//     if (!unpostedDocs || unpostedDocs.length === 0) {
//       console.log("✅ No unposted documents found.");
//       return;
//     }

//     // 2. Iterate each unposted document
//     for (const doc of unpostedDocs) {
//       const docId = doc.DOC_ID;
//       const docTypeId = doc.DOC_TYPE_ID;
//       const payload = JSON.parse(doc.PAYLOAD || "{}");

//       try {

//         let sapRes, sapDocNum;
        
//         if (docTypeId === "Inventory Request") {
    
//           sapRes = await axios.post(
//             `${process.env.SAP_HANA_URL}/InventoryTransferRequests`,
//             payload,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 'Cookie': sessionId,  
//               },
//               httpsAgent,
//             }
//           );

         
//           const sapDocNum = sapRes.data?.DocNum || sapRes.data?.DocEntry;
          
          
//           // Update local DB
//           await axios.put(`${process.env.BASE_URL}/api/documents/update-sap-status?CompanyDB=${CompanyDB}`, {
//             docId,
//             sapDocNum,
//             isPostedToSAP: true,
//           });
          
//           console.log(`✅ Inventory Request posted for DocID: ${docId}, SAP DocNum: ${sapDocNum}`);
//         } 
//         else if (docTypeId === "Good Issue") {
//           // Convert payload into SAP format for Good Issue
        
//           const sapPayload = {
//             // U_Type: "Good_Issue",
//             //  U_AdjType: "Inter_Company",
//             U_Portal_Doc: payload?.U_Portal_Doc,
//             DocumentLines: payload.StockTransferLines,
//           };
//           console.log(`${process.env.SAP_HANA_URL}/InventoryGenExits`)

//           const sapRes = await axios.post(
//     `${process.env.SAP_HANA_URL}/InventoryGenExits`,
//     sapPayload,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         'Cookie': sessionId,
//       },
//       httpsAgent,
//     }
//   );
  
//           sapDocNum = sapRes.data?.DocNum || sapRes.data?.DocEntry;

//           await axios.put(`${process.env.BASE_URL}/api/documents/update-sap-Issue-status?CompanyDB=${CompanyDB}`, {
//             docId,
//             sapDocNum,
//             isPostedToSAP: true,
//           });

//           console.log(`✅ Good Issue posted for DocID: ${docId}, SAP DocNum: ${sapDocNum}`);
//         } 
//         else {
//           console.log(`⚠️ Unknown docTypeId for DocID: ${docId}`);
//         }
//       } catch (err) {
//         console.error(`❌ Failed to post DocID ${doc.DOC_ID}:`, err.response?.data || err.message);
//         console.error(`❌ Failed to post DocID ${doc.DOC_ID}:`, err.message);
//         // Mark as failed so retry will happen next cron
//         await axios.put(`${process.env.BASE_URL}/api/documents/update-sap-status?CompanyDB=${CompanyDB}`, {
//           docId: doc.DOC_ID,
//           sapDocNum: null,
//           isPostedToSAP: false,
//         });
//       }
//     }
//   } catch (err) {
//     console.error("❌ Cron job error:", err.message);
//   }
// });










const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

