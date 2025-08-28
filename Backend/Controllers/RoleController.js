const db = require("../db");

exports.getAllRoles = async (req, res) => {
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const roles = await db.query(`SELECT * FROM "${companyDB}"."ROLES"`);
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

exports.getRoleById = async (req, res) => {
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const [role] = await db.query(`SELECT * FROM "${companyDB}"."ROLES" WHERE id = ?`, [req.params.id]);
    if (!role) return res.status(404).json({ error: 'Role not found' });

    const permissions = await db.query(
      `SELECT permission FROM "${companyDB}"."ROLEPERMISSIONS" WHERE roleId = ?`,
      [req.params.id]
    );

    res.json({ ...role, permissions: permissions.map(p => p.PERMISSION) });
    
  } catch (err) {
    
    res.status(500).json({ error: 'Failed to fetch role' });
  }
};

exports.createRole = async (req, res) => {
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const { name, description } = req.body;
  try {
    await db.query(`INSERT INTO "${companyDB}"."ROLES" (name, description) VALUES (?, ?)`, [name, description]);
    res.status(201).json({ message: 'Role created successfully' });
  } catch (err) {
    console.error("Create Role Error:", err);
    res.status(500).json({ error: 'Failed to create role' });
  }
};

exports.updateRole = async (req, res) => {

    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });


  const { name, description } = req.body;
  try {
    await db.query(`UPDATE "${companyDB}"."ROLES" SET name = ?, description = ? WHERE id = ?`, [
      name,
      description,
      req.params.id
    ]);
    res.json({ message: 'Role updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
};

exports.deleteRole = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    await db.query(`DELETE FROM "${companyDB}"."ROLEPERMISSIONS" WHERE roleId = ?`, [req.params.id]);
    await db.query(`DELETE FROM "${companyDB}"."ROLES" WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
};

exports.addPermissions = async (req, res) => {
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const roleId = req.params.id;
  const { permissions } = req.body;

  try {
    for (const perm of permissions) {
      await db.query(
        `INSERT INTO "${companyDB}"."ROLEPERMISSIONS" (roleId, permission) VALUES (?, ?)`,
        [roleId, perm]
      );
    }

    res.status(201).json({ message: 'Permissions added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add permissions' });
  }
};

exports.updatePermissions = async (req, res) => {
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  const roleId = req.params.id;
  const { permissions } = req.body;

  try {
    await db.query(`DELETE FROM "${companyDB}"."ROLEPERMISSIONS" WHERE roleId = ?`, [roleId]);

    for (const perm of permissions) {
      await db.query(
        `INSERT INTO "${companyDB}"."ROLEPERMISSIONS" (roleId, permission) VALUES (?, ?)`,
        [roleId, perm]
      );
    }

    res.json({ message: 'Permissions updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update permissions' });
  }
};

exports.getROLEPERMISSIONS = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });


  const roleId = req.params.id;

  try {
    const perms = await db.query(
      `SELECT permission FROM "${companyDB}"."ROLEPERMISSIONS" WHERE roleId = ?`,
      [roleId]
    );
    res.json({ roleId, permissions: perms.map(p => p.PERMISSION) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get permissions' });
  }
};

exports.getAllPermissions = async (req, res) => {
    const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const result = await db.query(`
      SELECT 
        r.id AS ROLE_ID,
        r.name AS ROLE_NAME,
        IFNULL(STRING_AGG(rp.permission, ','), '') AS PERMISSIONS
      FROM "${companyDB}"."ROLES" r
      LEFT JOIN "${companyDB}"."ROLEPERMISSIONS" rp ON r.id = rp.roleId
      GROUP BY r.id, r.name
      ORDER BY r.id
    `);

    res.json(result);
  } catch (err) {
    console.error("Failed to get role permissions:", err);
    res.status(500).json({ error: 'Failed to get role permissions' });
  }
};


exports.getRolesSummary = async (req, res) => {
  const { companyDB } = req.query;
  if (!companyDB) return res.status(400).json({ message: "Missing companyDB" });

  try {
    const roles = await db.query(`SELECT id, name FROM "${companyDB}"."ROLES"`);
    res.json({
      totalRoles: roles.length,
      roles
    });
  } catch (err) {
    console.error("Error fetching roles summary:", err);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};