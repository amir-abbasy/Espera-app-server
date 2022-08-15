const { v4: uuidv4 } = require("uuid");
const UserModel = require("../../models/data/UserModel");
const mailer = require("../../utils/mailer");

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
    const body = req.body;
    new UserModel().addToWishList(body, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send("Contest added to wishlist successfully");
    });
  },

  removeFromWishList: (req, res) => {
    const itemId = req.body.item_id;
    new UserModel().delete("wishlists", "id", itemId, (err, results) => {
      if (err) res.send("ERR" + err);
      else res.send("Contest removed from your wishlist");
    });
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
      var rslt = Object.values(result[0])
      if (err) res.send({ status: false, error: err });
      else res.send({ status: true, isUserExists:  rslt[0] == 1 ? true : false});
    });
  },
  resetPassword:(req, res)=>{
    var newPassword =  uuidv4().split("-")[4]
    var mailOptions = {
      from: 'amirabbasyk@gmail.com',
      to: req.body.email,
      subject: 'Espera account New password ',
      text: 'Your new password is: '+ newPassword
    };

    mailer(mailOptions,(msg)=>{
      new UserModel().updatePassword({user_id: req.body.user_id, new_password: newPassword}, (err, result) => {
        if (err) res.send({ status: false, error: err });
        else res.send({ status: true, message: "Password reseted successfully, check your email. "+msg});
      });
    })
  },
};

module.exports = UserController;
