var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
        imagePath: 'https://thumbnail.zype.com/580f65b59958b70e2400580d/5aa49333e3cac81235008a24/5aa49333e3cac81235008a25/545bd6ca69702d05b9010000/00013.png',
        title: 'Machinery',
        description: '!!!Get All the Machinery Stuff Here!!!',
        qty : 10,
        price: 50
    }),
    new Product({
        imagePath: 'https://i.pinimg.com/originals/f2/f5/e8/f2f5e8285a7e1ed7a2919a3b59d50b3b.jpg',
        title: 'Electronics',
        description: '!!!Electronics items at Great deal!!!',
        qty : 10,
        price: 100
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}