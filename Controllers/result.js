var resultController = function(Result){

    var post = function(req, res){
        var result = new Result(req.body);

        if(!req.body){
            res.status(400);
            res.send('Title is required');
        }
        else {
            result.save();
            res.status(201);
            res.send(result);
        }
    }

    var get = function(req,res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Result.find(query, function(err,results){

            if(err)
                res.status(500).send(err);
            else {

                var returnResults = [];
                results.forEach(function(element, index, array){
                    var newResult = element.toJSON();
                    newResult.links= {};
                    newResult.links.self = 'http://' + req.headers.host + '/api/results/' + newResult._id
                    returnResults.push(newResult);
                });
                res.json(returnResults);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = resultController;