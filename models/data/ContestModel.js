const Model = require("../Model");

class ContestModel extends Model {
  //get all data from a table in decending order by a field
  getActiveWithProducts = async (callback) => {
    let sql = `SELECT * from contests INNER JOIN products ON contests.product_id = products.pr_id WHERE con_status = 'active'`;
    this.db.query(sql, callback);
    // this.db.query(sql, (err, result)=>{
    //     console.log("result", result);
    //     console.log("err",err);
    // });
  };

  getSoldoutWithProducts = async (callback) => {
    let sql = `SELECT * from contests INNER JOIN products ON contests.product_id = products.pr_id WHERE con_status = 'draw'`;
    this.db.query(sql, callback);
  };

  getOneWithProduct = async (field, value, callback) => {
    let sql = `SELECT * FROM contests INNER JOIN products ON contests.product_id = products.pr_id  WHERE ??=? `;
    this.db.query(sql, [field, value], callback);
  };

  orderSpot = (obj, callback) => {
    let sql = `INSERT INTO orders_spots SET ?`;
    this.db.query(sql, obj, callback);
  };

  updateData = (obj, callback) => {
    let sql = `UPDATE orders_spots SET ? WHERE id = ?`;
    this.db.query(sql, [obj, obj.id], callback);
  };

  updateQuantity = (obj, callback) => {
    console.log("HRER", obj.id);
    let sql = `UPDATE orders_spots SET quantity =${obj.quantity} WHERE order_id = '${obj.id}'`;
    this.db.query(sql, callback);
  };

  //get all data from a table in filter by a field and order by field
  getOrders_ = async (
    table,
    field,
    value,
    order_status,
    status,
    order_field,
    callback
  ) => {
    let sql = `SELECT * from ?? WHERE ?? =? AND ?? =? ORDER BY ?? DESC`;
    this.db.query(
      sql,
      [table, field, value, order_status, status, order_field],
      callback
    );
  };

  getOrders = async (
    obj,
    callback
  ) => {

    let sql = `SELECT *
FROM ((orders_spots
INNER JOIN contests ON orders_spots.contest_id = contests.con_id)
INNER JOIN products ON orders_spots.product_id = products.pr_id) WHERE orders_spots.user_id = '${obj.user_id}' AND  order_status = '${obj.status}';`;

    this.db.query(sql, callback);
  };

  updateSpot = (obj, callback) => {
    let sql = `UPDATE orders_spots SET order_status ='${obj.order_status}' WHERE order_id = '${obj.order_id}'`;
    this.db.query(sql, callback);
  };

  updateContestSpot = (obj, callback) => {
    //  let sql = `UPDATE contests SET con_spots = ${parseInt(obj.current_spots) + 1} WHERE con_id = '${obj.contest_id}'`;
    let sql = `UPDATE contests SET con_status = CASE WHEN (con_spots+1 = con_total_spots)THEN 'draw' ELSE 'active' END, con_spots = con_spots+1 WHERE con_id = '${obj.contest_id}'`;
    this.db.query(sql, callback);
  };

  getAllCoupons = (obj, callback) => {
    // con_243636b913cf
    let sql = `SELECT coupen FROM orders_spots WHERE contest_id = '${obj.contest_id}'`;
    this.db.query(sql, callback);
  };

  setWinner = (obj, callback) => {
    let sql = `UPDATE contests SET con_winner = (SELECT user_id FROM orders_spots WHERE coupen = '${obj.winnerCoupen}') , con_winnerCoupen = '${obj.winnerCoupen}', con_status = 'complete' WHERE con_id = '${obj.contest_id}'`;
    this.db.query(sql, callback);
  };

  getHistory = (callback) => {
    let sql = `SELECT * from contests INNER JOIN users ON contests.con_winner = users.user_id WHERE con_status = 'complete'`;
    this.db.query(sql, callback);
  };


}

module.exports = ContestModel;
