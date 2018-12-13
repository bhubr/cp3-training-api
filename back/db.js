const mysql = require('mysql');
const { db } = require('./settings');

const connection = mysql.createConnection(db);

module.exports = connection;
