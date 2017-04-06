/**
 * Module Dependencies
 */
const config      = require('./config'),
    restify       = require('restify'),
    bunyan        = require('bunyan'),
    winston       = require('winston'),
    bunyanWinston = require('bunyan-winston-adapter'),
    mongoose      = require('mongoose');

/**
 * Logging
 */
global.log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            timestamp: () => {
                return new Date().toString()
            },
            json: true
        }),
    ]
});

/**
 * Initialize Server
 */
global.server = restify.createServer({
    //name    : config.name,
    //version : config.version,
    log     : bunyanWinston.createAdapter(log),
});

/**
 * Middleware
 */
server.use(restify.jsonBodyParser({ mapParams: true }));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({ mapParams: true }));
server.use(restify.fullResponse());

/**
 * Error Handling
 */
server.on('uncaughtException', (req, res, route, err) => {
    log.error(err.stack);
    res.send(err)
});

/**
 * Lift Server, Connect to DB & Bind Routes
 */
server.listen(config.port, function() {

    mongoose.connection.on('error', function(err) {
        log.error('Mongoose default connection error: ' + err);
        process.exit(1)
    });

    mongoose.connection.on('open', function(err) {

        if (err) {
            log.error('Mongoose default connection error: ' + err);
            process.exit(1)
        }

        log.info(
            '%s v%s ready to accept connections on port %s in %s environment.',
            //server.name,
            config.db.development,
            config.port
        );
        console.log("my port = " + config.port);

        require('./app/routes')

    });

    global.db = mongoose.connect(config.db.development)

});


// BASE SETUP
// =============================================================================

// call the packages we need
// var express    = require('express');        // call express
// var app        = express();                 // define our app using express
// var bodyParser = require('body-parser');
//
// // HAL support
// var halson = require('halson');
//
// // configure app to use bodyParser()
// // this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
// // set our port, defaulting if nothing is specified in the env
// var port = process.env.PORT || 8080;
//
// // load app configurations from config.js
// var config = require('./config');
//
// // configure our connection to MongoDB
// var mongoose = require('mongoose');
//
// // establish our MongoDB connection for the models
// mongoose.connect(config.db[app.settings.env]);
//
// // import models
// var ProductQuantity = require('./app/models/product_quantity');
//
// // get an instance of the express Router, allowing us to add
// // middleware and register our API routes as needed
// var router = express.Router();
//
// // create/update a productQuantity
// router.put('/product_quantities/:product_id', function(req, res) {
//
//     if (req.body.quantity_onhand == null) {
//         res.status(400);
//         res.setHeader('Content-Type', 'application/vnd.error+json');
//         res.json({ message: "quantity_onhand parameter is required"});
//     }  else
//     {
//
//         ProductQuantity.findOne({ product_id: req.params.product_id}, function(err, productQuantity) {
//             if (err) return console.error(err);
//
//             var created = false; // track create vs. update
//             if (productQuantity == null) {
//                 productQuantity = new ProductQuantity();
//                 productQuantity.product_id = req.params.product_id;
//                 created = true;
//             }
//
//             // set/update the onhand quantity and save
//             productQuantity.quantity_onhand = req.body.quantity_onhand;
//             productQuantity.save(function(err) {
//                 if (err) {
//                     res.status(500);
//                     res.setHeader('Content-Type', 'application/vnd.error+json');
//                     res.json({ message: "Failed to save productQuantity"});
//                 } else {
//                     // return the appropriate response code, based
//                     // on whether we created or updated a ProductQuantity
//                     if (created) {
//                         res.status(201);
//                     } else {
//                         res.status(200);
//                     }
//
//                     res.setHeader('Content-Type', 'application/hal+json');
//
//                     var resource = halson({
//                         product_id: productQuantity.product_id,
//                         quantity_onhand: productQuantity.quantity_onhand,
//                         created_at: productQuantity.created_at
//                     }).addLink('self', '/product_quantities/'+productQuantity.product_id)
//
//                     res.send(JSON.stringify(resource));
//                 }
//             });
//         });
//     }
// });
//
// router.get('/product_quantities/:product_id', function(req, res) {
//     ProductQuantity.findOne({product_id: req.params.product_id}, function(err, productQuantity) {
//         if (err) {
//             res.status(500);
//             res.setHeader('Content-Type', 'application/vnd.error+json');
//             res.json({ message: "Failed to fetch ProductQuantities"});
//         } else if (productQuantity == null) {
//             res.status(404);
//             res.setHeader('Content-Type', 'application/vnd.error+json');
//             res.json({ message: "ProductQuantity not found for product_id "+req.params.product_id});
//         } else {
//             res.status(200);
//             res.setHeader('Content-Type', 'application/hal+json');
//
//             var resource = halson({
//                 product_id: productQuantity.product_id,
//                 quantity_onhand: productQuantity.quantity_onhand,
//                 created_at: productQuantity.created_at
//             }).addLink('self', '/product_quantities/'+productQuantity.product_id)
//             res.send(JSON.stringify(resource));
//
//         }
//     });
// });
//
//
// // Register our route
// app.use('/', router);
//
// // Start the server
// app.listen(port);
// console.log('Running on port ' + port);