const express = require('express')
const router = express.Router()
const ProductController = require('../../controllers/data/ProductController')



router.get('/getProduct/:field/:value', ProductController.getProduct)
router.get('/getProducts/:field', ProductController.getProducts)
router.post('/createProduct',  ProductController.createProduct)
router.post('/updateProduct', ProductController.updateProduct)
router.delete('/deleteProduct', ProductController.deleteProduct)




  // define the home page route
router.get('/test', (req, res) => {
    res.send('Birds home page')
  })


module.exports = router;


