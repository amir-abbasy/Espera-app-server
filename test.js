var mysql = require("mysql");

var con_old = mysql.createConnection({
  host: "remotemysql.com",
  user: "FehCWiaq69",
  password: "GDwQD9Ia9h",
  database: "FehCWiaq69",
});

var con_ = mysql.createConnection({
  host: "bhwdv9rufh3o7burmar7-mysql.services.clever-cloud.com",
  user: "ujw3q140jhsrpszz",
  password: "9y1u0T9R6ZUJchitKL4",
  database: "bhwdv9rufh3o7burmar7",
  port: 20345,
});


var con_new = mysql.createConnection({
  host: "baxpf1npuhsuypym7vzu-mysql.services.clever-cloud.com",
  user: "uwi2o1iaudh2pjvw",
  password: "fHF18iybzMvEo1ZfQISG",
  database: "baxpf1npuhsuypym7vzu",
  port: 3306,
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "coupen",
  
});



con_.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// con_.query(
//   "SELECT * from contests INNER JOIN products ON cont+ests.product_id = products.pr_id WHERE con_status = 'active'",
//   function (err, result) {
//     if (err) throw err;
//     console.log("Database result", result);
//   }
// );

// con_.end();

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("SELECT * from contests INNER JOIN products ON contests.product_id = products.pr_id WHERE con_status = 'active'", function (err, result) {
//     if (err) throw err;
//     console.log("Database result" ,result);
//   });
// });
