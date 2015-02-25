var mysql = require('mysql');

var pool = mysql.createPool({
    host    :'localhost',
    port : 3306,
    user : 'toriworks',
    password : 'z1z2z3z4',
    database:'freelancer',
    connectionLimit:20,
    waitForConnections:false
});

module.exports.pool = pool;