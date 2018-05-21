var districtController = function (District) {

    var post = function (req, res) {
        var district = new District(req.body);
        
        if (!req.body) {
            res.status(400);
            res.send('Data is required');
        }
        else {
            district.save(function (err) {

            });
        }
    }

    var get = function (req, res) {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        District.find(query, function (err, districts) {

            if (err)
                res.status(500).send(err);
            else {

                var returnDistricts = [];
                districts.forEach(function (element, index, array) {
                    var newDistrict = element.toJSON();
                    newDistrict.links = {};
                    newDistrict.links.self = 'http://' + req.headers.host + '/api/districts/' + newDistrict._id
                    returnDistricts.push(newDistrict);
                });
                res.json(returnDistricts);
            }
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = districtController;