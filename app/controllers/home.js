'use strict'

let homeController = function (server) {
    console.log('homeController listo');

    server.route('/')

        .get(function(req, res){
            res.render('home/index');
        });
};

module.exports = homeController;