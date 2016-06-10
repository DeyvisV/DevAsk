'use strict'

let homeController = function (server) {
    console.log('homeController listo');

    server.route('/')

        .get(function(req, res){
            //console.log(req.user);
            if (req.user) {
                let name = req.user._json.first_name;
                let url_foto = 'http://graph.facebook.com/'+req.user.id+'/picture';
                res.render('home/index', {
                    name: name,
                    url_foto: url_foto
                });
            }
            else {
                res.render('home/index');
            }
        });
};

module.exports = homeController;