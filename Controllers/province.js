var provinceController = function (Province) {

    var post = function (req, res) {
        var province = new Province(req.body);
        
        if (!req.body) {
            res.status(400);
            res.send('Data is required');
        }
        else {
            province.save(function (err) {

            });
        }
    }

    var get = function (req, res) {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Province.find(query, function (err, provinces) {

            if (err)
                res.status(500).send(err);
            else {

                var returnProvinces = [];
                provinces.forEach(function (element, index, array) {
                    var newProvince = element.toJSON();
                    newProvince.links = {};
                    newProvince.links.self = 'http://' + req.headers.host + '/api/provinces/' + newProvince._id
                    returnProvinces.push(newProvince);
                });
                res.json(returnProvinces);
            }
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = provinceController;