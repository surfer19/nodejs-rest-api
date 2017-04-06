'use strict';

const mongoose = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

mongoose.Promise = global.Promise;


const TodoSchema = new mongoose.Schema({
    task: String,
    status: String
});

TodoSchema.plugin(mongooseApiQuery);
TodoSchema.plugin(createdModified, { index: true });

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;