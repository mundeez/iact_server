var userCategoryController = function(UserCategory){

    var post = function(req, res){
        var userCategory = new UserCategory(req.body);

        if(!req.body){
            res.status(400);
            res.send('Title is required');
        }
        else {
            userCategory.save();
            res.status(201);
            res.send(userCategory);
        }
    }

    var get = function(req,res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        UserCategory.find(query, function(err,userCategorys){

            if(err)
                res.status(500).send(err);
            else {

                var returnUserCategorys = [];
                userCategorys.forEach(function(element, index, array){
                    var newUserCategory = element.toJSON();
                    newUserCategory.links= {};
                    newUserCategory.links.self = 'http://' + req.headers.host + '/api/userCategorys/' + newUserCategory._id
                    returnUserCategorys.push(newUserCategory);
                });
                res.json(returnUserCategorys);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = userCategoryController;