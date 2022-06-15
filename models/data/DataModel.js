const Model = require("../Model");


class DataModel extends Model {

    // Ending Spots
    // SELECT * FROM `contests` INNER JOIN products ON contests.product_id = products.pr_id WHERE con_status = 'active' AND (con_spots*100/con_total_spots) > 60;
    getEndingSpots = (callback) => {
        let sql = `SELECT * FROM contests INNER JOIN products ON contests.product_id = products.pr_id WHERE con_status = 'active' AND (con_spots*100/con_total_spots) > 60`;
        this.db.query(sql, callback);
    };

    // Curosal
    // SELECT * FROM `contests` INNER JOIN products ON contests.product_id = products.pr_id ORDER BY contests.id DESC LIMIT 3;
    getCovers = (callback) => {
        let sql = `SELECT * FROM contests INNER JOIN products ON contests.product_id = products.pr_id ORDER BY contests.id DESC LIMIT 3`;
        this.db.query(sql, callback);
    };
}

module.exports = DataModel;