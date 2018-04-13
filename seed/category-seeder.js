var Category = require('../models/category');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var Categories = [
    new Category({
        imagePath: 'https://thumbnail.zype.com/580f65b59958b70e2400580d/5aa49333e3cac81235008a24/5aa49333e3cac81235008a25/545bd6ca69702d05b9010000/00013.png',
        title: 'Machinery',
        description: '!!!Get All the Machinery Stuff Here!!!'
    }),
    new Category({
        imagePath: 'https://i.pinimg.com/originals/f2/f5/e8/f2f5e8285a7e1ed7a2919a3b59d50b3b.jpg',
        title: 'Electronics',
        description: '!!!Electronics items at Great deal!!!'
    }),
    new Category({
        imagePath: 'https://31jro324wf5d1tybq7r3p4zq-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Automobile-Electronics-1024x573.jpg',
        title: 'Automobile',
        description: '!!!All for your Vehicle!!!'
    }),
    new Category({
        imagePath: 'http://ryan-doherty.com/wp-content/uploads/2017/09/apartment-living-room-d%C3%A9cor-pinterest.jpg',
        title: 'Home Decor',
        description: '!!!Furnitures and Decorative stuff!!!'
    }),
    new Category({
        imagePath: 'http://www.starnewsblog.com/wp-content/uploads/2018/02/Gifts.jpg',
        title: 'Gifts',
        description: '!!!Surprise for your loved ones!!!'
    }),
    new Category({
        imagePath: 'https://kryptomoney.com/wp-content/uploads/2017/05/Fashion-Model.jpg',
        title: 'Fashion',
        description: '!!! Wear Style you like !!!'
    })
];

var done = 0;
for (var i = 0; i < Categories.length; i++) {
    Categories[i].save(function(err, result) {
        done++;
        if (done === Categories.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}