// app/models/product_quantity.js

// var mongoose     = require('mongoose');
// var Schema       = mongoose.Schema;
//
// var ProductQuantitySchema   = new Schema({
//         product_id: String,
//         quantity_onhand: Number
//     },
//     {
//         timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
//     });
//
// module.exports = mongoose.model('ProductQuantity', ProductQuantitySchema);

'use strict';

const mongoose = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

mongoose.Promise = global.Promise;


const TodoSchema = new mongoose.Schema({
    task: String,
    status: String
    // status: {
    //     type: String,
    //     required: true,
    //     enum: ['pending', 'complete', 'overdue']
    // },
});// { minimize: false });

TodoSchema.plugin(mongooseApiQuery);
TodoSchema.plugin(createdModified, { index: true });

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;