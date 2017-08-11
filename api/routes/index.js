'use strict';

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
 * UPDATE
 */
server.put('/todos/:todo_id', function(req, res, next) {

    let data = req.body || {};
    let todo = new Todo(JSON.parse(data));

    Todo.findOne({ _id: req.params.todo_id }, function(err, doc) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
        }

        Todo.update({ _id: todo._id }, todo, function(err) {


            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }
            else {
                console.log("update sucessful \n");
            }

            res.send(200, todo)
            next()

        })

    })
})
/* 
 *  Delete record
 *
 */

 server.del('/todos/:todo_id', function(req,res){
    Todo.remove({_id: req.body._id}, function(err){
        if (err) {
            log.error(err);
            res.send(404, req.body)
            return next(new errors.InternalError(err.message));
            // TODO ReferenceError: next is not defined
            next();
        }
        else {
            console.log("delete sucessful \n \n");
            res.send(200, req.body)
            // TODO ReferenceError: next is not defined
            next()
        }
    })
 })
