'use strict'

var util = require('util');
var http = require('http');
var url = require('url');
var qs = require('querystring');
var os = require('os')
var port = process.env.PORT || process.env.port || process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var nodeEnv = process.env.NODE_ENV || 'unknown';
var version = require('./package.json').version || 'unknown';
var startedByNpm = !!process.env.npm_package_version;

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/my-app';

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
    config.db.mongo.url = connection_string;
}

var server = http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);

    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var formattedBody = qs.parse(body);

        res.writeHead(200, {'Content-Type': 'text/plain'});

        res.write('This is a node.js echo service v' + version + '\n');
        res.write('Host: ' + req.headers.host + '\n');
        res.write('\n');
        res.write('node.js Production Mode: ' + (nodeEnv == 'production' ? 'yes' : 'no') + '\n');
        res.write('node.js ' + process.version + '\n');
        res.write('Executed by npm: ' + (startedByNpm ? 'yes' : 'no') + '\n');
        res.write('\n');
        res.write('HTTP/' + req.httpVersion +'\n');
        res.write('Request headers:\n');
        res.write(util.inspect(req.headers, null) + '\n');
        res.write('Request query:\n');
        res.write(util.inspect(url_parts.query, null) + '\n');
        res.write('Request body:\n');
        res.write(util.inspect(formattedBody, null) + '\n');
        res.write('\n');
        res.write('Host: ' + os.hostname() + '\n');
        res.write('OS Type: ' + os.type() + '\n');
        res.write('OS Platform: ' + os.platform() + '\n');
        res.write('OS Arch: ' + os.arch() + '\n');
        res.write('OS Release: ' + os.release() + '\n');
        res.write('OS Uptime: ' + os.uptime() + '\n');
        res.write('OS Free memory: ' + os.freemem() / 1024 / 1024 + 'mb\n');
        res.write('OS Total memory: ' + os.totalmem() / 1024 / 1024 + 'mb\n');
        res.write('OS CPU count: ' + os.cpus().length + '\n');
        res.write('OS CPU model: ' + os.cpus()[0].model + '\n');
        res.write('OS CPU speed: ' + os.cpus()[0].speed + 'mhz\n');
        res.end('\n');

    });
});
console.log('Initializing Server on ' + ip + ':' + port);
server.listen(port,ip, function(){
    var address = server.address();
    console.log('Server running on ' + address.address + ':' + address.port);
});


/**
 * Module Dependencies
 */
// const config        = require('./config'),
//     restify       = require('restify'),
//     bunyan        = require('bunyan'),
//     winston       = require('winston'),
//     bunyanWinston = require('bunyan-winston-adapter'),
//     mongoose      = require('mongoose')

/**
 * Logging
 */
// global.log = new winston.Logger({
//     transports: [
//         new winston.transports.Console({
//             level: 'info',
//             timestamp: () => {
//                 return new Date().toString()
//             },
//             json: true
//         }),
//     ]
// })

/**
 * Initialize Server
 */
// global.server = restify.createServer({
//     name    : config.name,
//     version : config.version,
//     log     : bunyanWinston.createAdapter(log),
// })

/**
 * Middleware
 */
// server.use(restify.jsonBodyParser({ mapParams: true }))
// server.use(restify.acceptParser(server.acceptable))
// server.use(restify.queryParser({ mapParams: true }))
// server.use(restify.fullResponse())

/**
 * Error Handling
 */
//server.on('uncaughtException', (req, res, route, err) => {
//     log.error(err.stack)
//     res.send(err)
// });

/**
 * Lift Server, Connect to DB & Bind Routes
 */
// server.listen(config.port, function() {
//
//     mongoose.connection.on('error', function(err) {
//         log.error('Mongoose default connection error: ' + err)
//         process.exit(1)
//     })
//
//     mongoose.connection.on('open', function(err) {
//
//         if (err) {
//             log.error('Mongoose default connection error: ' + err)
//             process.exit(1)
//         }
//
//         log.info(
//             '%s v%s ready to accept connections on port %s in %s environment.',
//             server.name,
//             config.version,
//             config.port,
//             config.env
//         )
//
//         require('./routes')
//
//     })
//
//     global.db = mongoose.connect(config.db.uri)
//
// })