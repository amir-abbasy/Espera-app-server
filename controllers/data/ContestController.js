const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
var upload = require("../../utils/file_uploader");
const ContestModel = require("../../models/data/ContestModel");

const table = "contests";

const ContestController = {
  getContest: (req, res) => {
    // const table = req.params.table
    const field = req.params.field;
    const value = req.params.value;
    new ContestModel().getOne(table, field, value, (err, results) => {
      if (err) res.status(202).send("ERR");
      else res.status(200).send(results);
    });
  },
  getContests: (req, res) => {
    // const table = req.params.table
    const sort_field = req.params.field;
    new ContestModel().getAll(table, sort_field, (err, results) => {
      if (err) res.status(202).send("ERR");
      else res.status(200).send(results);
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
        con_id: 'con_' + uuidv4().split('-')[4],
        con_status: "active",
        con_thumbnails: req.file.filename,
        con_spots: 0
      };
      console.log("====", fields);
      new ContestModel().addData(table, fields, (err, results) => {
        if (err) res.status(202).send("ERR" + err);
        else {
          res.status(200).send("Contest Created Successfully");
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
      if (err) res.status(202).send("ERR");
      else res.status(200).send(results);
    });
  },
  deleteContest: (req, res) => {
    // const table = req.params.table
    const _id = req.body.id;
    new ContestModel().deleteData(table, _id, (err, results) => {
      if (err) res.status(202).send("ERR");
      else res.status(200).send(results);
    });
  },
  getAativeWithProducts: async (req, res) => {
    await new ContestModel().getActiveWithProducts((err, results) => {
      if (err) res.status(202).send("ERR");
      else res.status(200).send(results);
    });
  },
  getSoldoutWithProducts: async (req, res) => {
    await new ContestModel().getSoldoutWithProducts((err, results) => {
      if (err) res.status(202).send("ERR");
      else res.status(200).send(results);
    });
  },
  getOneWithProduct: (req, res) => {
    new ContestModel().getOneWithProduct('contests.con_id', req.params.contest_id, (err, results) => {
      if (err) res.status(202).send("ERR");
      else res.status(200).send(results);
    });
  },


  // SPOTS

  getMyOrders: (req, res) => {
    const { user_id, status } = req.params
    new ContestModel().getOrders(
      {
        user_id,
        status
      },
      (err, results) => {
        if (err) res.status(202).send("ERR" + err);
        else res.status(200).send(results)
      }
    );
  },


  orderSpot: (req, res) => {
    const coupen = 'coup_' + req.params.contest_id.slice(4) + '_' + uuidv4().split('-')[3];
    new ContestModel().orderSpot(
      {
        ...req.params,
        order_id: 'ordr_' + uuidv4().split('-')[4],
        coupen: coupen,
        order_status: "oncart",
        quantity: 1,
      },
      (err, results) => {
        if (err) res.status(202).send("ERR : " + err);
        else res.status(200).send(results);
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
        if (err) res.status(202).send("ERR" + err);
        else res.status(200).send({ message: 'Quantity succesfully updated', data: results });
      }
    );
  },

  goToPayment: (req, res) => {
    var order_id = req.params.order_id;
    var contest_id = req.params.contest_id;
    // var current_spots = req.params.spots;

    // console.log("now", req.params);
    new ContestModel().updateSpot(
      { order_id, order_status: "complete" },
      (err, results) => {
        if (err) res.status(202).send("ERR" + err);
        // else res.status(200).send(results);
        // else console.log('spot status updated');
      }
    )
    new ContestModel().updateContestSpot(
      { contest_id },
      (err, results) => {
        if (err) res.status(202).send("ERR" + err);
        else res.status(200).send(results);
      }
    );
  },

  getAllCoupons: (req, res) => {
    var contest_id = req.params.contest_id;
    new ContestModel().getAllCoupons(
      { contest_id },
      (err, results) => {
        if (err) res.status(202).send("ERR" + err);
        else res.status(200).send(results);
      }
    );
  },

  setWinner: (req, res) => {
    var winner_body = req.body;
    // winner , winnerCoupen, contest_id
    new ContestModel().setWinner(
      { ...winner_body, winner: 'select name'},
      (err, results) => {
        if (err) res.status(202).send("ERR" + err);
        else res.status(200).send(results);
      }
    );
  },

  getHistory: (req, res) => {
    new ContestModel().getHistory(
      (err, results) => {
        if (err) res.status(202).send("ERR" + err);
        else res.status(200).send(results);
      }
    );
  }


}
module.exports = ContestController;
