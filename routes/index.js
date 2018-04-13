var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var Cart = require('../models/cart');
var Category = require('../models/category');
var Product = require('../models/product');
var Machinery = require('../models/machinery');

var Order = require('../models/order');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));


router.get("/home",function(req,res){
   res.render("startup.ejs");


});


/* GET home page. */
router.get('/', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Category.find(function (err, docs) {
        var categoryChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            categoryChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Shopping Cart', category: categoryChunks, successMsg: successMsg, noMessages: !successMsg});
    });
});
///=======================search bar==============

router.post('/search', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Machinery.find({ title: req.body.search}, function (err, docs) {
        var machineryChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            machineryChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/Machinery', {title: 'Searched item', machinery: machineryChunks, successMsg: successMsg, noMessages: !successMsg});
    });
});

// ===========Newly added for products route(Machinery)==========
router.get('/products/:id', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Machinery.find(function (err, docs) {
        var machineryChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            machineryChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/Machinery', {title: 'Machinery Products', machinery: machineryChunks, successMsg: successMsg, noMessages: !successMsg});
    });
});
//==================================================

router.get('/add-to-cart/:id', function(req, res, next) {
    var machineId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Machinery.findById(machineId, function(err, machine) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(machine, machine.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/products/Machinery');
    });
});

//==================================================
/*router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});*/

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   } 
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    
    var stripe = require("stripe")(
        "sk_test_fwmVPdJfpkmwlQRedXec5IxR"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    }); 
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
