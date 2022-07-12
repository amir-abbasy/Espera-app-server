const Model = require("../Model");


class UserModel extends Model {

  getMyCoupens = async (obj, callback) => {

    // get coupens active   
    // SELECT * FROM `orders_spots` INNER JOIN contests ON contests.con_id = orders_spots.contest_id AND contests.con_status = 'draw' INNER JOIN products ON orders_spots.product_id = products.pr_id WHERE user_id = 'usr_5afd1340dded' AND order_status = 'oncart';

    let sql = `SELECT * FROM orders_spots INNER JOIN contests ON contests.con_id = orders_spots.contest_id INNER JOIN products ON orders_spots.product_id = products.pr_id WHERE user_id = '${obj.user_id}' AND order_status = 'complete'`;
    this.db.query(sql, callback);
  };

  getMyAddress = async (obj,callback) => {
    let sql = `SELECT user_address FROM users WHERE user_id = '${obj.user_id}'`;
    this.db.query(sql, callback);
  };

  updateMyAddress = async (obj, callback) => {
    let sql = `UPDATE users SET user_address ='${obj.address}' WHERE user_id = '${obj.user_id}'`;
    this.db.query(sql, callback);
  };
  getStaff = (obj, callback) => {
    let sql = `SELECT * FROM users WHERE user_id = '${obj.user_id}' AND isStaff=1`;
    this.db.query(sql, callback);
  };
  addToReferral = (obj, callback) => {
    let sql = `INSERT INTO referrals SET ?`;
    this.db.query(sql, obj, callback);
  };
  getNewReferrals = (callback) => {
    let sql = `SELECT * FROM referrals INNER JOIN users ON referrals.ref_id = users.user_id`;
    this.db.query(sql, callback);
  };

}

module.exports = UserModel;