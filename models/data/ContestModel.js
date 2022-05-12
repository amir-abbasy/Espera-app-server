const Model = require("../Model");

class ContestModel extends Model {
  //get all data from a table in decending order by a field
  getAllWithProducts = async (callback) => {
    let sql = `SELECT * from contests INNER JOIN products ON contests.product_id = products.id`;
    this.db.query(sql, callback);
    // this.db.query(sql, (err, result)=>{
    //     console.log("result", result);
    //     console.log("err",err);
    // });
  };

  getOneWithProduct = async (field, value, callback) => {
    let sql = `SELECT * FROM contests INNER JOIN products ON contests.product_id = products.id  WHERE ??=? `;
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

  updateData=(obj, callback) => { 
    let sql = `UPDATE orders_spots SET ? WHERE id = ?`;
    this.db.query(sql, [obj, obj.id], callback);
  }

  updateQuantity =(obj, callback) => { 
    let sql = `UPDATE orders_spots SET quantity =${obj.quantity} WHERE id = ${obj.id}`;
    this.db.query(sql, callback);
  }


}

module.exports = ContestModel;
