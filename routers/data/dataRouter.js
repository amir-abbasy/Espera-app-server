const express = require('express');
const multer = require('multer');
const router = express.Router()
const DataController = require('../../controllers/data/DataController')
const upload = require("../../utils/file_uploader");


router.get('/getOne/:table/:field/:value', DataController.getOne)
router.post('/addUser/:table', DataController.addUser)
router.post('/updateUser/:table', DataController.updateUser)
router.delete('/deleteData/:table', DataController.deleteData)
router.post('/test', DataController.test)

router.get('/getEndingSpots', DataController.getEndingSpots)
router.get('/getCovers', DataController.getCovers)



router.get('/upload/:pathName', (req, res) =>{
  var path = req.params.pathName
  var path  = "public/images/"+path
  console.log(path);
  upload(path)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    else {
    res.send("file uploaded Successfully");
    }
  })
})



  // define the home page route
router.get('/test', (req, res) => {
    res.send('Birds home page')
  })


module.exports = router;


