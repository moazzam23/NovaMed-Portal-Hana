const db = require("../db");

// exports.getNextDocumentNumber = async (req, res) => {
//      const { companyDB } = req.query;
//   if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

//   const { documentType } = req.params;

//   try {
//     const result = await db.query(
//       `SELECT * FROM "${companyDB}"."DOCUMENTSEQUENCES" 
//        WHERE documentType = ? AND isActive = 1 
//        ORDER BY id 
//        LIMIT 1`,
//       [documentType]
//     );

//     const sequence = result[0];
//     if (!sequence) {
//       return res.status(404).json({ message: 'Sequence not found for this document type.' });
//     }

//     const paddedNumber = sequence.NEXTNUMBER.toString().padStart(sequence.PADDINGLENGTH, '0');
//     const documentNo = `${sequence.PREFIX}${paddedNumber}`;

//     await db.query(
//       `UPDATE "${companyDB}"."DOCUMENTSEQUENCES" 
//        SET nextNumber = nextNumber + 1, updatedAt = CURRENT_TIMESTAMP 
//        WHERE id = ?`,
//       [sequence.ID]
//     );

//     res.json({ documentNo });
//   } catch (error) {
//     console.error('Error generating document number:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
// GET /document-number/:documentType?companyDB=...
exports.getNextDocumentNumber = async (req, res) => {
  const { companyDB } = req.query;
  const { documentType } = req.params;

  if (!companyDB || !documentType)
    return res.status(400).json({ message: "Missing parameters" });

  try {
    const result = await db.query(
      `SELECT * FROM "${companyDB}"."DOCUMENTSEQUENCES" 
       WHERE documentType = ? AND isActive = 1 
       ORDER BY id 
       LIMIT 1`,
      [documentType]
    );

    const sequence = result[0];
    if (!sequence) {
      return res.status(404).json({ message: 'Sequence not found for this document type.' });
    }

    const paddedNumber = sequence.NEXTNUMBER.toString().padStart(sequence.PADDINGLENGTH, '0');
    const documentNo = `${sequence.PREFIX}${paddedNumber}`;

    res.json({ documentNo });
  } catch (error) {
    console.error('Error getting document number:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createDocumentSequence = async (req, res) => {
     const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const {
    documentType,
    prefix,
    nextNumber = 1,
    paddingLength = 4,
    isActive = 1,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO "${companyDB}"."DOCUMENTSEQUENCES" 
        (documentType, prefix, nextNumber, paddingLength, isActive, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [documentType, prefix, nextNumber, paddingLength, isActive]
    );

    res.json({ message: 'Document sequence created successfully' });
  } catch (error) {
    console.error('Error creating document sequence:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateDocumentSequence = async (req, res) => {
     const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const { id } = req.params;
  const {
    documentType,
    prefix,
    nextNumber,
    paddingLength,
    isActive,
  } = req.body;

  try {
    await db.query(
      `UPDATE "${companyDB}"."DOCUMENTSEQUENCES" 
       SET documentType = ?, prefix = ?, nextNumber = ?, paddingLength = ?, isActive = ?, updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [documentType, prefix, nextNumber, paddingLength, isActive, id]
    );

    res.json({ message: 'Document sequence updated successfully' });
  } catch (error) {
    console.error('Error updating document sequence:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllSequences = async (req, res) => {
     const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const result = await db.query(`SELECT * FROM "${companyDB}"."DOCUMENTSEQUENCES"`);
    res.json(result);
  } catch (error) {
    console.error('Error fetching sequences:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getDocumentSequenceById = async (req, res) => {
     const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const { id } = req.params;

  try {
    const result = await db.query(`SELECT * FROM "${companyDB}"."DOCUMENTSEQUENCES" WHERE id = ?`, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Sequence not found.' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching sequence by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a document sequence by ID
exports.deleteDocumentSequence = async (req, res) => {
     const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const { id } = req.params;

  try {
    const result = await db.exec(
      `DELETE FROM "${companyDB}"."DOCUMENTSEQUENCES" WHERE "id" = ?`,
      [id]
    );

    if (result === 0) {
      return res.status(404).json({ message: 'Sequence not found.' });
    }

    res.json({ message: 'Document sequence deleted successfully' });
  } catch (error) {
    console.error('Error deleting document sequence:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
