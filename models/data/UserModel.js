const Model = require("../Model");


class UserModel extends Model{

    getMyCoupens = async (callback) => {
    
    // get coupens active   
    // SELECT * FROM `orders_spots` INNER JOIN contests ON contests.con_id = orders_spots.contest_id AND contests.con_status = 'draw' INNER JOIN products ON orders_spots.product_id = products.pr_id WHERE user_id = 'usr_5afd1340dded' AND order_status = 'oncart';
      
        let sql = `SELECT * FROM orders_spots INNER JOIN contests ON contests.con_id = orders_spots.contest_id INNER JOIN products ON orders_spots.product_id = products.pr_id WHERE user_id = 'admin' AND order_status = 'complete'`;
        this.db.query(sql, callback);
      };
}

module.exports = UserModel;