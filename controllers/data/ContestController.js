const multer = require("multer");
var upload = require("../../utils/file_uploader");
const ContestModel = require("../../models/data/ContestModel");

const table = "contests";

const ContestController = {
  getContest: (req, res) => {
    // const table = req.params.table
    const field = req.params.field;
    const value = req.params.value;
    new ContestModel().getOne(table, field, value, (err, results) => {
      if (err) res.send("ERR");
      else res.send(results);
    });
  },
  getContests: (req, res) => {
    // const table = req.params.table
    const sort_field = req.params.field;
    new ContestModel().getAll(table, sort_field, (err, results) => {
      if (err) res.send("ERR");
      else res.send(results);
    });
  },
  createContest: (req, res) => {
    // var path = "public\\images\\contest_cover";
    var path = "public/images/contest_cover";
    upload(path)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      // const table = req.params.table
      const fields = {
        ...req.body,
        con_id: new Date().getDate(),
        con_status: "active",
        con_thumbnails: req.file.filename,
      };
      console.log("====", fields);
      new ContestModel().addData(table, fields, (err, results) => {
        if(err)res.send("ERR"+err);
        else {
          res.send("Contest Created Successfully");
          // res.redirect('product/addProdcuts_page')
          console.log("SUCCESS");
        }
      });
    });
    //   var fields_ = {...fields, pr_thumbnails: req.file.name};
  },
  updateContest: (req, res) => {
    // const table = req.params.table
    const fields = req.body;
    new ContestModel().updateData(table, fields, (err, results) => {
      if (err) res.send("ERR");
      else res.send(results);
    });
  },
  deleteContest: (req, res) => {
    // const table = req.params.table
    const _id = req.body.id;
    new ContestModel().deleteData(table, _id, (err, results) => {
      if (err) res.send("ERR");
      else res.send(results);
    });
  },
  getAllWithProducts: (req, res) => {
    console.log("all works");
    new ContestModel().getAllWithProducts(table, (err, results) => {
      if (err) res.send("ERR");
      else res.send(results);
    });
  },

  // SPOTS

  getMyOrders: (req, res) => {
    const user_id = req.params.user_id;
    new ContestModel().getOrders(
      user_id,
      (err, results) => {
        if (err) res.send("ERR"+err);
        else res.send("£££", results);
      }
    );
  },

  getMyOrders_: (req, res) => {
    const user_id = req.params.user_id;
    new ContestModel().getOrders(
      "orders_spots",
      "user_id",
      user_id,
      "order_status",
      "oncart",
      "id",
      (err, results) => {
        if (err) res.send("ERR"+err);
        else res.send(results);
      }
    );
  },

  orderSpot: (req, res) => {
    new ContestModel().orderSpot(
      { ...req.params, 
        order_id: new Date().getTime(),
        coupen:new Date().getTime(),
        order_status: "oncart",
        quantity: 1, },
      (err, results) => {
        if (err) res.send("ERR : "+err);
        else res.send(results);
      }
    );
  },
  updateQuantity: (req, res) => {
    var order_id = req.params.order_id;
    const quantity = req.body.quantity;

    // console.log(order_id, "quantity--", req.body.quantity);

    new ContestModel().updateQuantity(
      { id: order_id, quantity: quantity },
      (err, results) => {
        if (err) res.send("ERR");
        else res.send(results);
      }
    );
  },
  goToPayment: (req, res) => {
    var order_id = req.params.order_id;
    var contest_id = req.params.contest_id;
    var current_spots = req.params.spots;

    // console.log("now", req.params);
    new ContestModel().updateSpot(
      {order_id, order_status: "complete" },
      (err, results) => {
        if (err) res.send("ERR"+err);
        // else res.send(results);
        else console.log('spot status updated');
      }
    )
    new ContestModel().updateContestSpot(
      { contest_id, current_spots},
      (err, results) => {
        if (err) res.send("ERR"+err);
        else res.send(results);
      }
    );
  },
};

module.exports = ContestController;
