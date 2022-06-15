const express = require('express')
const router = express.Router()
const DataController = require('../../controllers/data/DataController')



router.get('/getOne/:table/:field/:value', DataController.getOne)
router.post('/addUser/:table', DataController.addUser)
router.post('/updateUser/:table', DataController.updateUser)
router.delete('/deleteData/:table', DataController.deleteData)
router.post('/test', DataController.test)

router.get('/getEndingSpots', DataController.getEndingSpots)
router.get('/getCovers', DataController.getCovers)






  // define the home page route
router.get('/test', (req, res) => {
    res.send('Birds home page')
  })


module.exports = router;


