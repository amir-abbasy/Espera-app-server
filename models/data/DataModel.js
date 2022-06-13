const Model = require("../Model");


class DataModel extends Model{

    // Ending Spots
    // SELECT * FROM `contests` INNER JOIN products ON contests.product_id = products.pr_id WHERE con_status = 'active' AND (con_spots*100/con_total_spots) > 60;

    // Curosal
    // SELECT * FROM `contests` INNER JOIN products ON contests.product_id = products.pr_id ORDER BY contests.id DESC LIMIT 3;

}

module.exports = DataModel;