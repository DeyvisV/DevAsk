'use strict'

let userController = function (server){
    
    server.route('/logout')

        .get(function (req, res){
            req.logout();
            res.redirect('/');
        });
}

module.exports = userController;