var mongoose = require('mongoose');

var userCategoryModel = new mongoose.Schema({
    category_name: {
        type: String,
        enum: ['Super Administrator', 'Administrator', 'Coordinator', 'Follower'],
        unique: true,
        required: true
    },
    category_code: {
        type: String,
        enum: ['SUAD', 'AD', 'CO', 'FO'],
        unique: true,
        required: true
    }
});

userCategoryModel.statics.bulkInsert = function (models, fn) {
    if (!models || !models.length)
        return fn(null);

    var bulk = this.collection.initializeOrderedBulkOp();
    if (!bulk)
        return fn('bulkInsertModels: MongoDb connection is not yet established');

    var model;
    for (var i = 0; i < models.length; i++) {
        model = models[i];
        bulk.insert(model);
    }

    bulk.execute(fn);
};

module.exports = mongoose.model('UserCategory', userCategoryModel);