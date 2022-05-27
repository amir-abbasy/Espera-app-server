const express = require('express')
const cors = require('cors')
const multer = require("multer");
const pool  = require('./models/config')
const app = express()

const ContestModel  = require('./models/data/ContestModel')
const ProductModel  = require('./models/data/ProductModel')
var upload = require('./utils/file_uploader')

const { v4: uuidv4 } = require('uuid');
// console.log("=======coupen=========", uuidv4().split('-')[4]);

/**
 * @middleware
 */

//url encode + json encode
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use( express.static( "public" ) );

// set the view engine to ejs
app.set('view engine', 'ejs');


/**
 * @routers
 */
 app.post("/uploads", function (req, res) {
   console.log("uploads", req.file);
   upload(req, res, function (err) {
    console.log("===>",req.file);
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log("SUCCESS");
    return res.status(200).send(req.file);
  });
});

app.post('/test', function(req, res) {
  console.log("Works");
  console.log("-", req.body);
})

// index page
app.get('/', function(req, res) {
  new ContestModel().getAllWithProducts((err, results)=>{
    if(err) res.send("ERR : "+err)
    // else res.send(results)
    // else console.log(results)

    // var mascots = [
    //   { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    //   { name: 'Tux', organization: "Linux", birth_year: 1996},
    //   { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    // ];
console.log('results', results);
    res.render('home', {
      // mascots: mascots,
      contests: results
    })
  })
});


// Render Views
  app.get('/registerUser', (req, res)=>{
    res.render('registerUser')
  })
  app.get('/createContest/:product_id', (req, res)=>{
    // console.log("req params", req.params.product_id);
    res.render('createContest', {product_id: req.params.product_id})
  })
  app.get('/addProdcuts_page', (req, res)=>{
    res.render('addProdcuts_page')
  })

  app.get('/cart/:contest_id', (req, res)=>{
    new ContestModel().getOneWithProduct('contests.con_id', req.params.contest_id, (err, results)=>{
      if(err) res.send("ERR : "+err)
      else res.render('details', {
        contest_details: results[0]
      })
      console.log("req params", req.params.contest_id, "---", results);
    })
  })
  
  app.get('/products_page', (req, res)=>{
    new ProductModel().getAll('products', 'id', (err, results)=>{
      if(err) res.send("ERR : "+err)
      else res.render('products_page', {
        products: results
      })
    })
  })
  
  app.get('/login_page', (req, res)=>{
    res.render('login_page')
  })
  
  app.get('/myCart/:user', (req, res)=>{
      new ContestModel().getOrders(req.params.user, (err, results)=>{
        console.log("results", results);
      if(err) res.send("ERR : "+err)
      else res.render('myCart', {
        carts: results
      })
    })
  })
  
  app.get('/myCoupens/:user', (req, res)=>{
      new ContestModel().getOrders('orders_spots', 'user_id', req.params.user, 'order_status', 'shipped', 'id', (err, results)=>{
      if(err) res.send("ERR : "+err)
      else res.render('myCoupens', {
        carts: results
      })
    })
  })
  
  app.use('/data', require('./routers/data/dataRouter'))
  app.use('/user', require('./routers/data/userRouter'))
  app.use('/contest', require('./routers/data/contestRouter'))
  app.use('/product', require('./routers/data/productRouter'))


const port = process.env.PORT || 4000
app.listen(port, () => console.log(`running at http://localhost:${port} `))


