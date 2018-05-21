var learnerController = function(Learner){

    var post = function(req, res){
        var learner = new Learner(req.body);

        if(!req.body){
            res.status(400);
            res.send('Title is required');
        }
        else {
            learner.save();
            res.status(201);
            res.send(learner);
        }
    }

    var get = function(req,res){

        let query = {};

        if (req.payload.user_category === 'CO') {
            query = { district: req.payload.district };
        } else if (req.payload.user_category === 'FO') {
            if (req.payload.follower_category === 'zonal') {
                query = { zone: req.payload.zone };
            } else if (req.payload.follower_category === 'district') {
                query = { province: req.payload.district };
            } else if (req.payload.follower_category === 'provincial') {
                query = { province: req.payload.province };
            } else {

            }
        }

        Learner.find(query, function(err,learners){
            if(err)
                res.status(500).send(err);
            else {
                var returnLearners = [];
                learners.forEach(function(element, index, array){
                    var newLearner = element.toJSON();
                    newLearner.links= {};
                    newLearner.links.self = 'http://' + req.headers.host + '/api/learners/' + newLearner._id
                    returnLearners.push(newLearner);
                });
                res.json(returnLearners);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = learnerController;