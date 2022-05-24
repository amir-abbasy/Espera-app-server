const Model = require("../Model");

class ContestModel extends Model {
  //get all data from a table in decending order by a field
  getAllWithProducts = async (callback) => {
    let sql = `SELECT * from contests INNER JOIN products ON contests.product_id = products.pr_id`;
    this.db.query(sql, callback);
    // this.db.query(sql, (err, result)=>{
    //     console.log("result", result);
    //     console.log("err",err);
    // });
  };

  getOneWithProduct = async (field, value, callback) => {
    let sql = `SELECT * FROM contests INNER JOIN products ON contests.product_id = products.pr_id  WHERE ??=? `;
    this.db.query(sql, [field, value], callback);
    // this.db.query(sql, [field, value], (err, result)=>{
    //     console.log("result", result);
    //     console.log("err",err);
    // });
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
    let sql = `UPDATE orders_spots SET quantity =${obj.quantity} WHERE order_id = ${obj.id}`;
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
    user_id,
    callback
  ) => {

    let sql = `SELECT *
FROM ((orders_spots
INNER JOIN contests ON orders_spots.contest_id = contests.con_id)
INNER JOIN products ON orders_spots.product_id = products.pr_id) WHERE orders_spots.user_id = '${user_id}' AND  order_status = 'oncart';`;

    this.db.query(sql,callback);
  };

  updateSpot = (obj, callback) => {
    let sql = `UPDATE orders_spots SET order_status ='${obj.order_status}' WHERE order_id = ${obj.order_id}`;
    this.db.query(sql, callback);
  };

  updateContestSpot = (obj, callback) => {
    let sql = `UPDATE contests SET con_spots = ${parseInt(obj.current_spots) + 1} WHERE con_id = '${obj.contest_id}'`;
    this.db.query(sql, callback);
  };

}

module.exports = ContestModel;
