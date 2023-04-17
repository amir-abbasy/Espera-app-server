const express = require("express");
const multer = require("multer");
const router = express.Router();
const DataController = require("../../controllers/data/DataController");
const upload = require("../../utils/file_uploader");

router.get("/getOne/:table/:field/:value", DataController.getOne);
router.post("/addUser/:table", DataController.addUser);
router.post("/updateUser/:table", DataController.updateUser);
router.delete("/deleteData/:table", DataController.deleteData);
router.post("/test", DataController.test);

router.get("/getEndingSpots", DataController.getEndingSpots);
router.get("/getCovers", DataController.getCovers);
router.get("/getCurrencies", DataController.getCurrencies);

router.get("/upload/:pathName", (req, res) => {
  var path = req.params.pathName;
  var path = "public/images/" + path;
  console.log(path);
  upload(path)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    } else {
      res.send("file uploaded Successfully");
    }
  });
});

// define the home page route
router.get("/test", async (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "LqZBN97ar3UVwBX39B3L6AnbnVeMfqzz");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  

  var data = await fetch(
    "https://api.apilayer.com/exchangerates_data/convert?to=INR&from=USD&amount=1",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  res.send({ data });
});

module.exports = router;
