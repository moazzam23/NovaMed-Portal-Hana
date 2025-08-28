require('dotenv').config();
const hana = require('@sap/hana-client');

const config = {
  serverNode: process.env.HANA_SERVER, // e.g., 'hostname:30015'
  uid: process.env.HANA_USER,
  pwd: process.env.HANA_PASS,
};

const conn = hana.createConnection();

// Connect to SAP HANA (safe version with callback)
async function connect() {
  return new Promise((resolve, reject) => {
    if (conn.state === 'connected') {
      console.log("✅ Already connected to SAP HANA");
      return resolve(conn);
    }

    conn.connect(config, (err) => {
      if (err) {
        console.error("❌ HANA connection failed:", err);
        return reject(err);
      }

      console.log("✅ Connected to SAP HANA");
      resolve(conn);
    });
  });
}

// Query wrapper with parameter support
// Query wrapper with auto-disconnect
async function query(queryString, params = []) {
  const localConn = hana.createConnection();

  return new Promise((resolve, reject) => {
    localConn.connect(config, (err) => {
      if (err) {
        console.error("❌ HANA connection failed:", err);
        return reject(err);
      }

      localConn.prepare(queryString, (err, statement) => {
        if (err) {
          console.error("❌ Prepare error:", err);
          localConn.disconnect();
          return reject(err);
        }

        statement.exec(params, (err, rows) => {
          localConn.disconnect(); // Disconnect right after execution

          if (err) {
            console.error("❌ Execution error:", err);
            return reject(err);
          }

          resolve(rows);
        });
      });
    });
  });
}


// Close connection gracefully (optional)
function close() {
  if (conn.state === 'connected') {
    conn.disconnect();
    console.log("🔌 Disconnected from SAP HANA");
  }
}

module.exports = {
  query,
  close,
};
