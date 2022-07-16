const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const ProductModel = require("../../models/data/ProductModel");
var upload = require("../../utils/file_uploader");

// route dir
const table = "products";

const ProductController = {
  getProduct: (req, res) => {
    // const table = req.params.table
    const field = req.params.field;
    const value = req.params.value;
    new ProductModel().getOne(table, field, value, (err, results) => {
      if (err) res.send("ERR");
      else res.send(results);
    });
  },
  getProducts: (req, res) => {
    // const table = req.params.table
    const sort_field = req.params.field;
    new ProductModel().getAll(table, sort_field, (err, results) => {
      if (err) res.send("ERR");
      else res.send(results);
    });
  },
  createProduct: (req, res) => {
    var path  = "public/images/products"
    upload(path)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

    // const table = req.params.table
    const fields = req.body;
    console.log("====", fields);
      var fields_ = {...fields, pr_id: 'pr_'+uuidv4().split('-')[4] ,pr_thumbnails: req.file.filename};
      new ProductModel().addData(table, fields_, (err, results) => {
        if (err) res.send("ERR");
        else {
        res.send("Product Added Successfully");
        // res.redirect('product/addProdcuts_page')
        }
      });
      console.log("SUCCESS", req.file);
      // return res.status(200).send(req.file);
    });
  },
  updateProduct: (req, res) => {
    // const table = req.params.table
    const fields = req.body;
    new ProductModel().updateData(table, fields, (err, results) => {
      if (err) res.send("ERR");
      else res.send(results);
    });
  },
  deleteProduct: (req, res) => {
    // const table = req.params.table
    const _id = req.body.id;
    new ProductModel().delete(table, 'pr_id', _id, (err, results) => {
      if (err) res.send("ERR");
      else res.send(results);
    });
  },
  test: (req, res) => {
  console.log("fuckin", req.file);
  }
};

module.exports = ProductController;
