const mysql  = require('mysql');
require('dotenv').config();

const ENV = process.env;

const host =  ENV.NODE_ENV ==  'dev' ? ENV.HOST2 : ENV.HOST; 
const user =  ENV.NODE_ENV ==  'dev' ? ENV.USER2 : ENV.USER;
const password = ENV.NODE_ENV ==  'dev' ? ENV.PASS2 : ENV.PASS;
const database = ENV.NODE_ENV ==  'dev' ? ENV.DB2 : ENV.DB;

console.log(host, user, password, database);

const pool  = mysql.createPool({
    connectionLimit: 10,
    host,
    user,
    password,
    database,
})

module.exports = pool;