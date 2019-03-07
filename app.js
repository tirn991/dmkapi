'use strict';
const defaultRoutingPath = "/api";
var path = require('path');
var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var express = require('express');
var bodyparser = require('body-parser');
var app = require('express')();
var subpath = require('express')();
var mongoose = require('mongoose');
module.exports = app;
var routingPath = process.env.ROUTING_PATH || defaultRoutingPath
var config = {
    appRoot: __dirname
};
SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }
    app.use(routingPath, subpath);
    app.use(bodyparser.json({ limit: '10mb' }))
    app.use("/uploads", express.static(__dirname + '/uploads/images'));
    app.get('/', (req, res) => {
        res.redirect(path.join(routingPath, 'docs'));
    })
    swaggerExpress.runner.swagger.basePath = routingPath;
    subpath.use(swaggerExpress.runner.swaggerTools.swaggerUi());
    swaggerExpress.register(app);
    // mongoose.connect('mongodb://127.0.0.1:27017/churchinfo-db');
    mongoose.connect('mongodb://tirn:0764707880tirn@ds155903.mlab.com:55903/dmk');
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', console.error.bind(console, 'Connection error'));
    mongoose.connection.once('open', function() {
        var port = process.env.PORT || 10120;
        app.listen(port, function() {
            console.log('App is Listening on port:' + port);
        });
    });
});