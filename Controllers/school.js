var schoolController = function (School) {

    var post = function (req, res) {
        var school = new School(req.body);
        
        if (!req.body) {
            res.status(400);
            res.send('Data is required');
        }
        else {
            school.save(function (err) {

            });
        }
    }

    var get = function (req, res) {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        School.find(query, function (err, schools) {
            if (err)
                res.status(500).send(err);
            else {

                var returnSchools = [];
                schools.forEach(function (element, index, array) {
                    var newSchool = element.toJSON();
                    newSchool.links = {};
                    newSchool.links.self = 'http://' + req.headers.host + '/api/schools/' + newSchool._id
                    returnSchools.push(newSchool);
                });
                res.json(returnSchools);
            }
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = schoolController;