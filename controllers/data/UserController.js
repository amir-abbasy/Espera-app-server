const { v4: uuidv4 } = require("uuid");
const ContestModel = require("../../models/data/ContestModel");
const UserModel = require("../../models/data/UserModel");
const mailer = require("../../utils/mailer");
const stripe = require("stripe")(
  "sk_test_51H2711DqIVpJBt3RVyG0gp9PB5qtU4joHwdPFhySD3UbtLelO73KEwqTtOKbrUvA81p09BYHW9UEI9TP6GMp8xXr00kFybsnV9"
);

const table = "users";

const UserController = {
  getOne: (req, res) => {
    // const table = req.params.table
    const field = req.params.field;
    const value = req.params.value;
    new UserModel().getOne(table, field, value, (err, results) => {
      if (err) {
        // console.log(">", err);
        res.send("ERR" + err);
      } else res.send(results);
    });
  },
  getUsers: (req, res) => {
    // const table = req.params.table
    const sort_field = req.params.field;
    new UserModel().getAll(table, sort_field, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send(results);
    });
  },
  addUser: (req, res) => {
    // const table = req.params.table
    const fields = { ...req.body };
    delete fields["referrelUserId"];

    var user_id = "usr_" + uuidv4().split("-")[4];

    new UserModel().getStaff(
      { user_id: req.body.referrelUserId },
      (ref_err, ref_results) => {
        if (ref_results.length > 0) {
          new UserModel().addData(
            table,
            { ...fields, user_id: user_id },
            (err, results) => {
              if (err) {
                console.log(">", err);
                res.send({
                  status: false,
                  message: "adding user error",
                });
              }
              var ref = {
                ref_id: req.body.referrelUserId,
                user_id: user_id,
                ref_status: "pending",
                entry_date: new Date(),
              };
              new UserModel().addToReferral(ref, (err_, results_) => {
                if (err_) {
                  console.log(">", err_);
                  res.send({
                    status: false,
                    message: "referral adding error",
                  });
                } else
                  res.send({
                    status: true,
                    message: "User Added Successfully",
                  });
              });
            }
          );
        } else {
          res.send({ status: false, error: "No refrrel id fond" });
        }
      }
    );
  },
  updateUser: (req, res) => {
    // const table = req.params.table
    const fields = req.body;
    new UserModel().updateData(table, fields, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send(results);
    });
  },
  deleteUser: (req, res) => {
    // const table = req.params.table
    const _id = req.body.id;
    console.log("===", _id);
    new UserModel().deleteData(table, _id, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send(results);
    });
  },

  login: (req, res) => {
    new UserModel().getOne(
      table,
      "username",
      req.body.username,
      (err, results) => {
        if (err) res.send("ERR" + err);
        else {
          // console.log("====", results);
          if (results.length != 0) {
            if (results[0].user_password == req.body.user_password) {
              console.log("go now");
              res.send(results);
            } else {
              res.send("password don't match");
              console.log("password don't match");
            }
          } else {
            res.send("no user font");
            console.log("no user font");
          }
          // res.send(results)
        }
      }
    );
  },
  getMyCoupens: (req, res) => {
    // const table = req.params.table
    const user_id = req.params.user_id;
    const status = req.params.status;
    console.log("===", _id);
    new UserModel().getMyCoupens({ user_id, status }, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send(results);
    });
  },
  getMyAddress: (req, res) => {
    const user_id = req.params.user_id;
    new UserModel().getMyAddress({ user_id }, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send(results);
    });
  },
  updateMyAddress: (req, res) => {
    const user_id = req.body.user_id;
    const address = req.body.address;

    new UserModel().updateMyAddress({ user_id, address }, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send(results);
    });
  },
  getStaff: (req, res) => {
    const user_id = req.params.user_id;
    new UserModel().getStaff({ user_id }, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send(results);
    });
  },
  addToRefferal: (req, res) => {
    const body = req.body;
    new UserModel().addToReferral(body, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send(results);
    });
  },

  addToWishList: (req, res) => {
    var wishitem_id = "wish_" + uuidv4().split("-")[4];
    const body = { ...req.body, wishitem_id };
    new UserModel().addToWishList(body, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send("Contest added to wishlist successfully");
    });
  },

  removeFromWishList: (req, res) => {
    const itemId = req.body.item_id;
    new UserModel().delete(
      "wishlists",
      "wishitem_id",
      itemId,
      (err, results) => {
        if (err) res.send("ERR" + err);
        else res.send("Contest removed from your wishlist");
      }
    );
  },

  getWishLists: (req, res) => {
    const userId = req.params.user_id;
    new UserModel().getAllFromWishlist(userId, (err, results) => {
      if (err) res.send({ status: false, error: err });
      else res.send({ status: true, data: results });
    });
  },

  updateLevel: (req, res) => {
    const userId = req.body.user_id;
    const last_price = req.body.price;
    new UserModel().updateLevel(last_price, userId, (err, results) => {
      if (err) res.send({ status: false, error: err });
      else res.send({ status: true, data: { message: "User data updated" } });
    });
  },

  isUserExists: (req, res) => {
    var name = req.params.name;
    new UserModel().isUserExists(name, (err, result) => {
      var rslt = Object.values(result[0]);
      if (err) res.send({ status: false, error: err });
      else
        res.send({ status: true, isUserExists: rslt[0] == 1 ? true : false });
    });
  },
  resetPassword: (req, res) => {
    var newPassword = uuidv4().split("-")[4];
    var mailOptions = {
      from: "amirabbasyk@gmail.com",
      to: req.body.email,
      subject: "Espera account New password ",
      text: "Your new password is: " + newPassword,
    };

    mailer(mailOptions, (msg) => {
      new UserModel().updatePassword(
        { user_id: req.body.user_id, new_password: newPassword },
        (err, result) => {
          if (err) res.send({ status: false, error: err });
          else
            res.send({
              status: true,
              message:
                "Password reseted successfully, check your email. " + msg,
            });
        }
      );
    });
  },

  paymentIntent: async (req, res) => {
    // paymentIntent = await stripe.paymentIntents.create({
    //   amount: 100 * 100,
    //   currency: "inr",
    //   payment_method_types: ["card"],
    // });
    // // if (err) res.send({ status: false, error: err });
    // // else
    //   res.send({
    //     status: true,
    //     message:
    //       "paymentIntent created successfully",
    //     data: paymentIntent
    //   });

    // Create or retrieve the Stripe Customer object associated with your user.
    let customer = await stripe.customers.create(); // This example just creates a new Customer every time

    // Create an ephemeral key for the Customer; this allows the app to display saved payment methods and save new ones
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-08-01" }
    );

    // Create a PaymentIntent with the payment amount, currency, and customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: req?.body?.currency ?? "usd",
      customer: customer.id,
      description: "Buy products through e-commerce Espera App",
      shipping: {
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
    });

    // Send the object keys to the client
    res.send({
      publishableKey: process.env.publishable_key, // https://stripe.com/docs/keys#obtain-api-keys
      paymentIntent: paymentIntent.client_secret,
      customer: customer.id,
      ephemeralKey: ephemeralKey.secret,
    });
  },
  paymentIntentConfirm_____: async (req, res) => {
    var intent_id = req.body.intent_id;
    var order_ids = req.body.order_ids;
    var contest_ids = req.body.contest_ids;

    try {
      const paymentIntent = await stripe.paymentIntents.confirm(intent_id, {
        payment_method: "pm_card_visa",
      });
      console.log("paymentIntent", paymentIntent);

      // update spots
      new ContestModel().updateSpot(
        { order_ids, order_status: "complete" },
        (err, results) => {
          if (err) res.status(202).send("ERR" + err);
          // else res.status(200).send(results);
          // else console.log('spot status updated');
         }
      );

      // update spot contest
      new ContestModel().updateContestSpot({ contest_ids }, (err, results) => {
        if (err) res.status(202).send("ERR" + err);
        // else res.status(200).send({status: true,data: { message: "Order completed successfully" },});
        console.log(results);
      });


      res.status(200).send({
        data: paymentIntent,
        message: "joined on contest successfully!",
      });

      
    } catch (error) {
      res.status(202).send({ data: error.raw });
    }
  },
  paymentIntentConfirm: async (req, res) => {
    var intent_id = req.body.intent_id;
    var order_ids = req.body.order_ids;
    var contest_ids = req.body.contest_ids;
      // update spots
      new ContestModel().updateSpot(
        { order_ids, order_status: "complete" },
        (err, results) => {
          if (err) res.status(202).send("ERR" + err);
          // else res.status(200).send(results);
          // else console.log('spot status updated');
         }
      );

      // update spot contest
      new ContestModel().updateContestSpot({ contest_ids }, (err, results) => {
        if (err) res.status(202).send("ERR" + err);
        else res.status(200).send({status: true, data: { message: "Order completed successfully" }});
        console.log(results);
      });


      res.status(200).send({
        message: "joined on contest successfully!",
      });
  },
};

module.exports = UserController;
