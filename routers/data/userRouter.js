const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/data/UserController')



router.get('/getUser/:field/:value', UserController.getOne)
router.get('/getUsers/:field', UserController.getUsers)
router.post('/addUser', UserController.addUser)
router.post('/updateUser', UserController.updateUser)
router.delete('/deleteData', UserController.deleteUser)

router.post('/login', UserController.login)



  // define the home page route
router.get('/test', (req, res) => {
    res.send('Birds home page')
  })


module.exports = router;


