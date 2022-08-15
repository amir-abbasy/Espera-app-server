const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/data/UserController')



router.get('/getUser/:field/:value', UserController.getOne)
router.get('/getUsers/:field', UserController.getUsers)
router.post('/addUser', UserController.addUser)
router.post('/updateUser', UserController.updateUser)
router.delete('/deleteUser', UserController.deleteUser)

router.post('/login', UserController.login)
router.get('/getStaff/:user_id', UserController.getStaff)
router.get('/getMyAddress/:user_id', UserController.getMyAddress)
router.post('/updateMyAddress', UserController.updateMyAddress)
router.post('/addToRefferal', UserController.addToRefferal)

router.get('/getWishLists/:user_id', UserController.getWishLists)
router.post('/addToWishList', UserController.addToWishList)
router.delete('/removeFromWishList', UserController.removeFromWishList)

router.post('/updateLevel', UserController.updateLevel)
router.get('/isUserExists/:name', UserController.isUserExists)

router.post('/resetPassword', UserController.resetPassword)






  // define the home page route
router.get('/test', (req, res) => {
    res.send('Birds home page')
  })


module.exports = router;


