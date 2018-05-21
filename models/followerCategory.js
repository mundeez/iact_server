var mongoose = require('mongoose');

var followerCategoryModel = new mongoose.Schema({
    follower_category_name: {
        type: String,
        enum: ['National Follower', 'Provincial Follower', 'District Follower', 'Zonal Follower'],
        unique: true,
        required: true
    },
    follower_category_code: {
        type: String,
        enum: ['NF', 'PF', 'DF', 'ZF'],
        unique: true,
        required: true
    }
});

followerCategoryModel.statics.bulkInsert = function (models, fn) {
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
}

module.exports = mongoose.model('FollowerCategory', followerCategoryModel);