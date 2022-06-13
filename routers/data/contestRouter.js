const express = require('express')
const router = express.Router()
const ContestController = require('../../controllers/data/ContestController')



router.get('/getContest/:field/:value', ContestController.getContest)
router.get('/getContests/:field', ContestController.getContests)
router.post('/createContest', ContestController.createContest)
router.post('/updateContest', ContestController.updateContest)
router.delete('/deleteContest', ContestController.deleteContest)

router.get('/getContestsActive', ContestController.getAativeWithProducts)
router.get('/getContestsSoldout', ContestController.getSolduutWithProducts)
router.get('/getOneWithProduct/:contest_id', ContestController.getOneWithProduct)
router.get('/getAllCoupons/:contest_id', ContestController.getAllCoupons)

router.get('/orderSpot/:user_id/:contest_id/:product_id', ContestController.orderSpot)
// router.get('/getMyOrders/:user_id/:type', ContestController.getMyOrders)
router.get('/getMyOrders/:user_id/:status', ContestController.getMyOrders)
router.post('/updateQuantity/:order_id', ContestController.updateQuantity)

router.post('/goToPayment/:order_id/:contest_id', ContestController.goToPayment)

router.post('/setWinner', ContestController.setWinner)
router.get('/getHistory', ContestController.getHistory)





// define the home page route
router.get('/test', (req, res) => {
  res.send('Birds home page')
})


module.exports = router;


