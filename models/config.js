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

    // host: "127.0.0.1",
    // user: "root",
    // password: "amir",
    // database: "coupen"
})


// var pool_ = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "amir",
//     database: "coupen"
//   });



  //  var con = pool_.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   return pool_;
  // });


  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   var sql = "INSERT INTO users (user_id, fullname, username, user_password,mobile) VALUES ('user2','fullname',  'Amir 2', '123456', 'mobile')";
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("1 record inserted");
  //   });
  // });

// function run(){
//     var sql = "INSERT INTO users (user_id, fullname, username, user_password,mobile) VALUES ('user2','fullname',  'Amir 2', '123456', 'mobile')";
//     pool_.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
// }

// run()


// module.exports = pool;



// var mysql = require('mysql');

 // connect to the db
 dbConnectionInfo = {
   connectionLimit: 5, //mysql connection pool length
   host: "localhost",
//    port: "3306",
   user: "root",
   password: "amir",
   database: "coupen"
 };
 
 //For mysql single connection
 /* var dbconnection = mysql.createConnection(
         dbConnectionInfo
 ); 
 dbconnection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
}); 

*/

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