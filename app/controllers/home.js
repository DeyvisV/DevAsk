'use strict'

let homeController = function (server) {
    console.log('homeController listo');

    server.route('/')

        .get(function (req, res){
            //console.log(req.user);
            if (req.user) {
                let name, url_foto;
                if (req.user.provider == 'facebook') {
                    name = req.user._json.first_name;
                    url_foto = 'http://graph.facebook.com/'+req.user.id+'/picture';
                }
                if (req.user.provider == 'twitter') {
                    name = req.user.username;
                    url_foto = req.user.photos[0].value;
                }
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