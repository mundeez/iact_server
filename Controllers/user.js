const userController = function (User) {

    const post = function (req, res) {
        var user = new User(req.body);
        if (!req.body) {
            res.status(400);
            res.send('Data is required');
        } else {
            user.setPassword(req.body.password);
            user.save(function (err, result) {
                if (err) {
                    res.status(501);
                    res.json({
                        "error": err
                    });
                } else {
                    res.status(200);
                    res.json({
                        "message": "success"
                    });
                }
            });
        }
    }

    const get = function (req, res) {
        let query = {};
        if (!req.query.user_category) {
            if (req.payload.user_category === 'AD' || req.payload.user_category === 'SUAD') {
                query = {
                    $or: [
                        { user_category: 'AD' },
                        { user_category: 'SUAD' },
                        { user_category: 'CO' },
                        { user_category: 'FO' }
                    ],
                };
            } else if (req.payload.user_category === 'CO') {
                query = {
                    $or: [
                        {
                            $and: [
                                { user_category: 'FO' },
                                { district: req.payload.district }
                            ]
                        },
                        {
                            $and: [
                                { user_category: 'CO' },
                                { district: req.payload.district }
                            ]
                        }
                    ],
    
                };
            } else if (req.payload.user_category === 'FO') {
                query = { user_category: 'FO' };
            }
        } else if (req.query.user_category === 'LR') {
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
        } else {
            query.user_category = req.query.user_category;
            if (req.query.man != "undefined" && req.query.man) {
                query.man = req.query.man;
            }
    
            if (req.query.contact != "undefined" && req.query.contact) {
                query.contact_number = "+" + req.query.contact.substring(1, req.query.contact.length);
            }
    
            if (req.query.province != "undefined" && req.query.province) {
                query.province = req.query.province.split(" ")[0];
            }
    
            if (req.query.district != "undefined" && req.query.district) {
                query.district = req.query.district;
            }

            if (req.query.gender != "undefined" && req.query.gender) {
                query.gender = req.query.gender;
            }
        }
    
        console.log(query);

        if (req.query.user_category === "LR") {
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
        } else if (req.payload.user_category !== "FO") {
            User.find(query, function (err, users) {
                console.log(users.length);
                if (err)
                    res.status(500).send(err);
                else {
                    var returnUsers = [];
                    users.forEach(function (element, index, array) {
                        var newUser = element.toJSON();
                        delete newUser["hash"];
                        delete newUser["salt"];
                        newUser.links = {};
                        newUser.links.self = 'http://' + req.headers.host + '/api/users/' + newUser._id;
                        returnUsers.push(newUser);
                    });
                    res.json(returnUsers);
                }
            });
        } else {
            res.status(401);
            res.json("Followers are not authorized to perform this action");
        }
    }

    const put = function (req, res) {
        const bulkUpdateOps = [],
            counter = 0;
        let promises = req.body.map(usr => {
            return User.findOne({ nrc: usr.nrc }).then((user, error) => {
                if (error) {
                    res.status(500).send(error);
                    console.log(error);
                }
                if (user) {
                    bulkUpdateOps.push({
                        "updateOne": {
                            "filter": { "_id": usr._id },
                            "update": usr
                        }
                    });
                } else {
                    delete (usr["id"]);
                    const user = new User(usr);
                    user.setPassword(usr.nrc);
                    bulkUpdateOps.push({
                        "insertOne": {
                            document: user
                        }
                    });
                }
            });
        });

        Promise.all(promises).then(() => {

            bulkUpdateOps.forEach(bulkUpdateOp => {
                console.log(bulkUpdateOp);
            });

            User.bulkWrite(bulkUpdateOps).then(result => {
                res.status(200);
                res.json("Successfully Inserted!");
                console.log(result);
            }, error => {
                res.status(500);
                res.json(error);
                console.log("---------------------------------");
                console.log(error);
            });
        })
    };

    return {
        post: post,
        get: get,
        put: put
    }
}

module.exports = userController;