var Machinery = require('../models/machinery');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var machinery_products = [
    new Machinery({
        imagePath: 'http://www.toppanforms.com/items/products/baa609411903af3b1f3f8087da000c1a.jpg',
        title: 'Xerox Machine',
        description: 'Grab min(10 pieces)',
        min_qty: 10,
        qty : 10,
        price: 5000
    }),
    new Machinery({
        imagePath: 'https://sc01.alicdn.com/kf/HTB1TD75RpXXXXa7XFXXq6xXFXXXA/TIG-MIG-arc-portable-cheap-price-welding.jpg',
        title: 'Portable Welding Machine',
        description: 'Buy min(50 pieces)',
        min_qty: 50,
        qty : 10,
        price: 2000
    }),
    new Machinery({
        imagePath: 'https://sc02.alicdn.com/kf/HTB1nrhMXzQnBKNjSZSg760HGXXaA/HELI-G2-Series-electric-reach-truck-sit.png',
        title: 'Electric Reach Truck',
        description: 'Buy min(1 set)',
        min_qty: 1,
        qty : 10,
        price: 10000
    }),
    new Machinery({
        imagePath: 'https://sc01.alicdn.com/kf/HTB1G5k1ecLJ8KJjy0Fnq6AFDpXa6/Small-metal-bench-lathe-TL6133.jpg',
        title: 'Small metal bench lathe',
        description: 'Buy min(1 set)',
        min_qty: 1,
        qty : 10,
        price: 8000
    }),
    new Machinery({
        imagePath: 'https://sc01.alicdn.com/kf/HTB1cGOOXMsSMeJjSspcq6xjFXXar/32inch-width-Best-mini-hand-tractor-cultivator.jpg',
        title: 'Mini hand tractor',
        description: 'Buy min(20 pieces)',
        min_qty: 20,
        qty : 10,
        price: 500
    }),
    new Machinery({
        imagePath: 'https://sc02.alicdn.com/kf/HTB1GZjpXFGWBuNjy0Fbq6z4sXXan/China-professional-machinery-high-safety-track-skid.jpg',
        title: 'Mini Loader',
        description: 'Buy min(1 unit)',
        min_qty: 1,
        qty : 10,
        price: 15000
    })
];

var done = 0;
for (var i = 0; i < machinery_products.length; i++) {
    machinery_products[i].save(function(err, result) {
        done++;
        if (done === machinery_products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}