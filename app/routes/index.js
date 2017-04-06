'use strict';

/*

 POST /todos (Creates a ttodo item)
 GET /todos (Lists all todos in the queue)
 GET /todos/:todo_id (Gets a specific ttodo item in the queue)
 PUT /todos/:todo_id (Updates a specific ttodo item in the queue)
 DELETE /todos/:todo_id (Destroys a specific ttodo item in the queue)

 */

/**
 * Module Dependencies
 */
const _      = require('lodash'),
    errors = require('restify-errors');

/**
 * Model Schema
 */
const Todo = require('../models/todo');

/**
 * POST
 */
server.post('/todos', function(req, res, next) {

    let data = req.body || {};
    let todo = new Todo(JSON.parse(data));


    todo.save(function(err) {

        if (err) {
            log.error(err);
            return next(new errors.InternalError(err.message));
            next();
        }
        else {
            console.log("v pohode \n");
        }

        res.send(201);
        next()
    })
});


/**
 * LIST
 */
server.get("/todos", function (req, res, next) {
    Todo.find(function (err, todo_list) {
        if (err) {
            log.error(err);
            return next(new errors.InvalidContentError(err.errors.name.message))
        }
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(todo_list));
    });
    return next();
});

/**
 * GET
 */
server.get('/todos/:todo_id', function(req, res, next) {

    Todo.findOne({ _id: req.params.todo_id }, function(err, doc) {

        if (err) {
            log.error(err);
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc);
        next()

    })

});

/**
 *  PUT
 */
server.put('/todos/:todo_id' ,function (req, res, next) {

    let data = req.body || {};

    if (!data._id){
        _.extend(data, {
            _id: req.params.todo_id
        })
    }

    Todo.findOne({ _id: req.params.todo_id }, function (err, doc) {

        if (err) {
            log.error(err);
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
        }

        res.send(204, doc);
        next()
    })

});
