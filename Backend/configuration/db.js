// For MySQL
const mysql = require("mysql");
const sql = require("mssql");

const ormdb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ormdb"
});

const leavemanagement = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "leavemanagement"
});

const test = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

// SQL Server connection configuration
const sqlConfig = {
    user: 'sa',
    password: 'Ne!Nlog!DB',
    server: '10.206.10.10',
    database: 'Logisys',
    options: {
        encrypt: false,
        enableArithAbort: true,
        connectTimeout: 30000, // 30 seconds
        requestTimeout: 60000  // 60 seconds
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};




// Create SQL Server connection pool
// const sqlServerConnectionPool = new sql.ConnectionPool(sqlConfig)
//     .connect()
//     .then(pool => {
//         console.log("Connected to SQL Server");
//         return pool;
//     })
//     .catch(err => {
//         console.log("Failed to connect to SQL Server:", err);
//     });

// module.exports = {
//     ormdb,
//     leavemanagement,
//     test,
//     sqlServerConnectionPool // export the promise
// };

module.exports = {
    ormdb,
    leavemanagement,
    test // export the promise
};
