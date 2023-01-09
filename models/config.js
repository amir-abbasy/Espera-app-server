const mysql  = require('mysql');
require('dotenv').config();


// password : esperadb 
// 

const ENV = process.env;

const host =  ENV.NODE_ENV ==  'dev' ? ENV.HOST2 : ENV.HOST; 
const user =  ENV.NODE_ENV ==  'dev' ? ENV.USER2 : ENV.USER;
const password = ENV.NODE_ENV ==  'dev' ? ENV.PASS2 : ENV.PASS;
const database = ENV.NODE_ENV ==  'dev' ? ENV.DB2 : ENV.DB;
const port = ENV.NODE_ENV ==  'dev' ? 3306 : ENV.DB_PORT;

console.log(host, user, password, database);

 dbConnectionInfo = {
   connectionLimit: 10,
   host,
   user,
   password,
   database,
   port

// host: 'remotemysql.com',
// user:'FehCWiaq69',
// password:'GDwQD9Ia9h',
// database:'FehCWiaq69'

  };
 
//create mysql connection pool
var dbconnection = mysql.createPool(
  dbConnectionInfo
);

// Attempt to catch disconnects 
dbconnection.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});


module.exports = dbconnection;