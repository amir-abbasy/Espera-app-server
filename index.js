const express = require('express')
const cors = require('cors')
const multer = require("multer");
const pool = require('./models/config')
const app = express()

const ContestModel = require('./models/data/ContestModel')
const ProductModel = require('./models/data/ProductModel')
const UserModel = require('./models/data/UserModel')
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
app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');


/**
 * @routers
 */
app.post("/uploads", function (req, res) {
  console.log("uploads", req.file);
  upload(req, res, function (err) {
    console.log("===>", req.file);
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log("SUCCESS");
    return res.status(200).send(req.file);
  });
});

app.post('/test', function (req, res) {
  console.log("Works");
  console.log("-", req.body);
})

// index page
app.get('/', function (req, res) {
  new ContestModel().getActiveWithProducts((err, results) => {
    if (err) res.send("ERR : " + err)

    new ContestModel().getSoldoutWithProducts((err_soldout, soldoutResults) => {
      if (err) res.send("ERR SOLD OUT : " + err_soldout)
      // else res.send(results)
      // else console.log(results)

      // console.log('results', results);
      var final_results = results.map((_, k) => {
        var width_percent = (_.con_spots * 100 / _.con_total_spots)
        var color = () => {
          color = '#096'
          if (width_percent > 80) {
            color = 'red'
          } else if (width_percent > 60) {
            color = 'orange'
          }
          return color
        }
        var obj = { ..._, width: width_percent.toFixed(), width_percent, color: color() }
        return obj;
      })
      res.render('home', {
        contests: final_results,
        soldouts: soldoutResults
      })
    })

  })
});


// Render Views
app.get('/registerUser', (req, res) => {
  res.render('registerUser')
})
app.get('/createContest/:product_id', (req, res) => {
  // console.log("req params", req.params.product_id);
  res.render('createContest', { product_id: req.params.product_id })
})
app.get('/addProdcuts_page', (req, res) => {
  res.render('addProdcuts_page')
})

app.get('/cart/:contest_id', (req, res) => {
  new ContestModel().getOneWithProduct('contests.con_id', req.params.contest_id, (err, results) => {
    if (err) res.send("ERR : " + err)
    else res.render('details', {
      contest_details: results[0]
    })
    console.log("req params", req.params.contest_id, "---", results);
  })
})

app.get('/products_page', (req, res) => {
  new ProductModel().getAll('products', 'id', (err, results) => {
    if (err) res.send("ERR : " + err)
    else res.render('products_page', {
      products: results
    })
  })
})

app.get('/login_page', (req, res) => {
  res.render('login_page')
})

app.get('/myCart/:user', (req, res) => {
  new ContestModel().getOrders({ user_id: req.params.user, status: 'oncart' }, (err, results) => {
    // console.log("results", results);
    if (err) res.send("ERR : " + err)
    else res.render('myCart', {
      carts: results
    })
  })
})

app.get('/myCoupens/:user', (req, res) => {
  new ContestModel().getOrders('orders_spots', 'user_id', req.params.user, 'order_status', 'shipped', 'id', (err, results) => {
    if (err) res.send("ERR : " + err)
    else res.render('myCoupens', {
      carts: results
    })
  })
})


app.get('/profile/:user', (req, res) => {
  new UserModel().getOne('users', 'user_id', 'usr_admin', (err, results) => {

    new UserModel().getMyCoupens({user_id: results[0]['user_id']},(err_, coupen_result) => {
      if (err_) res.send("ERR : " + err_)
      // else res.render('profile', {
      //   user: results[0]
      // })
      
      // console.log("myCoupens", coupen_result);
      if (err) res.send("ERR : " + err)
      else res.render('profile', {
        user: results[0],
        myCoupens: coupen_result
      })
    
    })
  })


})

app.get('/print/:con_id', (req, res) => {
  new ContestModel().getAllCoupons({ contest_id: req.params.con_id }, (err, results) => {
    // console.log("results", results);
    if (err) res.send("ERR : " + err)
    else res.render('print', {
      contest_coupons: results,
      contestTitle: req.params.con_id
    })
  })
})

app.get('/history', (req, res) => {
  new ContestModel().getHistory((err, results) => {
    if (err) res.send("ERR : " + err)
    else res.render('history', {
      history: results
    })
  })
})


app.get('/newReferrals', (req, res) => {
  new UserModel().getNewReferrals((err, results) => {
    if (err) res.send("ERR : " + err)
    else res.render('newReferrals', {
      referrals: results
    })
  })
})





app.use('/data', require('./routers/data/dataRouter'))
app.use('/user', require('./routers/data/userRouter'))
app.use('/contest', require('./routers/data/contestRouter'))
app.use('/product', require('./routers/data/productRouter'))



app.get('/*', (req, res) => {
res.send("page not fond - 404")
})
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`running at http://localhost:${port} `))


