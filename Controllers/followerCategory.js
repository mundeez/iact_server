var followerCategoryController = function(FollowerCategory){

    var post = function(req, res){
        var followerCategory = new FollowerCategory(req.body);

        if(!req.body){
            res.status(400);
            res.send('Title is required');
        }
        else {
            followerCategory.save();
            res.status(201);
            res.send(followerCategory);
        }
    }

    var get = function(req,res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        FollowerCategory.find(query, function(err,followerCategorys){

            if(err)
                res.status(500).send(err);
            else {

                var returnFollowerCategorys = [];
                followerCategorys.forEach(function(element, index, array){
                    var newFollowerCategory = element.toJSON();
                    newFollowerCategory.links= {};
                    newFollowerCategory.links.self = 'http://' + req.headers.host + '/api/followerCategorys/' + newFollowerCategory._id
                    returnFollowerCategorys.push(newFollowerCategory);
                });
                res.json(returnFollowerCategorys);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = followerCategoryController;